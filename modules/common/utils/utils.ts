import { useIntl } from 'react-intl';

const getCurrencyAndPrice = ({ amount, currency }) => {
  const { locale } = useIntl();
  if (!currency) return '0';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

const getInterfaceLabel = ({ label, version }) => {
  return `${label} ${version}`;
};

const getTotalDiscount = (discounts) => {
  const initialValue = 0;
  const totalDiscount = discounts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.total.amount,
    initialValue,
  );
  return totalDiscount;
};

const formatDateTime = (
  date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
) => {
  const { locale } = useIntl();
  return new Intl.DateTimeFormat(locale, options).format(date);
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export {
  getCurrencyAndPrice,
  getInterfaceLabel,
  getTotalDiscount,
  formatDateTime,
  classNames,
};
