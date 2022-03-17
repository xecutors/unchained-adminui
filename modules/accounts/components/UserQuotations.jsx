import Loading from '../../common/components/Loading';
import QuotationList from '../../quotation/components/QuotationList';
import useUserQuotations from '../../quotation/hooks/useUserQuotations';

const UserQuotations = ({ _id: userId }) => {
  const { quotations, loading } = useUserQuotations({ userId });

  if (loading) return <Loading />;
  return <QuotationList quotations={quotations} />;
};

export default UserQuotations;
