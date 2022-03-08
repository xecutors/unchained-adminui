import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import AssortmentAlphabeticalList from '../../../../modules/assortment/components/AssortmentAlphabeticalList';
import BreadCrumbs from '../../../../modules/common/components/BreadCrumbs';

import Loading from '../../../../modules/common/components/Loading';
import PageHeader from '../../../../modules/common/components/PageHeader';
import TabComponent from '../../../../modules/common/components/TabComponent';
import FiltersAlphabeticalList from '../../../../modules/filter/components/FiltersAlphabeticalList';
import ProductsAlphabeticalList from '../../../../modules/product/components/ProductsAlphabeticalList';
import useWork from '../../../../modules/work/hooks/useWork';
import sortArrayAlphabetically from '../../util/sortArrayAlphabetically';

const GetCurrentTab = ({ list, selectedView }) => {
  if (!list) return <Loading />;
  const {
    newProducts,
    updatedProducts,
    removedProducts,
    newAssortments,
    updatedAssortments,
    newFilters,
    updatedFilters,
  } = list;

  if (selectedView === 'new-assortments')
    return <AssortmentAlphabeticalList dictionary={newAssortments} />;
  if (selectedView === 'updated-assortments')
    return <AssortmentAlphabeticalList dictionary={updatedAssortments} />;
  if (selectedView === 'new-products')
    return <ProductsAlphabeticalList dictionary={newProducts} />;
  if (selectedView === 'updated-products')
    return <ProductsAlphabeticalList dictionary={updatedProducts} />;
  if (selectedView === 'removed-products')
    return <ProductsAlphabeticalList dictionary={removedProducts} />;
  if (selectedView === 'new-filters')
    return <FiltersAlphabeticalList dictionary={newFilters} />;
  if (selectedView === 'updated-filter')
    return <FiltersAlphabeticalList dictionary={updatedFilters} />;

  return <AssortmentAlphabeticalList dictionary={updatedAssortments} />;
};

const DailyAnalyticsReportList = () => {
  const { formatMessage } = useIntl();
  const dailySyncItemReportOptions = [
    {
      id: 'new-assortments',
      title: formatMessage({
        id: 'new_assortments',
        defaultMessage: 'New Assortments',
      }),
    },
    {
      id: 'updated-assortments',
      title: formatMessage({
        id: 'updated_assortments',
        defaultMessage: 'Updated Assortments',
      }),
    },
    {
      id: 'new-products',
      title: formatMessage({
        id: 'new_products',
        defaultMessage: 'New Products',
      }),
    },
    {
      id: 'updated-products',
      title: formatMessage({
        id: 'updated_products',
        defaultMessage: 'Updated Products',
      }),
    },
    {
      id: 'removed-products',
      title: formatMessage({
        id: 'deleted_products',
        defaultMessage: 'Deleted products',
      }),
    },
    {
      id: 'new-filters',
      title: formatMessage({
        id: 'new_filters',
        defaultMessage: 'New Filters',
      }),
    },
    {
      id: 'updated-filters',
      title: formatMessage({
        id: 'updated_filters',
        defaultMessage: 'Updated filters',
      }),
    },
  ];
  const { query } = useRouter();

  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;

  const { assortments, filters, products } = work.result;

  const newAssortments = sortArrayAlphabetically(
    assortments?.new,
    'title',
    true,
  );
  const updatedAssortments = sortArrayAlphabetically(
    assortments?.updated,
    'title',
    true,
  );
  const newProducts = sortArrayAlphabetically(products?.new, 'title', true);
  const updatedProducts = sortArrayAlphabetically(
    products?.updated,
    'title',
    true,
  );
  const removedProducts = sortArrayAlphabetically(
    products?.removed,
    'title',
    true,
  );
  const newFilters = sortArrayAlphabetically(filters?.new, 'key', true);
  const updatedFilters = sortArrayAlphabetically(filters?.updated, 'key', true);

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'synced_items_report',
          defaultMessage: 'Synced items report',
        })}
      />
      <TabComponent
        tabItems={dailySyncItemReportOptions}
        defaultTab="new-assortments"
      >
        <GetCurrentTab
          list={{
            newAssortments,
            newFilters,
            newProducts,
            updatedAssortments,
            updatedFilters,
            updatedProducts,
            removedProducts,
          }}
        />
      </TabComponent>
    </>
  );
};

export default DailyAnalyticsReportList;
