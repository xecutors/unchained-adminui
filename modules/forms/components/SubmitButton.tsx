import { useFormikContext } from 'formik';

import useFormContext from '../hooks/useFormContext';

const SubmitButton = ({
  label,
  disabled: disabledProp = false,
  className = 'button button--primary button--wider mt-1',
  ...props
}) => {
  const formik = useFormikContext();

  const fieldsMetaProps = Object.fromEntries(
    Object.keys(formik.initialValues).map((fieldName) => [
      fieldName,
      formik.getFieldMeta(fieldName),
    ]),
  );
  const { disabled: contextDisabled } = useFormContext();

  /* We need to this, because formik.errors contains all errors, including the
  fields that weren't touched yet */
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
      className={className}
      aria-label={label}
      type="submit"
      value={label}
      disabled={disabled}
      {...props}
    />
  );
};

export default SubmitButton;
