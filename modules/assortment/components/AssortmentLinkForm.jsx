import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useAddAssortmentLink from '../hooks/useAddAssortmentLink';
import useSearchAssortments from '../hooks/useSearchAssortments';
import FilterableDropdown from '../../common/components/FilterableDropdown';

const normalizeAssortments = (productsList = []) => {
  return productsList?.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};

const AssortmentLinkForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentLink } = useAddAssortmentLink();
  const [queryString, setQueryString] = useState('');
  const { assortments } = useSearchAssortments({
    queryString,
    limit: 50,
  });

  const onSubmit = async ({ childAssortmentId }) => {
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
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="grid gap-6 px-4 py-5 bg-white sm:p-6">
          <div className="col-span-12">
            <TagInput
              name="tags"
              id="tags"
              label={formatMessage({
                id: 'tags',
                defaultMessage: 'Tags',
              })}
              onChange={(newTags) => setTags(newTags)}
              autoComplete="on"
              options={{}}
              className="text-sm font-medium text-gray-500 mt-1 w-full"
            />
          </div>
          <div className="col-span-12">
            <FilterableDropdown
              name="childAssortmentId"
              label={formatMessage({
                id: 'child_assortment',
                defaultMessage: 'Sub-Assortment',
              })}
              onFilter={setQueryString}
              data={normalizeAssortments(assortments)}
              className="text-sm font-medium text-gray-500 §mt-1 w-full"
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
