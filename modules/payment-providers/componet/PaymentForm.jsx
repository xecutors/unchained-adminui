import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';

const PaymentForm = ({ onSubmit, onSubmitSuccess, defaultValue = {} }) => {
  const { formatMessage } = useIntl();
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  return (
    <div>
      
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="new-payment"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              New Payment
            </label>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="payment"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Type
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="payment"
                name="payment"
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                <option>Card</option>
                <option>Invoice</option>
                <option>Generic</option>
              </select>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="payment"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Adapter
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="payment"
                name="payment"
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                <option>Choose Adapter </option>
                <option>Adapter</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className="w-16 mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
          label={formatMessage({ id: 'add', defaultMessage: 'Add' })}
        />
    
    </div>
  );
};

export default PaymentForm;
