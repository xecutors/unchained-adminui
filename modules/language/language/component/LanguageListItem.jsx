const LanguageListItem = ({ language }) => {
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
        <a className="mml-1 mr-1 text-indigo-600 hover:text-indigo-900">Edit</a>
        <a className="ml-1 mr-1 text-red-600 hover:text-red-900">Delete</a>
      </td>
    </tr>
  );
};

export default LanguageListItem;
