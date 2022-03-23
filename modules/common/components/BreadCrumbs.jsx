import Link from 'next/link';
import { useRouter } from 'next/router';

const BreadCrumbs = ({ routeName }) => {
  const router = useRouter();
  const pathArr = router.asPath

    .split('/')
    .filter((name, i) => router.asPath.split('/').indexOf(name) === i);
  if (pathArr.length === 1) return '';
  let currentRoute = '';

  // if current page name is provided use it as the last item of breadcrumb
  if (routeName) pathArr[pathArr.length - 1] = routeName;

  const result = pathArr.map((e) => {
    currentRoute += `${e}/`;
    if (!e) {
      return {
        name: 'Home',
        path: currentRoute,
      };
    }
    // if routeName is given dont modify the string else
    // remove hyphens incase it hyphen deliminated slug
    const pathName = routeName
      ? e.split('?')[0]
      : e.split('?')[0].replace(/-/g, ' ');
    return {
      name: decodeURIComponent(pathName),
      path: currentRoute.replace(/.$/, ''),
    };
  });
  return (
    <nav className="mb-5 hidden sm:flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {result.map((data, i) => (
          <li key={data.path}>
            <div className="flex items-center">
              {i !== 0 && (
                <svg
                  className="mr-4 h-5 w-5 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <Link href={data.path}>
                <a className="text-sm font-medium capitalize text-gray-500 hover:text-gray-700">
                  {data.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
