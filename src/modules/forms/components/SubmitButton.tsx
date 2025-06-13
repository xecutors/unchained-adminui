import classNames from 'classnames';
import { useFormikContext } from 'formik';

import useFormContext from '../hooks/useFormContext';

const SubmitButton = ({
  label,
  disabled: disabledProp = false,
  className = '',
  hidden = false,
  ...props
}) => {
  const formik = useFormikContext();
  const { ...restProps } = props;

  const fieldsMetaProps = Object.fromEntries(
    Object.keys(formik.initialValues).map((fieldName) => [
      fieldName,
      formik.getFieldMeta(fieldName),
    ]),
  );
  const { disabled: contextDisabled } = useFormContext();

  const hasError = Object.values(fieldsMetaProps).reduce(
    (acc, { error, touched }) => {
      if (acc) return acc;
      return error && touched;
    },
    false,
  );

  const disabled =
    disabledProp || contextDisabled || formik.isSubmitting || hasError;
  return (
    <input
      className={classNames(
        'inline-flex cursor-pointer justify-center rounded-md border border-transparent px-4 py-2 text-center text-sm font-medium leading-5 text-white shadow-xs focus:ring-indigo-400',
        className,
        {
          'bg-red-200 dark:bg-red-300 dark:text-red-900 cursor-not-allowed':
            disabled,

          ' bg-indigo-500 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 ':
            !disabled,
          hidden,
        },
      )}
      aria-label={label}
      type="submit"
      value={label}
      disabled={disabled}
      {...restProps}
    />
  );
};

export default SubmitButton;
