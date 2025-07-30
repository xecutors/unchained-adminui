import CopilotPaymentInterfaceList from '../CopilotPaymentInterfaceList';
import CopilotPaymentProviderList, {
  CopilotPaymentProviderListItem,
} from '../CopilotPaymentProviderList';

export const renderSinglePaymentProvider = (data: any) =>
  data?.paymentProvider ? (
    <CopilotPaymentProviderListItem provider={data.paymentProvider} />
  ) : null;

export const renderMultiplePaymentProviders = (data: any) =>
  data?.paymentProviders ? (
    <div className="mb-6">
      <CopilotPaymentProviderList paymentProviders={data.paymentProviders} />
    </div>
  ) : null;

export const renderMultiplePaymentInterfaces = (data: any) =>
  data?.paymentInterfaces ? (
    <div className="mb-6">
      <CopilotPaymentInterfaceList paymentInterfaces={data.paymentInterfaces} />
    </div>
  ) : null;
