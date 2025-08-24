import CopilotOrderList, {
  CopilotOrderListItem,
} from '../order/CopilotOrderList';
import SalesSummeryReport from '../order/SalesSummaryReport';
import TopCustomerList from '../order/TopCustomerList';
import TopSellingProductList from '../order/TopSellingProductList';
import { createRenderer } from './shared/createRenderer';

const renderSalesSummary = (data: any) =>
  data ? <SalesSummeryReport {...data} /> : null;

const renderTopSellingProducts = (data: any) =>
  data ? <TopSellingProductList {...data} /> : null;

const renderTopCustomers = (data: any) =>
  data ? <TopCustomerList {...data} /> : null;

const orderToolsMap = {
  TOP_CUSTOMERS: renderTopCustomers,
  MONTHLY_BREAKDOWN: renderSalesSummary,
  SALES_SUMMARY: renderSalesSummary,
  TOP_PRODUCTS: renderTopSellingProducts,
  LIST: CopilotOrderList,
  GET: CopilotOrderListItem,
};

export const renderOrderToolResponses = createRenderer({
  toolsMap: orderToolsMap,
});
