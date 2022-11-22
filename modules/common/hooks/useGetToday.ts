const convertToTwoDigit = (value) =>
  Number(value) < 10 ? `0${value}` : +value;

const useGetToday = () => {
  const today = () => {
    const now = new Date();
    return `${now.getFullYear()}-${convertToTwoDigit(
      now.getMonth() + 1,
    )}-${convertToTwoDigit(now.getDate())}`;
  };

  return { today };
};

export default useGetToday;
