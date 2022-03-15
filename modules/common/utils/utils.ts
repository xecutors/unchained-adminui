import { useIntl } from 'react-intl';

const useFormatPrice = (
  { amount, currency } = { amount: null, currency: null },
) => {
  const { locale } = useIntl();

  const formatPrice = () => {
    if (!currency || !amount) return '0';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const calculateTotalDiscount = (discounts) => {
    const initialValue = 0;
    const totalDiscount = discounts.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.total.amount,
      initialValue,
    );
    return totalDiscount;
  };

  return { formatPrice, calculateTotalDiscount };
};

const getInterfaceLabel = ({ label, version }) => {
  return `${label} ${version}`;
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export { useFormatPrice, getInterfaceLabel, classNames };
