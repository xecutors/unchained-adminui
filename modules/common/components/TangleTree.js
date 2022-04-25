/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
import { Fragment } from 'react';
import Link from 'next/link';
import { scaleOrdinal, schemeDark2, min, max, descending } from 'd3';

const _ = require('lodash');

const color = scaleOrdinal(schemeDark2);

const constructTangleLayout = (levels, options = {}) => {
  // pre compute level depth
  levels.forEach((l, i) => l.forEach((n) => (n.level = i)));

  const nodes = levels.reduce((a, x) => a.concat(x), []);
  const nodes_index = {};
  nodes.forEach((d) => (nodes_index[d.id] = d));

  // objectification
  nodes.forEach((d) => {
    d.parents = (d.parents === undefined ? [] : d.parents).map(
      (p) => nodes_index[p],
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
          span: i - min(n.parents, (p) => p.level),
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
  bundles.forEach((b) =>
    b.parents.forEach((p) => {
      if (p.bundles_index === undefined) {
        p.bundles_index = {};
      }
      if (!(b.id in p.bundles_index)) {
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
  const node_height = 30;
  const node_width = 100;
  const bundle_width = 14;
  const level_y_padding = 16;
  const metro_d = 4;
  const min_family_height = 22;

  options.c ||= 16;
  const { c } = options;
  options.bigc ||= node_width + c;

  nodes.forEach(
    (n) => (n.height = (Math.max(1, n.bundles.length) - 1) * metro_d),
  );

  let x_offset = padding;
  let y_offset = padding;
  levels.forEach((l) => {
    x_offset += l.bundles.length * bundle_width;
    y_offset += level_y_padding;
    l.forEach((n) => {
      n.x = n.level * node_width + x_offset;
      n.y = node_height + y_offset + n.height / 2;

      y_offset += node_height + n.height;
    });
  });

  let i = 0;
  levels.forEach((l) => {
    l.bundles.forEach((b) => {
      b.x =
        max(b.parents, (d) => d.x) +
        node_width +
        (l.bundles.length - 1 - b.i) * bundle_width;
      b.y = i * node_height;
    });
    i += l.length;
  });

  links.forEach((l) => {
    l.xt = l.target.x;
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metro_d -
      (l.target.bundles.length * metro_d) / 2 +
      metro_d / 2;
    l.xb = l.bundle.x;
    l.yb = l.bundle.y;
    l.xs = l.source.x;
    l.ys = l.source.y;
  });

  // compress vertical space
  let y_negative_offset = 0;
  levels.forEach((l) => {
    y_negative_offset +=
      -min_family_height +
        min(l.bundles, (b) =>
          min(b.links, (link) => link.ys - 2 * c - (link.yt + c)),
        ) || 0;
    l.forEach((n) => (n.y -= y_negative_offset));
  });

  // very ugly, I know
  links.forEach((l) => {
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metro_d -
      (l.target.bundles.length * metro_d) / 2 +
      metro_d / 2;
    l.ys = l.source.y;
    l.c1 =
      l.source.level - l.target.level > 1
        ? Math.min(options.bigc, l.xb - l.xt, l.yb - l.yt) - c
        : c;
    l.c2 = c;
  });

  const layout = {
    width: max(nodes, (n) => n.x) + node_width + 2 * padding,
    height: max(nodes, (n) => n.y) + node_height / 2 + 2 * padding,
    node_height,
    node_width,
    bundle_width,
    level_y_padding,
    metro_d,
  };

  return { levels, nodes, nodes_index, links, bundles, layout };
};

const RenderChart = ({ data, options = {} }) => {
  options.color ||= (d, i) => color(i);

  const tangleLayout = constructTangleLayout(_.cloneDeep(data), options);

  return (
    <svg
      width="auto"
      height={`${tangleLayout.layout.height}`}
      className="fill-transparent mx-10 w-full"
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
      {tangleLayout.nodes.map((n) => (
        <Fragment key={n.id}>
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
          <Link href={`/assortments/graph/${n?.slug}`}>
            <a>
              <text
                className="selectable fill-indigo-600 hover:fill-indigo-800 dark:fill-white dark:hover:fill-slate-300 text-base"
                data-id={`${n.id}`}
                x={`${n.x + 4}`}
                y={`${n.y - n.height / 2 - 4}`}
                // strokeWidth="2"
              >
                {n.title}
              </text>
            </a>
          </Link>
        </Fragment>
      ))}
    </svg>
  );
};

export default RenderChart;
