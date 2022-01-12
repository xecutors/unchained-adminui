import { parse } from 'date-fns';

export const DATE_FORMAT = 'd.M.y';

const parseDate = (value: string, format?: string) =>
  new Date(parse(value, format || DATE_FORMAT, new Date()).setHours(12));

export default parseDate;
