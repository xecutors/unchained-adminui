export const LanguagesResponse = {
  data: {
    languages: [
      {
        _id: '401d3dcaffada1d7942a567c',
        isoCode: 'de',
        isActive: true,
        isBase: true,
        name: 'de (Base)',
        __typename: 'Language',
      },
    ],
    languagesCount: 1,
  },
};

export const LanguageOperations = {
  GetLanguagesList: 'Languages',
};

export default { LanguagesResponse, LanguageOperations };
