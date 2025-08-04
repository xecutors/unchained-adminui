import CopilotOrderList from '../order/CopilotOrderList';
import SalesSummeryReport from '../order/SalesSummaryReport';

export const renderMultipleOrders = (data: any) =>
  data?.orders ? <CopilotOrderList orders={data.orders} /> : null;

export const renderSalesSummary = (data: any) =>
  data ? <SalesSummeryReport {...data} /> : null;
