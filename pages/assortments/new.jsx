import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import AssortmentForm from '../../modules/assortment/components/AssortmentForm';
import useCreateAssortment from '../../modules/assortment/hooks/useCreateAssortment';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
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
    <>
      <BreadCrumbs />
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_assortment_header',
            defaultMessage: 'New Assortment',
          })}
        />
        <div className="mt-6  sm:max-w-2xl">
          <FormWrapper>
            <AssortmentForm
              onSubmitSuccess={onSubmitSuccess}
              onSubmit={onCreateAssortment}
            />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddAssortments;
