import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment, {
  preFetchAssortment,
} from '../../modules/assortment/hooks/useAssortment';
import {
  addApolloState,
  initializeApollo,
} from '../../modules/apollo/apolloClient';

const AssortmentDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  const { assortment, loading } = useAssortment({ slug });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortment_detail',
          defaultMessage: 'Assortment Detail',
        })}
      />
      {loading ? <Loading /> : <AssortmentDetail assortment={assortment} />}
    </div>
  );
};

export async function getStaticProps({ params, locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  const { slug } = params;
  const assortment = await preFetchAssortment(apolloClient, { locale, slug });
  if (!assortment)
    return {
      notFound: true,
    };

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default AssortmentDetailPage;
