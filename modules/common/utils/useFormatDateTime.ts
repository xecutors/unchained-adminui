import { useIntl } from 'react-intl';

const useFormatDateTime = () => {
  const { locale } = useIntl();

  const formatDateTime = (
    date,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ) => {
    if (!date) return 'N/A';

    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return { formatDateTime };
};

export default useFormatDateTime;
