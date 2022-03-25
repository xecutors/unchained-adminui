import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import Button from './Button';
import TagInput from './TagInput';

const TagForm = ({ tags, onCancel }) => {
  const { formatMessage } = useIntl();
  const { tag, setTag } = useState();
  const form = useForm({
    submit: '',
    successMessage: '',
    initialValues: {
      meta: '',
      title: '',
      value: '',
    },
  });
  return (
    <Form form={form}>
      <div className="flex flex-col gap-2">
        <TagInput onChange={() => setTag} tagList={tags} />
        <JSONAreaField
          id="meta"
          name="meta"
          value={form.formik.initialValues}
          label={formatMessage({ id: 'meta', defaultMessage: 'Meta' })}
        />
        <div className="flex gap-4">
          <Button
            text={formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
            onClick={onCancel}
            className="border-gray-300 bg-white text-gray-700"
          />
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </div>
    </Form>
  );
};

export default TagForm;
