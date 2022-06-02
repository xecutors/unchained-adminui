import parseDate from './parseDate';

const formatDate = ({
  date,
  locale,
  timeZone,
  timeStyle = 'long',
  dateStyle = 'full',
}: {
  date: string;
  locale?: string;
  timeZone?: string;
  dateStyle?: 'long' | 'medium' | 'short' | 'full';
  timeStyle?: 'long' | 'medium' | 'short' | 'full';
}) => {
  return Intl.DateTimeFormat(locale || 'default', {
    dateStyle,
    timeStyle,
    timeZone: 'UTC' || timeZone,
  }).format(parseDate(date));
};

export default formatDate;
