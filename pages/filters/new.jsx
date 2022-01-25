import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import FilterForm from '../../modules/filter/components/FilterForm';
import useFilters from '../../modules/filter/hooks/useFilters';

const AddFilter = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  //const { createFilter } = useCreateFilter();
  //const { removeFilter } = useRemoveFilter();
  const { filter } = useFilters({
    filterId: id,
  });

  const onSubmit = async ({ option }) => {
    // await createFilter({
    //   option,
    //   filterId: id,
    // });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/filter');
  };

  return (
    <div className="mt-6  sm:max-w-lg">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_filter_header',
          defaultMessage: 'New filter',
        })}
      />
      <FormHeader
        headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
      >
        <FilterForm
          // onSubmit={onSubmit}
          // onSubmitSuccess={onSubmitSuccess}
          defaultValue={filter?.option || []}
        />
      </FormHeader>
    </div>
  );
};

export default AddFilter;
