import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Table from '../../common/components/Table';
import { normalizeLanguageISOCode } from '../../common/utils/utils';

const LanguageListItem = ({ language, onRemove, enableEdit, enableDelete }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <Table.Row className="text-sm">
      <Table.Cell>
        <div>
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
        {normalizeLanguageISOCode(locale, language?.isoCode, false)}
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={STATUS[language.isActive]}
          color={language.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>
      {(enableEdit || enableDelete) && (
        <Table.Cell>
          <div className="flex">
            {enableEdit && (
              <Link href={`/language/${language?._id}`}>
                <a>
                  <EditIcon />
                </a>
              </Link>
            )}
            {enableDelete && (
              <DeleteButton
                className="ml-1 mr-1"
                onClick={async () => {
                  await onRemove(language?._id);
                }}
              />
            )}
          </div>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default LanguageListItem;
