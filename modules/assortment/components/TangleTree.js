/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Fragment } from 'react';
import { scaleOrdinal, schemeDark2 } from 'd3';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import constructTangleLayout from '../utils/contructTangleLayout';

const color = scaleOrdinal(schemeDark2);

const TangleTree = ({ data, options = {} }) => {
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

export default TangleTree;
