import Link from 'next/link';
import { useRouter } from 'next/router';

import Pagination from '../../common/components/Pagination';
import computeDictionaryTotal from '../../common/utils/computeDictionaryTotal';

const FiltersAlphabeticalList = ({ dictionary = {} }) => {
  const { query } = useRouter();

  const { searchKey = '' } = query;

  const filtered = Object.fromEntries(
    Object.entries(dictionary).map(([key, values]) => {
      return [
        key,
        values.filter((item) => {
          return (
            item?.key?.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.type.toLowerCase() === searchKey.toLowerCase() ||
            !searchKey
          );
        }),
      ];
    }),
  );

  const totalFilters = Object.values(filtered).reduce(
    computeDictionaryTotal,
    0,
  );

  return (
    <nav className="h-full overflow-y-auto" aria-label="dictionary">
      {Object.keys(filtered).map((letter) => (
        <div key={letter} className="relative">
          {filtered[letter].length ? (
            <>
              <div className="sticky top-0 z-10 border-t border-b border-slate-200 bg-slate-300 dark:bg-slate-400 px-6 py-1 text-sm font-medium text-white dark:text-slate-900">
                <h3>{letter}</h3>
              </div>
              <ul className="relative z-0 divide-y divide-slate-200">
                {filtered[letter].map((item) => (
                  <li key={item._id} className="bg-white dark:bg-slate-500">
                    <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-400">
                      <div className="min-w-0 flex-1">
                        <Link href={`/filters/${item?._id}`}>
                          <a className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {item?.type}
                            </p>
                            <p className="truncate text-sm text-slate-500 dark:text-slate-100">
                              {item?.key}
                            </p>
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
      <Pagination total={totalFilters} data={Object.values(filtered).flat()} />
    </nav>
  );
};

export default FiltersAlphabeticalList;
