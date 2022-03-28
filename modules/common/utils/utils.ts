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

const normalizeCountryISOCode = (locale, isoCode) => {
  return isoCode
    ? `${new Intl.DisplayNames([locale], { type: 'region' }).of(
        isoCode,
      )} (${isoCode})`
    : '';
};

const normalizeCurrencyISOCode = (locale, isoCode) => {
  return isoCode
    ? `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
        isoCode,
      )} (${isoCode})`
    : '';
};

export {
  useFormatPrice,
  getInterfaceLabel,
  classNames,
  normalizeCurrencyISOCode,
  normalizeCountryISOCode,
};
