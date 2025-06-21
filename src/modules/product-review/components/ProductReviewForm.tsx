import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import TextAreaField from '../../forms/components/TextAreaField';

const ProductReviewForm = ({
  onSubmit,
  onSubmitSuccess = null,
  defaultValue = {},
  isEdit = false,
}) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

  const reviewAddedMessage = formatMessage({
    id: 'product_review_added',
    defaultMessage: 'Review added successfully!',
  });
  const reviewUpdatedMessage = formatMessage({
    id: 'product_review_updated',
    defaultMessage: 'Review updated successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: isEdit ? reviewUpdatedMessage : reviewAddedMessage,
    initialValues: {
      title: '',
      review: '',
      rating: 1,
      ...defaultValue,
    },
  });
  return (
    <Form form={form}>
      <div className="px-5 py-2">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          autoComplete="off"
          required
          className="my-4"
        />

        <TextAreaField
          rows={3}
          name="review"
          id="review"
          label={formatMessage({
            id: 'review',
            defaultMessage: 'Review',
          })}
        />
      </div>
      <div className="border-t-slate-100 border-t dark:border-t-slate-700 space-y-6 rounded-b-md dark:bg-slate-800 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('reviewProduct')}
          label={
            isEdit
              ? formatMessage({
                  id: 'update_review',
                  defaultMessage: 'Update Review',
                })
              : formatMessage({
                  id: 'add_review',
                  defaultMessage: 'Add Review',
                })
          }
        />
      </div>
    </Form>
  );
};

export default ProductReviewForm;
