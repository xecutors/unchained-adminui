/* eslint-disable react/no-danger */
import React from 'react';

import useFormContext from '../hooks/useFormContext';

const createHandler = (name) => () => {
  const element = document.getElementById(name);
  if (!element) return;
  element.focus();
};

const flatten = (obj, path = '') => {
  // eslint-disable-next-line
  const entries = Object.entries(obj).reduce((carry = [], [key, value]) => {
    // Do no walk react elements
    if (typeof value === 'string' || React.isValidElement(value)) {
      return [...carry, [`${path}${key}`, value]];
    }

    const subentries = Object.entries(flatten(value, `${path}${key}.`));
    return [...subentries, ...carry];
  }, []);

  return Object.fromEntries(entries);
};

export const FormErrorsPure = ({ submitError = '', fieldErrors = [] }) => {
  return (
    <div className="text-red-600 ml-4">
      <ul>
        {submitError && (
          <li key="submitError" className="disabled">
            <span dangerouslySetInnerHTML={{ __html: submitError }} />
          </li>
        )}
        {Object.entries(flatten(fieldErrors)).map(([name, message]) => (
          <li key={name} className="disabled">
            <button
              type="button"
              className="no-button form-errors-item"
              aria-label="Error button"
              onClick={createHandler(name)}
            >
              {React.isValidElement(message) ? (
                message
              ) : (
                <span dangerouslySetInnerHTML={{ __html: message }} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FormErrors = () => {
  const { submitError, formik } = useFormContext();

  const fieldErrors = formik.errors;

  const show =
    submitError ||
    (formik.submitCount > 0 && !!Object.keys(fieldErrors).length);

  return (
    show && (
      <FormErrorsPure submitError={submitError} fieldErrors={fieldErrors} />
    )
  );
};

export default FormErrors;
