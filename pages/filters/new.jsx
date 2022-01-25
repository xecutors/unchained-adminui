import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import FilterForm from '../../modules/filter/components/FilterForm';

const AddFilter = () => {
  //   const { createFilter } = useCreateFilter();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = () => {
    router.push('/filter');
  };

  const onSubmit = async ({ name, key, type }) => {
    await createFilter({ name, key, type });
    return true;
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
        <FilterForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </FormHeader>
    </div>
  );
};

export default AddFilter;
