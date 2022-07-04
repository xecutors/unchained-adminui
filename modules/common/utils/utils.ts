import { useIntl } from 'react-intl';

const useFormatPrice = () => {
  const { locale } = useIntl();

  const formatPrice = (price) => {
    const { amount, currency } = price || {};
    if (!currency || !amount) return '0';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  return { formatPrice };
};

const getInterfaceLabel = (
  { label, version } = { label: null, version: null },
) => {
  return label && version ? `${label} ${version}` : '';
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const normalizeCountryISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';

  try {
    return `${new Intl.DisplayNames([locale], { type: 'region' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const normalizeLanguageISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';
  try {
    return `${new Intl.DisplayNames([locale], { type: 'language' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const normalizeCurrencyISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';
  try {
    return `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const getSortKeys = (sort) => {
  return (
    (sort !== '' &&
      sort.split(',').map((field) => ({
        key: field.split('_')[0],
        value: field.split('_')[1],
      }))) ||
    []
  );
};

export {
  useFormatPrice,
  getInterfaceLabel,
  classNames,
  normalizeCurrencyISOCode,
  normalizeCountryISOCode,
  normalizeLanguageISOCode,
  getSortKeys,
};
