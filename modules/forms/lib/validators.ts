/* eslint-disable no-undef */
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import matches from 'validator/lib/matches';
import isInt from 'validator/lib/isInt';
import { isValid as isValidDate, isAfter, isBefore, format } from 'date-fns';

import { MessageDescriptor } from 'react-intl';
import { PrimitiveType } from 'intl-messageformat';
import parseDate from './parseDate';

export const DATE_FORMAT = 'd.M.y';

export type Validator = {
  isValid: (arg0: any) => boolean;
  intlMessageDescriptor: MessageDescriptor;
  intlMessageValues?: Record<string, PrimitiveType>;
};

const isString = (value) => typeof value === 'string';

export const validateMaxLength = (max: number): Validator => ({
  isValid: (value) => isLength(value || '', { max }),
  intlMessageDescriptor: { id: 'error_max_length' },
  intlMessageValues: { maxLength: max.toString() },
});

export const validateEmail: Validator = {
  isValid: (value) => isEmail(value || ''),
  intlMessageDescriptor: { id: 'error_email' },
};

export const validateRequired: Validator = {
  isValid: (value) => {
    if (isString(value)) {
      return value.trim().length > 0;
    }
    if (typeof value === 'number') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  },
  intlMessageDescriptor: { id: 'error_required' },
};

export const validateDate: Validator = {
  isValid: isValidDate,
  intlMessageDescriptor: { id: 'error_invalid_date' },
};

export const validateDateInput: Validator = {
  isValid: (value) => {
    const parsed = parseDate(value);
    return isValidDate(parsed);
  },
  intlMessageDescriptor: { id: 'error_invalid_date' },
};

export const validateDateBefore = (dateToCompare): Validator => ({
  isValid: (value) => {
    const parsed = parseDate(value);

    return isBefore(parsed, dateToCompare);
  },
  intlMessageDescriptor: { id: 'error_date_before' },
  intlMessageValues: { dateToCompare: format(dateToCompare, DATE_FORMAT) },
});

export const validateDateAfter = (dateToCompare): Validator => {
  return {
    isValid: (value) => {
      const parsed = isString(value) ? parseDate(value) : value;

      return isAfter(parsed, dateToCompare);
    },
    intlMessageDescriptor: { id: 'error_date_after' },
    intlMessageValues: { dateToCompare: format(dateToCompare, DATE_FORMAT) },
  };
};

export const validateContactNumber: Validator = {
  isValid: (value) => matches(value || '', /^[k]\d{6}$/gi),
  intlMessageDescriptor: { id: 'error_contact_number_invalid' },
};

export const validateName: Validator = {
  isValid: (value) => matches(value || '', /^[^0-9_$!?*%&/+:;.,<>¨^"'@#]*$/g),
  intlMessageDescriptor: { id: 'error_name_invalid' },
};

export const validatePostalCode: Validator = {
  isValid: (value) =>
    isInt(value || '', { min: 1000, max: 9699, allow_leading_zeroes: false }),
  intlMessageDescriptor: { id: 'error_postal_code_invalid' },
};

export const validatePhoneNumber: Validator = {
  isValid: (value) => matches(value || '', /^[0+]{1}[0-9() ]{9,25}$/g),
  intlMessageDescriptor: { id: 'error_phone_number_invalid' },
};
