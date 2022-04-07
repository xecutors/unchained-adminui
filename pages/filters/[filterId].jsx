import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  addApolloState,
  initializeApollo,
} from '../../modules/apollo/apolloClient';
import useAuth from '../../modules/Auth/useAuth';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ACTION_ROLES from '../../modules/common/data/roles';
import FilterDetail from '../../modules/filter/components/FilterDetail';
import useFilter, {
  preFetchFilter,
} from '../../modules/filter/hooks/useFilter';
import useRemoveFilter from '../../modules/filter/hooks/useRemoveFilter';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

const FilterDetailPage = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { query } = useRouter();
  const router = useRouter();
  const { filterId = '' } = query || {};
  const { filter, loading } = useFilter({ filterId });
  const { hasRole } = useAuth();

  const { removeFilter } = useRemoveFilter();

  const onRemoveFilter = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this filter? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeFilter({ filterId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'Filter {filterId} deleted successfully',
              },
              {
                filterId,
              },
            ),
          );
          router.push('/filters');
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
    );
  };

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs currentPageTitle={filter?.key} />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'filter_detail',
            defaultMessage: 'Filter Detail',
          })}
        />
        {hasRole(ACTION_ROLES.filters.delete) && (
          <HeaderDeleteButton onClick={onRemoveFilter} />
        )}
      </div>

      {loading ? <Loading /> : <FilterDetail filter={filter} />}
    </div>
  );
};

export async function getStaticProps({ params, locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  const { filterId } = params;
  const filter = await preFetchFilter(apolloClient, { locale, filterId });
  if (!filter)
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

export default FilterDetailPage;
