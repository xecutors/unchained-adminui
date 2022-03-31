import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { getInterfaceLabel } from '../utils/utils';
import Badge from './Badge';

const configuration = [
  {
    key: 'sector',
    value: 'Imbiss A',
  },
  {
    key: 'seats',
    value: '1.1,1.2,1.3,2.1,2.2,2.3',
  },
  {
    key: 'online',
    value: 'true',
  },
  {
    key: 'available_delivery_provider',
    value: 'runner',
  },
];

const ProviderName = ({ provider }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <span className="mr-1">{getInterfaceLabel(provider?.interface)}</span>
      {configuration &&
        configuration.map((config) => (
          <Badge
            text={
              `${config.key} | ${config.value}`.length > 20
                ? `${config.key} | ${config.value}`.slice(0, 20).concat('...')
                : `${config.key} | ${config.value}`
            }
            color="indigo"
            className="px-0 py-0 mr-1"
          />
        ))}
    </>
  );
};

export default ProviderName;
