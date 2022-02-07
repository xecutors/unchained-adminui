const subtractDay = (daysInNumber) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - daysInNumber);
  return fromDate.getTime();
};

export default subtractDay;
