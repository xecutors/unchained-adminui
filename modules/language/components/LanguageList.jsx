import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({ languages, onRemoveLanguage }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

  return (
    <Table className="min-w-full ">
      {languages?.map((language) => (
        <Table.Row key={language._id} header>
          <Table.Cell name="isoCode">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell name="name">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell name="isActive">
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>
          {(hasRole(ACTION_ROLES.country.view) ||
            hasRole(ACTION_ROLES.country.delete)) && (
            <Table.Cell>
              <span className="sr-only">
                {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
              </span>
            </Table.Cell>
          )}
        </Table.Row>
      ))}

      {languages?.map((language) => (
        <LanguageListItem
          key={`${language?._id}`}
          language={language}
          onRemove={onRemoveLanguage}
          enableEdit={hasRole(ACTION_ROLES.country.view)}
          enableDelete={hasRole(ACTION_ROLES.country.delete)}
        />
      ))}
    </Table>
  );
};

export default LanguageList;
