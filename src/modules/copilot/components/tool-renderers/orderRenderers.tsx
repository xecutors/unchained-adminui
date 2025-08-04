import CopilotOrderList from '../order/CopilotOrderList';

export const renderMultipleOrders = (data: any) =>
  data?.orders ? <CopilotOrderList orders={data.orders} /> : null;
