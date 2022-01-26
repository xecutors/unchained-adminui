import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import AssortmentForm from '../../modules/assortment/components/AssortmentForm';
import useCreateAssortment from '../../modules/assortment/hooks/useCreateAssortment';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';

const AddAssortments = () => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { createAssortment } = useCreateAssortment();
  const onCreateAssortment = async ({ isRoot, tags, title }) => {
    await createAssortment({ title, isRoot, tags });
    return true;
  };

  const onSubmitSuccess = () => {
    push('/assortments');
  };

  return (
    <div className="mt-6  sm:max-w-lg">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_assortment_header',
          defaultMessage: 'New Assortment',
        })}
      />
      <FormHeader>
        <AssortmentForm
          onSubmitSuccess={onSubmitSuccess}
          onSubmit={onCreateAssortment}
        />
      </FormHeader>
    </div>
  );
};

export default AddAssortments;
