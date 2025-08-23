import { renderTexts } from './textRenderers';
import CopilotFilterList, { CopilotFilterItem } from '../product/CopilotFilterList';
import OperationStatusIndicator from '../OperationStatusIndicator';

const toolsMap = {
  LIST: CopilotFilterList,    
  GET: CopilotFilterItem,
  CREATE: CopilotFilterItem,
  UPDATE: CopilotFilterItem,
  REMOVE: OperationStatusIndicator,
  REMOVE_OPTION: CopilotFilterItem,
  GET_TEXTS: renderTexts('GET_TEXTS'),
  UPDATE_TEXTS: renderTexts('UPDATE_TEXTS'),
  CREATE_OPTION: CopilotFilterItem,
};

const filterRenderers = ({ data, action, toolCallId }) => {
  const Component = toolsMap?.[action];
  return Component ? (
    <Component {...{ toolCallId, ...data }} />
  ) : (
    JSON.stringify({ action, data }, null, 2)
  );
};
export default filterRenderers;
