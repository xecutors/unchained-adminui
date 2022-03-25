import React from 'react';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import FormWrapper from './FormWrapper';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import TagInput from './TagInput';

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
      sequence: 0,
    },
  });
  return (
    <FormWrapper>
      <Form form={form}>
        <div className="flex flex-col gap-2">
          <TagInput
            onChange={(value) => form.formik.setFieldValue('tags', value)}
            tagList={tags}
          />
          <TextField
            required
            type="number"
            name="sequence"
            label={formatMessage({
              id: 'sequence',
              defaultMessage: 'Sequence',
            })}
          />
        </div>
        <SaveAndCancelButtons onCancel={onCancel} className="justify-end" />
      </Form>
    </FormWrapper>
  );
};

export default TagListForm;
