export const CurrencyListResponse = {
  data: {
    currencies: [
      {
        _id: '54113f9f8d80b4edb0dc3447',
        isoCode: 'CHF',
        isActive: true,
        contractAddress: null,
        __typename: 'Currency',
      },
      {
        _id: '20b7b2a547f12df226aa63fc',
        isoCode: 'ETB',
        isActive: true,
        contractAddress: null,
        __typename: 'Currency',
      },
    ],
    currenciesCount: 2,
  },
};

export const SingleCurrencyResponse = {
  data: {
    currency: {
      _id: '20b7b2a547f12df226aa63fc',
      isoCode: 'ETB',
      isActive: true,
      contractAddress: null,
      __typename: 'Currency',
    },
  },
};

export const CreateCurrencyResponse = {
  data: {
    currency: {
      _id: '20b7b2a547f12df226aa63fc',
      isoCode: 'ETB',
      isActive: true,
      contractAddress: null,
      __typename: 'Currency',
    },
  },
};

export const CurrencyOperations = {
  GetCurrencyList: 'Currencies',
  GetSingleCurrency: 'Currency',
  CreateCurrency: 'CreateCurrency',
};
