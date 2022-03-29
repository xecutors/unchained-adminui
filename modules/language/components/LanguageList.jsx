import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({ languages, onRemoveLanguage }) => {
  const { formatMessage } = useIntl();

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

          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
      ))}

      {languages?.map((language) => (
        <LanguageListItem
          key={`${language?._id}`}
          language={language}
          onRemove={onRemoveLanguage}
        />
      ))}
    </Table>
  );
};

export default LanguageList;
