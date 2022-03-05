import { useIntl } from 'react-intl';

const formatDateTime = (date, options) => {
  const { locale } = useIntl();
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export default formatDateTime;
