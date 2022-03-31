import React from 'react';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import TagInputField from '../../forms/components/TagInputField';
import useForm from '../../forms/hooks/useForm';
import SaveAndCancelButtons from './SaveAndCancelButtons';

const TagListForm = ({ tags, onSubmit, onCancel }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'tags_updated',
    defaultMessage: 'Tags updated successfully',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    onSubmitSuccess: onCancel,
    initialValues: {
      tags,
    },
  });
  return (
    <Form form={form}>
      <div className="">
        <TagInputField
          name="tags"
          id="tags"
          placeholder={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
          label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
          tagList={tags}
        />
      </div>
      <div className="border border-t-indigo-50 bg-gray-50 mt-6 -mx-5 -mb-6">
        <SaveAndCancelButtons onCancel={onCancel} className="justify-end" />
      </div>
    </Form>
  );
};

export default TagListForm;
