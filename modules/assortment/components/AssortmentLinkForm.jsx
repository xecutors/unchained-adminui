import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';
import useAddAssortmentLink from '../hooks/useAddAssortmentLink';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import useAssortments from '../hooks/useAssortments';

const normalizeAssortments = (assortmentList = []) => {
  return assortmentList?.map(({ _id, texts }) => ({
    _id,
    title: texts?.title,
    subtitle: texts?.subtitle,
  }));
};

const AssortmentLinkForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentLink } = useAddAssortmentLink();
  const { assortments } = useAssortments({ includeLeaves: true });

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
            <SelectField
              name="childAssortmentId"
              label={formatMessage({
                id: 'child_assortment',
                defaultMessage: 'Sub-Assortment',
              })}
              options={convertArrayOfObjectToObject(
                normalizeAssortments(assortments),
                'title',
                '_id',
              )}
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
