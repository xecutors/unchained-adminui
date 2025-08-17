import { ReactElement } from 'react';
import ShopInfoCard from '../ShopInfo';
import CopilotEventList, { CopilotEventListItem } from '../CopilotEventList';
import CopilotEventStatistics from '../CopilotEventStatistics';
import CopilotWorkerList, { CopilotWorkerListItem } from '../CopilotWorkerList';

type RendererFn = (data: unknown) => ReactElement | null;
const toolsMap: Record<string, RendererFn> = {
  SHOP_INFO: ShopInfoCard,
  EVENT_LIST: CopilotEventList,
  EVENT_GET: CopilotEventListItem,
  EVENT_STATISTICS: CopilotEventStatistics,
  WORKER_LIST: CopilotWorkerList,
  WORKER_GET: CopilotWorkerListItem,
  WORKER_ADD: CopilotWorkerListItem,
  WORKER_REMOVE: CopilotWorkerListItem,
  WORKER_ALLOCATE: CopilotWorkerListItem,
  WORKER_PROCESS_NEXT: CopilotWorkerListItem,
  WORKER_FINISH_WORK: CopilotWorkerListItem,
};

const systemInfoRenderers = ({ action, data, ...rest }) => {
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
export default systemInfoRenderers;
