const subtractDay = (from = new Date(), daysInNumber) => {
  const fromDate = new Date(from);
  fromDate.setDate(fromDate.getDate() - daysInNumber);
  return fromDate.getTime();
};

export default subtractDay;
