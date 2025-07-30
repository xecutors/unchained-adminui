import CopilotProviderInterfaceList from '../CopilotProviderInterfaceList';
import CopilotProviderList, {
  CopilotProviderListItem,
} from '../CopilotProviderList';

const getProviderType = (toolName) => {
  if (toolName.includes('warehousing')) return 'warehousing';
  else if (toolName.includes('payment')) return 'payment';
  else return 'delivery';
};

export const renderSingleProvider = (toolName) => {
  const singleProvider = (data: any) =>
    data?.provider ? (
      <CopilotProviderListItem
        type={getProviderType(toolName)}
        provider={data.provider}
      />
    ) : null;

  return singleProvider;
};
export const renderMultipleProviders = (toolName) => {
  const multipleProvider = (data: any) =>
    data?.providers ? (
      <div className="mb-6">
        <CopilotProviderList
          type={getProviderType(toolName)}
          providers={data.providers}
        />
      </div>
    ) : null;

  return multipleProvider;
};

export const renderMultipleInterfaces = (data: any) =>
  data?.interfaces ? (
    <div className="mb-6">
      <CopilotProviderInterfaceList interfaces={data.interfaces} />
    </div>
  ) : null;
