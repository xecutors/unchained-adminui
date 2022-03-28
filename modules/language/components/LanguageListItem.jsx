import { PencilAltIcon } from '@heroicons/react/outline';
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
      <Table.Cell>
        <div className="font-bold uppercase">
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

      <Table.Cell>
        <div className=" text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'language' }).of(
            language.isoCode,
          )}
        </div>
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={STATUS[language.isActive]}
          color={language.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell>
        <div className="flex">
          <Link href={`/language/${language?._id}`}>
            <a>
              <PencilAltIcon className="mt-1 mr-2 h-5 w-5  text-indigo-500" />
            </a>
          </Link>
          <DeleteButton
            className="ml-1 mr-1"
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
