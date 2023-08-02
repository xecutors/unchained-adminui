import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import useForm from '../../forms/hooks/useForm';

const ProductReviewReportCommentForm = ({
  onSubmit,
  onSubmitSuccess = async () => true,
}) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

  const successMessage = formatMessage({
    id: 'product_review_added',
    defaultMessage: 'Review added successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    onSubmitSuccess,
    initialValues: {
      message: '',
    },
  });
  return (
    <Form form={form}>
      <div className="px-5 py-2">
        <TextAreaField
          rows={3}
          required
          name="message"
          id="message"
          label={formatMessage({
            id: 'message',
            defaultMessage: 'message',
          })}
        />
      </div>
      <div className="border-t-indigo-50 border-t dark:border-t-slate-700 sm:px-15 space-y-6 rounded-b-md bg-slate-50 dark:bg-slate-800 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('voteProductReview')}
          label={formatMessage({
            id: 'report-submit',
            defaultMessage: 'Submit',
          })}
        />
      </div>
    </Form>
  );
};

export default ProductReviewReportCommentForm;
