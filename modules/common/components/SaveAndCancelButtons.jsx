import classNames from 'classnames';
import { useIntl } from 'react-intl';

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
        'ml-1 flex flex-shrink-0 items-center space-x-4 pt-4',
        className,
      )}
    >
      {showCancel ? (
        <button
          onClick={onCancel}
          type="button"
          className={classNames(
            'focus:ring-indigo-400',
            'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2',
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
        <button
          type="submit"
          className="rounded-md bg-indigo-500 py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          {submitText ||
            formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
        </button>
      ) : null}
    </span>
  );
};

export default SaveAndCancelButtons;
