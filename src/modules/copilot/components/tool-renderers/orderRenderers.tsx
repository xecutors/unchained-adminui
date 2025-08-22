import CopilotOrderList from '../order/CopilotOrderList';
import SalesSummeryReport from '../order/SalesSummaryReport';
import TopCustomerList from '../order/TopCustomerList';
import TopSellingProductList from '../order/TopSellingProductList';

export const renderMultipleOrders = (data: any) =>
  data?.orders ? <CopilotOrderList orders={data.orders} /> : null;

export const renderSalesSummary = (data: any) =>
  data ? <SalesSummeryReport {...data} /> : null;

export const renderTopSellingProducts = (data: any) =>
  data ? <TopSellingProductList {...data} /> : null;

export const renderTopCustomers = (data: any) =>
  data ? <TopCustomerList {...data} /> : null;

export const renderOrderToolResponses = ({ action, data }) => {
  switch (action) {
    case 'TOP_CUSTOMERS':
      return renderTopCustomers(data);
    case 'MONTHLY_BREAKDOWN':
      return renderSalesSummary(data);
    case 'SALES_SUMMARY':
      return renderSalesSummary(data);
    case 'TOP_PRODUCTS':
      return renderTopSellingProducts(data);
    case 'LIST_ORDERS':
      return renderMultipleOrders(data);
    default:
      return null;
  }
};
