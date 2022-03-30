import { FormikValues } from 'formik';

const sanitize = (value) => {
  if (value === '' || (typeof value === 'string' && value?.trim() === ''))
    return null;
  if (typeof value === 'string' && value.length) return value.trim();
  return value;
};

const clean = (values: FormikValues): FormikValues =>
  Object.fromEntries(
    Object.entries(values).map(([name, value]) => [name, sanitize(value)]),
  );

export default clean;
