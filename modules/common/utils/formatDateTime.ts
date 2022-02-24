import { useIntl } from 'react-intl';

const formatDateTime = (date, options) => {
  const { locale } = useIntl();
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export default formatDateTime;
