import Link from 'next/link';

const AssortmentAlphabeticalList = ({ dictionary = {}, searchKey }) => {
  const dictionaryKeys = Object.keys(dictionary);

  const filtered = dictionaryKeys.map((letter) => ({
    [letter]: dictionary[letter].filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchKey.toLowerCase()) ||
        item?.subtitle?.toLowerCase().includes(searchKey.toLowerCase()),
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
                  {ele[letter].map((item) => (
                    <li key={item._id} className="bg-white">
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        {item?.media && (
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item?.media?.file?.url}
                              alt=""
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <Link href={`/assortments/${item?.slug}`}>
                            <a className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {item?.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {item?.subtitle}
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

export default AssortmentAlphabeticalList;
