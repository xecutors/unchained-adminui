/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Fragment } from 'react';
import { scaleOrdinal, schemeDark2, min, max, descending } from 'd3';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const color = scaleOrdinal(schemeDark2);

const constructTangleLayout = (levels, options = {}) => {
  // pre compute level depth
  levels.forEach((l, i) => l.forEach((n) => (n.level = i)));

  const nodes = levels.reduce((a, x) => a.concat(x), []);
  const nodesIndex = {};
  nodes.forEach((d) => (nodesIndex[d.id] = d));

  // objectification
  nodes.forEach((d) => {
    d.parents = (d.parents === undefined ? [] : d.parents).map(
      (p) => nodesIndex[p],
    );
  });

  // pre compute bundles
  levels.forEach((l, i) => {
    const index = {};
    l.forEach((n) => {
      if (n.parents.length === 0) {
        return;
      }

      const id = n.parents
        .filter(Boolean)
        .map((d) => d.id)
        .sort()
        .join('-X-');
      if (id in index) {
        index[id].parents = index[id].parents.concat(n.parents);
      } else {
        index[id] = {
          id,
          parents: n.parents.slice(),
          level: i,
          span: i - min(n.parents, (p) => p?.level),
        };
      }
      n.bundle = index[id];
    });
    l.bundles = Object.keys(index).map((k) => index[k]);
    l.bundles.forEach((b, i) => (b.i = i));
  });

  const links = [];
  nodes.forEach((d) => {
    d.parents.forEach((p) =>
      links.push({ source: d, bundle: d.bundle, target: p }),
    );
  });

  const bundles = levels.reduce((a, x) => a.concat(x.bundles), []);

  // reverse pointer from parent to bundles
  (bundles || []).forEach((b) =>
    b.parents.filter(Boolean).forEach((p) => {
      if (p?.bundles_index === undefined) {
        p.bundles_index = {};
      }
      if (!(b.id in (p?.bundles_index || []))) {
        p.bundles_index[b.id] = [];
      }
      p.bundles_index[b.id].push(b);
    }),
  );

  nodes.forEach((n) => {
    if (n.bundles_index !== undefined) {
      n.bundles = Object.keys(n.bundles_index).map((k) => n.bundles_index[k]);
    } else {
      n.bundles_index = {};
      n.bundles = [];
    }
    n.bundles.sort((a, b) =>
      descending(
        max(a, (d) => d.span),
        max(b, (d) => d.span),
      ),
    );
    n.bundles.forEach((b, i) => (b.i = i));
  });

  links.forEach((l) => {
    if (l.bundle.links === undefined) {
      l.bundle.links = [];
    }
    l.bundle.links.push(l);
  });

  // layout
  const padding = 8;
  const nodeHeight = 30;
  const nodeWidth = 100;
  const bundleWidth = 14;
  const levelYPadding = 16;
  const metroD = 4;
  const minFamilyHeight = 22;

  options.c ||= 16;
  const { c } = options;
  options.bigc ||= nodeWidth + c;

  nodes.forEach(
    (n) => (n.height = (Math.max(1, n.bundles.length) - 1) * metroD),
  );

  let xOffset = padding;
  let yOffset = padding;
  levels.forEach((l) => {
    xOffset += l.bundles.length * bundleWidth;
    yOffset += levelYPadding;
    l.forEach((n) => {
      n.x = n.level * nodeWidth + xOffset;
      n.y = nodeHeight + yOffset + n.height / 2;

      yOffset += nodeHeight + n.height;
    });
  });

  let i = 0;
  levels.forEach((l) => {
    l.bundles.filter(Boolean).forEach((b) => {
      b.x =
        max(b.parents, (d) => d?.x) +
        nodeWidth +
        (l.bundles.length - 1 - b.i) * bundleWidth;
      b.y = i * nodeHeight;
    });
    i += l.length;
  });

  links.forEach((l) => {
    l.xt = l.target.x;
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metroD -
      (l.target.bundles.length * metroD) / 2 +
      metroD / 2;
    l.xb = l.bundle.x;
    l.yb = l.bundle.y;
    l.xs = l.source.x;
    l.ys = l.source.y;
  });

  // compress vertical space
  let yNegativeOffset = 0;
  levels.forEach((l) => {
    yNegativeOffset +=
      -minFamilyHeight +
        min(l.bundles, (b) =>
          min(b.links, (link) => link.ys - 2 * c - (link.yt + c)),
        ) || 0;
    l.forEach((n) => (n.y -= yNegativeOffset));
  });

  // very ugly, I know
  links.forEach((l) => {
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metroD -
      (l.target.bundles.length * metroD) / 2 +
      metroD / 2;
    l.ys = l.source.y;
    l.c1 =
      l.source.level - l.target.level > 1
        ? Math.min(options.bigc, l.xb - l.xt, l.yb - l.yt) - c
        : c;
    l.c2 = c;
  });

  const layout = {
    width: max(nodes, (n) => n.x) + nodeWidth + 2 * padding,
    height: max(nodes, (n) => n.y) + nodeHeight / 2 + 2 * padding,
    node_height: nodeHeight,
    node_width: nodeWidth,
    bundle_width: bundleWidth,
    level_y_padding: levelYPadding,
    metro_d: metroD,
  };

  return { levels, nodes, nodes_index: nodesIndex, links, bundles, layout };
};

