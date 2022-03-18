import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import FilterForm from '../../modules/filter/components/FilterForm';
import useCreateFilter from '../../modules/filter/hooks/useCreateFilter';

const AddFilter = () => {
  const { push: routerPush } = useRouter();
  const { formatMessage } = useIntl();

  const { createFilter } = useCreateFilter();

  const onSubmit = async ({ key, title, type, options }) => {
    await createFilter({
      options,
      key,
      title,
      type,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/filters');
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_filter_header',
          defaultMessage: 'New filter',
        })}
      />
      <div className="mt-6  sm:max-w-2xl">
        <FormWrapper>
          <FilterForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </FormWrapper>
      </div>
    </>
  );
};

export default AddFilter;
