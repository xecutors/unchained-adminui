import { useIntl } from 'react-intl';

const getCurrencyAndPrice = ({ amount, currency }) => {
  return `${currency} ${amount}`;
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

export {
  getCurrencyAndPrice,
  getInterfaceLabel,
  getTotalDiscount,
  formatDateTime,
};
