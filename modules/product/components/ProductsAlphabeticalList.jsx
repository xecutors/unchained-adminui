import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductsAlphabeticalList = ({
  dictionary = {},
  enableRedirect = true,
}) => {
  const { query } = useRouter();

  const { searchKey = '' } = query;

  const filtered = Object.fromEntries(
    Object.entries(dictionary).map(([key, values]) => {
      return [
        key,
        values.filter((item) => {
          return (
            item?.title?.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.subtitle?.toLowerCase().includes(searchKey.toLowerCase()) ||
            !searchKey
          );
        }),
      ];
    }),
  );

  return (
    <nav className="h-full overflow-y-auto" aria-label="dictionary">
      {Object.keys(filtered).map((letter) => (
        <div key={letter} className="relative">
          {filtered[letter].length ? (
            <>
              <div className="sticky top-0 z-10 border-t border-b border-slate-200 dark:border-slate-800 bg-slate-300 px-6 py-1 text-sm font-medium text-white dark:bg-slate-400 dark:text-slate-900">
                <h3>{letter}</h3>
              </div>
              <ul className="relative z-0 divide-y divide-slate-200">
                {filtered[letter].map((item) => (
                  <li key={item._id} className="bg-white dark:bg-slate-500">
                    <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-400">
                      {item?.media && (
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={item?.media?.file?.url}
                            alt=""
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <Link href={`/products/${item?.slug}`}>
                          <a
                            className={classNames('focus:outline-none', {
                              'pointer-events-none': !enableRedirect,
                            })}
                          >
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p
                              className="text-sm font-medium text-slate-900 dark:text-slate-100"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: item?.title }}
                            />

                            <p
                              className="truncate text-sm text-slate-500 dark:text-slate-300"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: item?.subtitle,
                              }}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ))}
    </nav>
  );
};

export default ProductsAlphabeticalList;
