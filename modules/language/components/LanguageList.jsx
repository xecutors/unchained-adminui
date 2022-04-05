import { useIntl } from 'react-intl';
import useCurrentRoles from '../../accounts/hooks/useCurrentRoles';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({ languages, onRemoveLanguage }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useCurrentRoles();

  return (
    <Table className="min-w-full ">
      {languages?.map((language) => (
        <Table.Row key={language._id} header>
          <Table.Cell>
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>
          {hasRole(ACTION_ROLES.country.update) ||
            (hasRole(ACTION_ROLES.country.delete) && (
              <Table.Cell>
                <span className="sr-only">
                  {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                  {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
                </span>
              </Table.Cell>
            ))}
        </Table.Row>
      ))}

      {languages?.map((language) => (
        <LanguageListItem
          key={`${language?._id}`}
          language={language}
          onRemove={onRemoveLanguage}
          enableEdit={hasRole(ACTION_ROLES.country.update)}
          enableDelete={hasRole(ACTION_ROLES.country.delete)}
        />
      ))}
    </Table>
  );
};

export default LanguageList;
