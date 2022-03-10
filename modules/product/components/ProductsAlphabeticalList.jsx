import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductsAlphabeticalList = ({ dictionary = {} }) => {
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
              <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-300 px-6 py-1 text-sm font-medium text-white">
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
                        <Link href={`/products/${item?.slug}`}>
                          <a href="#" className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p
                              className="text-sm font-medium text-gray-900"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: item?.title }}
                            />

                            <p
                              className="text-sm text-gray-500 truncate"
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
