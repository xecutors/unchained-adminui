import CopilotProviderInterfaceList from '../CopilotProviderInterfaceList';
import CopilotProviderList, {
  CopilotProviderListItem,
} from '../CopilotProviderList';

export const renderSingleProvider = (data: any) =>
  data?.provider ? <CopilotProviderListItem provider={data.provider} /> : null;

export const renderMultipleProviders = (data: any) =>
  data?.providers ? (
    <div className="mb-6">
      <CopilotProviderList providers={data.providers} />
    </div>
  ) : null;

export const renderMultipleInterfaces = (data: any) =>
  data?.interfaces ? (
    <div className="mb-6">
      <CopilotProviderInterfaceList interfaces={data.interfaces} />
    </div>
  ) : null;
