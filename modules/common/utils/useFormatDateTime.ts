import { useIntl } from 'react-intl';

const useFormatDateTime = () => {
  const { locale } = useIntl();

  const formatDateTime = (
    date,
    options: Intl.DateTimeFormatOptions = {
      dateStyle: 'full',
      timeStyle: 'short',
    },
  ) => {
    if (!date) return 'N/A';
    try {
      return Intl.DateTimeFormat(locale || 'default', options).format(
        new Date(date).getTime(),
      );
    } catch {
      return Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(date).getTime());
    }
  };

  return { formatDateTime };
};

export default useFormatDateTime;
