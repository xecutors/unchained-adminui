import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useAddAssortmentLink from '../hooks/useAddAssortmentLink';
import useSearchAssortments from '../hooks/useSearchAssortments';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import TagInputField from '../../forms/components/TagInputField';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';

const normalizeAssortments = (productsList = []) => {
  return productsList?.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};

const AssortmentLinkForm = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { addAssortmentLink } = useAddAssortmentLink();
  const { hasRole } = useAuth();
  const [queryString, setQueryString] = useState('');
  const { assortments } = useSearchAssortments({
    queryString,
    limit: 50,
  });

  const onSubmit = async ({ childAssortmentId, tags }) => {
    await addAssortmentLink({
      childAssortmentId,
      parentAssortmentId: assortmentId,
      tags,
    });
    return true;
  };

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      childAssortmentId: '',
      tags: '',
    },
  });

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="sm:rounded-md">
          <div className="grid gap-6 px-4 py-5 sm:p-6">
            <div className="col-span-12">
              <TagInputField
                name="tags"
                id="tags"
                label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
                className="mt-1 w-full text-sm font-medium"
              />
              <FilterableDropdown
                name="childAssortmentId"
                label={formatMessage({
                  id: 'child_assortment',
                  defaultMessage: 'Sub-Assortment',
                })}
                required
                onFilter={setQueryString}
                queryString={queryString}
                data={normalizeAssortments(assortments)}
                className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
              />
            </div>
          </div>
          <div className="border-t-indigo-50 border-t bg-slate-50 dark:bg-slate-500 px-4 py-5 text-right sm:px-6">
            <SubmitButton
              hidden={!hasRole(ACTION_ROLES.assortments.addLink)}
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </div>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default AssortmentLinkForm;
