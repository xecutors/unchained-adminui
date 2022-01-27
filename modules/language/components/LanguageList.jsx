import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({ languages, onRemoveLanguage }) => {
  const { formatMessage } = useIntl();

  return (
    <Table className="min-w-full ">
      {languages?.map((language) => (
        <Table.Row key={language._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            &nbsp;
          </Table.Cell>
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
