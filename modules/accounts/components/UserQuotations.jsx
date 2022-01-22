import QuotationList from '../../quotation/components/QuotationList';
import useUserQuotations from '../../quotation/hooks/useUserQuotations';

const UserQuotations = ({ _id: userId }) => {
  const { quotations } = useUserQuotations({ userId });
  return <QuotationList quotations={quotations} />;
};

export default UserQuotations;
