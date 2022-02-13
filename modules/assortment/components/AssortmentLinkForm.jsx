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
      <div className="w-full  justify-between1 1align-baseline">
        <TagInput
          name="tags"
          id="tags"
          label={formatMessage({
            id: 'tags',
            defaultMessage: 'tags',
          })}
          onChange={(newTags) => setTags(newTags)}
          autoComplete="on"
          options={{}}
          className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
        />

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
          className="text-sm font-medium text-gray-500 py-2   mt-1 w-full"
        />
      </div>

      <SubmitButton
        label={formatMessage({
          id: 'save',
          defaultMessage: 'Save',
        })}
        full
      />
    </Form>
  );
};

export default AssortmentLinkForm;
