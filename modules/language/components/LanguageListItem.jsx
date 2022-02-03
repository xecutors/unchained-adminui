import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import Table from '../../common/components/Table';

const LanguageListItem = ({ language, onRemove }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <Table.Row>
      <Table.Cell className="px-6 whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900 border-">
          {language.isoCode}
          {language.isBase && (
            <Badge
              text={formatMessage({
                id: 'base_language',
                defaultMessage: 'Base',
              })}
              className="ml-2 text-sm"
              square
            />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6 whitespace-nowrap ">
        <div className=" text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'language' }).of(
            language.isoCode,
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6 whitespace-nowrap ">
        <Badge
          text={STATUS[language.isActive]}
          color={language.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell className="px-6 whitespace-nowrap ">
        <div className="flex items-center">
          <Link href={`/language/${language?._id}`}>
            <a type="button" href="#" className="flex">
              <svg
                className="h-5 w-5 text-indigo-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </a>
          </Link>
          <DeleteButton
            className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
            onClick={async () => {
              await onRemove(language?._id);
            }}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default LanguageListItem;
