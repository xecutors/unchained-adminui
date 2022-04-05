import classNames from 'classnames';
import { useIntl } from 'react-intl';
import SubmitButton from '../../forms/components/SubmitButton';

const SaveAndCancelButtons = ({
  cancelText,
  showCancel = true,
  submitText,
  showSubmit = true,
  onCancel,
  className,
}) => {
  const { formatMessage } = useIntl();
  return (
    <span
      className={classNames(
        'flex flex-shrink-0 items-center space-x-4 p-5',
        className,
      )}
    >
      {showCancel ? (
        <button
          onClick={onCancel}
          type="button"
          className={classNames(
            'focus:ring-indigo-400',
            'inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2',
          )}
        >
          {cancelText ||
            formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
        </button>
      ) : null}
      {showSubmit ? (
        <SubmitButton
          label={
            submitText ||
            formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })
          }
        />
      ) : null}
    </span>
  );
};

export default SaveAndCancelButtons;
