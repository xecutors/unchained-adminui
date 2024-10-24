import { zonedTimeToUtc } from 'date-fns-tz';

const useFormatDateTime = () => {
  const formatDateTime = (date, options: Intl.DateTimeFormatOptions = {}) => {
    if (!date || !Date.parse(date)) return 'n/a';
    try {
      const locale =
        (typeof navigator !== 'undefined' && navigator.language) || 'de-ch';
      return Intl.DateTimeFormat(locale, options).format(
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

  const getDateFormatPattern = () => {
    const getPatternForPart = (part) => {
      switch (part.type) {
        case 'day':
          return 'd'.repeat(part.value.length);
        case 'month':
          return 'M'.repeat(part.value.length);
        case 'year':
          return 'y'.repeat(part.value.length);
        case 'literal':
          return part.value;
        default:
          return 'dd.mm.yyyy';
      }
    };

    const locale =
      (typeof navigator !== 'undefined' && navigator.language) || 'de-ch';
    return new Intl.DateTimeFormat(locale)
      .formatToParts(new Date())
      .map(getPatternForPart)
      .join('');
  };

  const parseDate = (value) => {
    return zonedTimeToUtc(
      value,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  };

  return { formatDateTime, getDateFormatPattern, parseDate };
};

export default useFormatDateTime;
