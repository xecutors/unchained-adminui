import parseDate from './parseDate';

const formatDate = ({
  date,
  locale,
  timeZone,
}: {
  date: string;
  locale?: string;
  timeZone?: string;
}) => {
  return Intl.DateTimeFormat(locale || 'default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC' || timeZone,
  }).format(parseDate(date));
};

export default formatDate;
