import { useIntl } from 'react-intl';

const useFormatPrice = () => {
  const { locale } = useIntl();

  const formatPrice = (price) => {
    const { amount, currency } = price || {};
    if (!currency || !amount) return '0';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  return { formatPrice };
};

const getInterfaceLabel = (
  { label, version } = { label: null, version: null },
) => {
  return label && version ? `${label} ${version}` : '';
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const normalizeCountryISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';

  try {
    return `${new Intl.DisplayNames([locale], { type: 'region' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const normalizeLanguageISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';
  try {
    return `${new Intl.DisplayNames([locale], { type: 'language' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const normalizeCurrencyISOCode = (locale, isoCode, showIso = true) => {
  if (!isoCode) return '';
  try {
    return `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
      isoCode,
    )} ${showIso ? `(${isoCode})` : ''}`;
  } catch {
    return isoCode;
  }
};

const getSortKeys = (sort) => {
  return (
    (sort !== '' &&
      sort.split(',').map((field) => {
        const [key = null, value = null] = field?.split('_');
        return {
          key,
          value,
        };
      })) ||
    []
  );
};

const reducerToObject = (array) => {
  return array.reduce(
    (acc, curr) => ({ ...acc, [curr.field]: curr.direction }),
    {},
  );
};

const normalizeObjectToString = (object: Object) => {
  return Object.keys(object)
    .map((key) => [key, object[key]].join('='))
    .join('&');
};

const normalizeQuery = (
  oldQuery: Object,
  newState?: boolean,
  keyLabel?: string,
) => {
  const newQuery = keyLabel ? { ...oldQuery, [keyLabel]: newState } : oldQuery;
  return normalizeObjectToString(newQuery);
};

const getEndPoint = (endpoint) => {
  if (typeof window !== 'undefined') {
    if (endpoint) {
      sessionStorage.setItem('endpoint', endpoint);
      return sessionStorage.getItem('endpoint');
    }
    return sessionStorage.getItem('endpoint');
  }
  return null;
};

const getConnection = async (url) => {
  const newUrl = new URL(url);
  const result = {};

  if (typeof window !== 'undefined') {
    if (
      window.navigator.userAgent.indexOf('safari') &&
      newUrl.protocol === 'http'
    ) {
      result.error = 'safari';
    } else {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variables: {},
            query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
          }),
        });
        result.connection = response;
      } catch (error) {
        result.error = 'connection failed';
      }
    }
  }
  return result;
};

const getContent = (content) => {
  const span = document.createElement('span');
  span.innerHTML = content;
  return span.textContent || span.innerText;
};

export default getContent;

export {
  useFormatPrice,
  getInterfaceLabel,
  classNames,
  normalizeCurrencyISOCode,
  normalizeCountryISOCode,
  normalizeLanguageISOCode,
  getSortKeys,
  reducerToObject,
  normalizeObjectToString,
  normalizeQuery,
  getContent,
  getEndPoint,
  getConnection as getTestConnection,
};
