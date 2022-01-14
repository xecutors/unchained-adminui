import { FormikValues } from 'formik';

const clean = (values: FormikValues): FormikValues =>
  Object.fromEntries(
    Object.entries(values).map(([name, value]) => [
      name,
      typeof value === 'string' ? value.trim() : value,
    ]),
  );

export default clean;
