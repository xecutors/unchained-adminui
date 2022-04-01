import { getInterfaceLabel } from '../utils/utils';
import ActiveInActive from './ActiveInActive';
import Badge from './Badge';

// TODO Remove mock data
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
  return (
    <>
      <span className="flex items-center">
        <span className="mr-1">{getInterfaceLabel(provider?.interface)}</span>
        <ActiveInActive isActive={provider?.isActive} />
      </span>

      {/* TODO Replace with props   */}
      <div className="flex flex-wrap">
        {configuration &&
          configuration.map((config) => (
            <Badge
              key={`${config.key} ${config.value}`}
              text={
                `${config.key} | ${config.value}`?.length > 20
                  ? `${config.key} | ${config.value}`
                      ?.slice(0, 20)
                      ?.concat('...')
                  : `${config.key} | ${config.value}`
              }
              color="indigo"
              className="px-1 py-0 mr-1 my-1 block"
            />
          ))}
      </div>
    </>
  );
};

export default ProviderName;