const RenderChart = ({ data, options = {} }) => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const tangleLayout = constructTangleLayout(data, options);

  options.color ||= (d, i) => color(i);

  return (
    <>
      <span className="absolute top-2 left-8">
        <button
          type="button"
          className="inline-flex items-center justify-center px-2 py-2 hover:bg-yellow-100 dark:hover:bg-yellow-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 dark:focus:ring-yellow-500"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="h-6 w-6 text-teal-600 hover:text-teal-800" />
        </button>
      </span>

      <svg
        width="100%"
        height={`${tangleLayout.layout.height}`}
        className="fill-transparent pt-4 mx-10 w-full"
      >
        {tangleLayout.bundles.map((b, i) => {
          const d = b.links
            .map(
              (l) => `
      M${l.xt} ${l.yt}
      L${l.xb - l.c1} ${l.yt}
      A${l.c1} ${l.c1} 90 0 1 ${l.xb} ${l.yt + l.c1}
      L${l.xb} ${l.ys - l.c2}
      A${l.c2} ${l.c2} 90 0 0 ${l.xb + l.c2} ${l.ys}
      L${l.xs} ${l.ys}`,
            )
            .join('');
          return (
            <Fragment key={d}>
              <path
                className="link stroke-white dark:stroke-slate-600"
                d={`${d}`}
                strokeWidth="5"
              />
              <path
                className="link"
                d={`${d}`}
                stroke={`${options.color(b, i)}`}
                strokeWidth="2"
              />
            </Fragment>
          );
        })}
        {tangleLayout.nodes.map((n, i) => (
          <Fragment key={`${n.id}+${i}`}>
            <path
              className="selectable node"
              data-id={`${n.id}`}
              stroke="black"
              strokeWidth="8"
              d={`M${n.x} ${n.y - n.height / 2} L${n.x} ${n.y + n.height / 2}`}
            />
            <path
              className="node"
              stroke="white"
              strokeWidth="4"
              d={`M${n.x} ${n.y - n.height / 2} L${n.x} ${n.y + n.height / 2}`}
            />
            <Link href={`/assortments?viewGraph=true&slug=${n?.slug}`}>
              <a>
                <text
                  className="selectable fill-indigo-600 hover:fill-indigo-800 dark:fill-white dark:hover:fill-slate-300 text-base"
                  data-id={`${n.id}`}
                  x={`${n.x + 4}`}
                  y={`${n.y - n.height / 2 - 4}`}
                  // strokeWidth="2"
                >
                  {n?.title}

                  {n?.childCount !== undefined && (
                    <>
                      <tspan dx="0.5rem" className="italic fill-slate-400">
                        {formatMessage({
                          id: 'children',
                          defaultMessage: 'children:',
                        })}
                      </tspan>
                      <tspan dx="0.25rem" className="italic fill-purple-600">
                        {n?.childCount}
                      </tspan>
                    </>
                  )}
                </text>
              </a>
            </Link>
          </Fragment>
        ))}
      </svg>
    </>
  );
};

export default RenderChart;
