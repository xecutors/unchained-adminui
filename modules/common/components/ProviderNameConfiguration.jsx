import Badge from './Badge';

// TODO Remove mock data
const configurations = [
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

const ProviderNameConfiguration = ({ configuration, color }) => {
  return (
    <div className="flex flex-wrap">
      {/* TODO Replace with props   */}
      {configurations &&
        configurations.map((config) => (
          <Badge
            key={`${config.key} ${config.value}`}
            text={
              `${config.key} | ${config.value}`?.length > 20
                ? `${config.key} | ${config.value}`?.slice(0, 20)?.concat('...')
                : `${config.key} | ${config.value}`
            }
            color={color}
            square
            className="px-1 py-0 mr-1 my-1 block"
          />
        ))}
    </div>
  );
};

export default ProviderNameConfiguration;
