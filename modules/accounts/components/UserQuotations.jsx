import React from 'react';
import { useRouter } from 'next/router';
import Loading from '../../common/components/Loading';
import SearchField from '../../common/components/SearchField';
import QuotationList from '../../quotation/components/QuotationList';
import useUserQuotations from '../../quotation/hooks/useUserQuotations';

const UserQuotations = ({ _id: userId }) => {
  const { query, push } = useRouter();
  const queryString = query?.queryString || '';

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...query,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...query,
        },
      });
  };

  const { quotations, loading } = useUserQuotations({ userId, queryString });

  if (loading) return <Loading />;
  return (
    <div className="space-y-4 mt-4">
      <SearchField defaultValue={queryString} onInputChange={setQueryString} />
      <QuotationList quotations={quotations} />;
    </div>
  );
};

export default UserQuotations;
