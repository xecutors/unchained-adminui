import { useIntl } from 'react-intl';

const useFormatPrice = () => {
  const { locale } = useIntl();

  const formatPrice = ({ amount, currency }) => {
    if (!currency || !amount) return '0';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
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
  return isoCode
    ? `${new Intl.DisplayNames([locale], { type: 'region' }).of(isoCode)} ${
        showIso ? `(${isoCode})` : ''
      }`
    : '';
};

const normalizeLanguageISOCode = (locale, isoCode, showIso = true) => {
  return isoCode
    ? `${new Intl.DisplayNames([locale], { type: 'language' }).of(isoCode)} ${
        showIso ? `(${isoCode})` : ''
      }`
    : '';
};

const normalizeCurrencyISOCode = (locale, isoCode, showIso = true) => {
  return isoCode
    ? `${new Intl.DisplayNames([locale], { type: 'currency' }).of(isoCode)} ${
        showIso ? `(${isoCode})` : ''
      }`
    : '';
};

export {
  useFormatPrice,
  getInterfaceLabel,
  classNames,
  normalizeCurrencyISOCode,
  normalizeCountryISOCode,
  normalizeLanguageISOCode,
};
