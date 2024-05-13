import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import FilterForm from '../../modules/filter/components/FilterForm';
import useCreateFilter from '../../modules/filter/hooks/useCreateFilter';
import {
  OnSubmitSuccessType,
  OnSubmitType,
} from '../../modules/forms/hooks/useForm';

const AddFilter = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const { createFilter } = useCreateFilter();

  const onSubmit: OnSubmitType = async ({ key, title, type, options }) => {
    const { data, errors } = await createFilter({
      filter: {
        options,
        title,
        key,
        type,
      },
    });
    return { success: !errors?.length, data: data?.createFilter };
  };

  const onSubmitSuccess: OnSubmitSuccessType = (_, { _id }) => {
    router.push(`/filters/${_id}`);
    return null;
  };

  return (
    <>
      <BreadCrumbs />
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_filter_header',
            defaultMessage: 'New filter',
          })}
        />
        <div className="mt-6">
          <FormWrapper>
            <FilterForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddFilter;
