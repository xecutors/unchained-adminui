import { ReactElement } from 'react';
import CopilotUserList, { CopilotUserListItem } from '../CopilotUserList';
import OperationStatusIndicator from '../OperationStatusIndicator';
import CopilotOrderList from '../order/CopilotOrderList';

type RendererFn = (data: unknown) => ReactElement | null;
const toolsMap: Record<string, RendererFn> = {
  LIST: CopilotUserList,
  GET: CopilotUserListItem,
  UPDATE: CopilotUserListItem,
  CREATE: CopilotUserListItem,
  SET_TAGS: CopilotUserListItem,
  SEND_VERIFICATION_EMAIL: OperationStatusIndicator,
  SEND_ENROLLMENT_EMAIL: OperationStatusIndicator,
  REMOVE: OperationStatusIndicator,
  REMOVE_PRODUCT_REVIEWS: OperationStatusIndicator,
  SET_USERNAME: CopilotUserListItem,
  ADD_EMAIL: CopilotUserListItem,
  ENROLL: CopilotUserListItem,
  REMOVE_EMAIL: OperationStatusIndicator,
  GET_ORDERS: CopilotOrderList,
};

const userRenderers = ({ action, data, ...rest }) => {
  if (!action) return null;

  const Component = toolsMap?.[action];
  if (!Component) {
    return (
      <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify({ action, data }, null, 2)}
      </pre>
    );
  }

  return <Component {...data} {...rest} />;
};
export default userRenderers;
