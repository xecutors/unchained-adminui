import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from '../../common/components/Pagination';

const AssortmentAlphabeticalList = ({ dictionary = {} }) => {
  const { query } = useRouter();

  const { searchKey = '' } = query;

  const dictionaryKeys = Object.keys(dictionary);

  const [filtered] = dictionaryKeys.map((letter) => ({
    [letter]: dictionary[letter].filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchKey.toLowerCase()) ||
        item?.subtitle?.toLowerCase().includes(searchKey.toLowerCase()),
    ),
  }));

  const totalAssortments = Object.values(filtered).reduce(
    (prev, curr) => prev + curr.length,
    0,
  );

  console.log(filtered, totalAssortments);

  return (
    <nav className="h-full overflow-y-auto" aria-label="dictionary">
      {Object.keys(filtered).map((letter) => (
        <div key={letter} className="relative">
          {filtered[letter].length ? (
            <>
              <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                <h3>{letter}</h3>
              </div>
              <ul className="relative z-0 divide-y divide-gray-200">
                {filtered[letter].map((item) => (
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
                            <span className="flex justify-between items-center ">
                              <p className="text-sm font-medium text-gray-900">
                                {item?.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {item?.subtitle}
                              </p>
                            </span>
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
      <Pagination total={totalAssortments} data={filtered} />
    </nav>
  );
};

export default AssortmentAlphabeticalList;
