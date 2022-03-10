import Link from 'next/link';
import { useRouter } from 'next/router';

const FiltersAlphabeticalList = ({ dictionary = {} }) => {
  const { query } = useRouter();

  const { searchKey = '' } = query;

  const dictionaryKeys = Object.keys(dictionary);

  const filtered = dictionaryKeys.map((letter) => ({
    [letter]: dictionary[letter].filter(
      (item) =>
        item?.key?.toLowerCase().includes(searchKey.toLowerCase()) ||
        item?.type === searchKey,
    ),
  }));

  return (
    <nav className="h-full overflow-y-auto" aria-label="dictionary">
      {filtered.map((ele) =>
        Object.keys(ele).map((letter) => (
          <div key={letter} className="relative">
            {ele[letter].length ? (
              <>
                <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                  <h3>{letter}</h3>
                </div>
                <ul className="relative z-0 divide-y divide-gray-200">
                  {dictionary[letter].map((item) => (
                    <li key={item._id} className="bg-white">
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <div className="flex-1 min-w-0">
                          <Link href={`/filters/${item?._id}`}>
                            <a className="focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {item?.type}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
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
        )),
      )}
    </nav>
  );
};

export default FiltersAlphabeticalList;
