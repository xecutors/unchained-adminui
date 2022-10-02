import { useIntl } from 'react-intl';

const { NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH } = process.env;
const useFormatPrice = () => {
  const { locale } = useIntl();

  const formatPrice = (price: { currency: string; amount: number }) => {
    if (!price?.currency || !price?.amount) return '0';
    const { amount, currency } = price || {};
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  return { formatPrice };
};

const getInterfaceLabel = (obj: { label?: string; version?: string }) => {
  return obj?.label && obj?.version ? `${obj.label} ${obj.version}` : '';
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
        const [key = null, value = null] = (field || '').split('_');
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

const getEndPoint = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('connection') || '{}');
  }
  return null;
};

const isSafariBrowser = (userAgent: string): boolean =>
  userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') <= -1;

const getTestConnection = async (url) => {
  const result = { error: '', connection: null };
  try {
    if (typeof window !== 'undefined') {
      const newUrl = new URL(url);
      if (
        isSafariBrowser(window.navigator.userAgent) &&
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
              query: `{ __typename  }
    `,
            }),
          });
          result.connection = response;
        } catch (e: any) {
          result.error = e.message;
          result.connection = { ok: false };
        }
      }
    }
  } catch (e: any) {
    result.error = e.message;
  }
  return result;
};

export const setEndpoint = async (endpoint) => {
  let currentEndpoint;
  if (!NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH) {
    currentEndpoint = process.env.GRAPHQL_ENDPOINT;
  } else {
    currentEndpoint =
      endpoint || getEndPoint()?.endpoint || 'http://localhost:4010/graphql';
  }

  const result = await getTestConnection(currentEndpoint);

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(
      'connection',
      JSON.stringify({
        endpoint: currentEndpoint,
        status: result?.connection?.ok,
        error: result?.error,
      }),
    );
    return getEndPoint();
  }
  return null;
};

const getContent = (content) => {
  const span = document.createElement('span');
  span.innerHTML = content;
  return span.textContent || span.innerText;
};

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
  getTestConnection,
};
