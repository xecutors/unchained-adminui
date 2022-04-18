/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import { scaleOrdinal, schemeDark2, min, max, descending } from 'd3';
import { Fragment } from 'react';
import useAssortmentPaths from '../hooks/useAssortmentPaths';

const _ = require('lodash');

const dataa = [
  [{ id: 'Chaos' }],
  [{ id: 'Gaea', parents: ['Chaos'] }, { id: 'Uranus' }],
  [
    { id: 'Oceanus', parents: ['Gaea', 'Uranus'] },
    { id: 'Thethys', parents: ['Gaea', 'Uranus'] },
    { id: 'Pontus' },
    { id: 'Rhea', parents: ['Gaea', 'Uranus'] },
    { id: 'Cronus', parents: ['Gaea', 'Uranus'] },
    { id: 'Coeus', parents: ['Gaea', 'Uranus'] },
    { id: 'Phoebe', parents: ['Gaea', 'Uranus'] },
    { id: 'Crius', parents: ['Gaea', 'Uranus'] },
    { id: 'Hyperion', parents: ['Gaea', 'Uranus'] },
    { id: 'Iapetus', parents: ['Gaea', 'Uranus'] },
    { id: 'Thea', parents: ['Gaea', 'Uranus'] },
    { id: 'Themis', parents: ['Gaea', 'Uranus'] },
    { id: 'Mnemosyne', parents: ['Gaea', 'Uranus'] },
  ],
  [
    { id: 'Doris', parents: ['Oceanus', 'Thethys'] },
    { id: 'Neures', parents: ['Pontus', 'Gaea'] },
    { id: 'Dionne' },
    { id: 'Demeter', parents: ['Rhea', 'Cronus'] },
    { id: 'Hades', parents: ['Rhea', 'Cronus'] },
    { id: 'Hera', parents: ['Rhea', 'Cronus'] },
    { id: 'Alcmene' },
    { id: 'Zeus', parents: ['Rhea', 'Cronus'] },
    { id: 'Eris' },
    { id: 'Leto', parents: ['Coeus', 'Phoebe'] },
    { id: 'Amphitrite' },
    { id: 'Medusa' },
    { id: 'Poseidon', parents: ['Rhea', 'Cronus'] },
    { id: 'Hestia', parents: ['Rhea', 'Cronus'] },
  ],
  [
    { id: 'Thetis', parents: ['Doris', 'Neures'] },
    { id: 'Peleus' },
    { id: 'Anchises' },
    { id: 'Adonis' },
    { id: 'Aphrodite', parents: ['Zeus', 'Dionne'] },
    { id: 'Persephone', parents: ['Zeus', 'Demeter'] },
    { id: 'Ares', parents: ['Zeus', 'Hera'] },
    { id: 'Hephaestus', parents: ['Zeus', 'Hera'] },
    { id: 'Hebe', parents: ['Zeus', 'Hera'] },
    { id: 'Hercules', parents: ['Zeus', 'Alcmene'] },
    { id: 'Megara' },
    { id: 'Deianira' },
    { id: 'Eileithya', parents: ['Zeus', 'Hera'] },
    { id: 'Ate', parents: ['Zeus', 'Eris'] },
    { id: 'Leda' },
    { id: 'Athena', parents: ['Zeus'] },
    { id: 'Apollo', parents: ['Zeus', 'Leto'] },
    { id: 'Artemis', parents: ['Zeus', 'Leto'] },
    { id: 'Triton', parents: ['Poseidon', 'Amphitrite'] },
    { id: 'Pegasus', parents: ['Poseidon', 'Medusa'] },
    { id: 'Orion', parents: ['Poseidon'] },
    { id: 'Polyphemus', parents: ['Poseidon'] },
  ],
  [
    { id: 'Deidamia' },
    { id: 'Achilles', parents: ['Peleus', 'Thetis'] },
    { id: 'Creusa' },
    { id: 'Aeneas', parents: ['Anchises', 'Aphrodite'] },
    { id: 'Lavinia' },
    { id: 'Eros', parents: ['Hephaestus', 'Aphrodite'] },
    { id: 'Helen', parents: ['Leda', 'Zeus'] },
    { id: 'Menelaus' },
    { id: 'Polydueces', parents: ['Leda', 'Zeus'] },
  ],
  [
    { id: 'Andromache' },
    { id: 'Neoptolemus', parents: ['Deidamia', 'Achilles'] },
    { id: 'Aeneas(2)', parents: ['Creusa', 'Aeneas'] },
    { id: 'Pompilius', parents: ['Creusa', 'Aeneas'] },
    { id: 'Iulus', parents: ['Lavinia', 'Aeneas'] },
    { id: 'Hermione', parents: ['Helen', 'Menelaus'] },
  ],
];

const color = scaleOrdinal(schemeDark2);

const backgroundColor = 'white';

const constructTangleLayout = (levels, options = {}) => {
  console.log(levels);
  // precompute level depth
  // eslint-disable-next-line no-param-reassign
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

  // precompute bundles
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
  const node_height = 22;
  const node_width = 70;
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
    l.forEach((n, i) => {
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
      width={500}
      height={`${tangleLayout.layout.height}`}
      className="fill-transparent mx-auto"
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
              className="link stroke-white"
              d={`${d}`}
              // stroke={`${backgroundColor}`}
              // stroke="bg-white"
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

          <text
            className="selectable fill-slate-600 text-sm"
            data-id={`${n.id}`}
            x={`${n.x + 4}`}
            y={`${n.y - n.height / 2 - 4}`}
            // stroke={`${backgroundColor}`}
            // strokeWidth="2"
          >
            {n.id}
          </text>
          <text
            x={`${n.x + 4}`}
            y={`${n.y - n.height / 2 - 4}`}
            style={{ pointerEvents: 'none' }}
          >
            {n.id}
          </text>
        </Fragment>
      ))}
    </svg>
  );
};

const getAssortmentTree = (assortment) => {
  const linkedAssortmentsData = [];
  const childArray = [];

  const walkTree = ({ _id, linkedAssortments, children }) => {
    childArray.push([
      ...children
        .map((chi) => {
          if (!_id)
            return {
              id: chi?._id,
            };

          return {
            id: chi?._id,
            parents: [_id],
          };
        })
        .filter(Boolean),
    ]);

    children.forEach((chi) => {
      walkTree(chi);
    });
    return childArray.filter((arr) => arr.length);
  };

  return walkTree({ ...assortment, _id: null });
};

const AssortmentGraphDetail = ({ assortment }) => {
  return (
    <div className="w-full h-fit bg-white text-slate-900">
      <span>AssortmentGraphDetail</span>
      {/* <RenderChart data={dataa} /> */}
      <RenderChart data={getAssortmentTree(assortment)} />
    </div>
  );
};

export default AssortmentGraphDetail;
