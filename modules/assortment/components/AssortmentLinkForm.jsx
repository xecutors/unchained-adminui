import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useAddAssortmentLink from '../hooks/useAddAssortmentLink';
import useSearchAssortments from '../hooks/useSearchAssortments';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import TagInputField from '../../forms/components/TagInputField';

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
    <Form form={form}>
      <div className="shadow sm:rounded-md">
        <div className="grid gap-6 bg-white px-4 py-5 sm:p-6">
          <div className="col-span-12">
            <TagInputField
              name="tags"
              id="tags"
              hideLabel
              className="mt-1 w-full text-sm font-medium text-gray-500"
            />
            <FilterableDropdown
              name="childAssortmentId"
              label={formatMessage({
                id: 'child_assortment',
                defaultMessage: 'Sub-Assortment',
              })}
              onFilter={setQueryString}
              data={normalizeAssortments(assortments)}
              className="mt-1 w-full py-2 text-sm font-medium text-gray-500"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-5 text-right sm:px-6">
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
            full
          />
        </div>
      </div>
    </Form>
  );
};

export default AssortmentLinkForm;
