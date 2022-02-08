import classNames from 'classnames';
import { useFormikContext } from 'formik';

import useFormContext from '../hooks/useFormContext';

const SubmitButton = ({
  label,
  disabled: disabledProp = false,
  className,
  ...props
}) => {
  const formik = useFormikContext();
  const { half, full, third, ...restProps } = props;

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
        'mb-5 mt-5 mr-2  text-center cursor-pointer items-center px-3 py-1 border border-transparent  shadow-sm text-sm leading-5 font-medium rounded-md text-white focus:ring-indigo-500',
        className,
        {
          'bg-red-600  ': disabled,
          ' bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 ':
            !disabled,
          'w-1/2': half,
          'w-1/3': third,
          'w-full': full,
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
