import Link from 'next/link';

const LanguageListItem = ({ language, onRemove }) => {
  const onRemoveLanguage = (id) => {
    onRemove(id);
  };
  return (
    <tr>
      <td className="flex px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {language.isoCode}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {language.isActive && 'Active'}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {language.isBase && 'Base language'}
        </div>
      </td>
      <td className=" flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/language/${language?._id}`}>
          <a className="mml-1 mr-1 text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </Link>
        <a
          className="ml-1 mr-1 text-red-600 hover:text-red-900 cursor-pointer"
          onClick={() => onRemoveLanguage(language?._id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default LanguageListItem;
