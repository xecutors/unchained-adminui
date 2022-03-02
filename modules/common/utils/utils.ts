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

export { getCurrencyAndPrice, getInterfaceLabel, getTotalDiscount };
