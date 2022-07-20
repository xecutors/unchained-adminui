export const AssortmentListResponse = {
  data: {
    assortments: [
      {
        _id: 'e38361a29cf8e3a6036c837a',
        isActive: true,
        created: '2022-03-22T13:47:05.168Z',
        updated: '2022-07-19T14:26:46.565Z',
        sequence: 12,
        texts: {
          _id: '8f7dcfdeb42f704b56248d1e',
          slug: 'snacks',
          title: 'Snacks',
          subtitle: null,
          description: null,
          __typename: 'AssortmentTexts',
        },
        isBase: false,
        isRoot: true,
        tags: [],
        childrenCount: 4,
        media: [
          {
            _id: 'a057db39dcd83bb5795ef38f',
            tags: [],
            file: {
              _id: '26iqNJ2HWF5bI6Tpz5i7JW-07_snacks.jpg',
              url: 'https://orderly.xn--nd-fka.live/gridfs/assortment-media/26iqNJ2HWF5bI6Tpz5i7JW-07_snacks.jpg',
              __typename: 'Media',
            },
            __typename: 'AssortmentMedia',
          },
        ],
        __typename: 'Assortment',
      },
      {
        _id: '1fed9af2ed7fd71548955f6d',
        isActive: true,
        created: '2022-03-29T20:50:58.529Z',
        updated: '2022-07-19T14:26:47.723Z',
        sequence: 13,
        texts: {
          _id: '68b451c9e4b4d85a4e99de76',
          slug: 'Hamburger',
          title: 'Hamburger',
          subtitle: null,
          description: null,
          __typename: 'AssortmentTexts',
        },
        isBase: false,
        isRoot: true,
        tags: [],
        childrenCount: 4,
        media: [
          {
            _id: 'cca5d793040a97ea65652712',
            tags: [],
            file: {
              _id: '3QZoWf3lYGhboM7zGZO8ua-06_burger.jpg',
              url: 'https://orderly.xn--nd-fka.live/gridfs/assortment-media/3QZoWf3lYGhboM7zGZO8ua-06_burger.jpg',
              __typename: 'Media',
            },
            __typename: 'AssortmentMedia',
          },
        ],
        __typename: 'Assortment',
      },
      {
        _id: 'e66542656a6887e64d0d7cb9',
        isActive: true,
        created: '2022-04-20T14:47:53.670Z',
        updated: '2022-07-19T14:26:50.221Z',
        sequence: 17,
        texts: {
          _id: '7f04569c0eb84dd41ddd812a',
          slug: 'Süssgetränke',
          title: 'Süssgetränke',
          subtitle: null,
          description: null,
          __typename: 'AssortmentTexts',
        },
        isBase: false,
        isRoot: true,
        tags: [],
        childrenCount: 4,
        media: [
          {
            _id: '5595435cf99a9e936edce88c',
            tags: [],
            file: {
              _id: '5atbwLOqPVJZatoh45CFAk-02_popsoda.jpg',
              url: 'https://orderly.xn--nd-fka.live/gridfs/assortment-media/5atbwLOqPVJZatoh45CFAk-02_popsoda.jpg',
              __typename: 'Media',
            },
            __typename: 'AssortmentMedia',
          },
        ],
        __typename: 'Assortment',
      },
      {
        _id: '0de23bbadc6a2d8da8a73a98',
        isActive: true,
        created: '2022-06-22T07:46:19.990Z',
        updated: '2022-07-19T14:26:22.386Z',
        sequence: 21,
        texts: {
          _id: 'e98aaa56ab14e5f73708ca28',
          slug: 'bier-1',
          title: 'Bier',
          subtitle: null,
          description: null,
          __typename: 'AssortmentTexts',
        },
        isBase: false,
        isRoot: true,
        tags: [],
        childrenCount: 4,
        media: [
          {
            _id: 'd67039aa926a31d370dbdb4b',
            tags: [],
            file: {
              _id: '1MiIOTGCQoBR558YeGgx4d-01_beer.jpg',
              url: 'https://orderly.xn--nd-fka.live/gridfs/assortment-media/1MiIOTGCQoBR558YeGgx4d-01_beer.jpg',
              __typename: 'Media',
            },
            __typename: 'AssortmentMedia',
          },
        ],
        __typename: 'Assortment',
      },
    ],
    assortmentsCount: 4,
  },
};

export const SingleTranslatedAssortmentTextsResponse = {
  data: {
    translatedAssortmentTexts: [
      {
        _id: '8f7dcfdeb42f704b56248d1e',
        locale: 'en',
        slug: 'snacks',
        title: 'Snacks',
        subtitle: null,
        description: null,
        __typename: 'AssortmentTexts',
      },
    ],
  },
};

export const AssortmentPathsResponse = {
  data: {
    assortments: [
      {
        _id: 'snacks',
        texts: {
          _id: '8f7dcfdeb42f704b56248d1e',
          slug: 'snacks',
          title: 'Snacks',
          subtitle: null,
          __typename: 'AssortmentTexts',
        },
        childrenCount: 4,
        __typename: 'Assortment',
        children: [],
      },
      {
        _id: '1fed9af2ed7fd71548955f6d',
        texts: {
          _id: '68b451c9e4b4d85a4e99de76',
          slug: 'Hamburger',
          title: 'Hamburger',
          subtitle: null,
          __typename: 'AssortmentTexts',
        },
        childrenCount: 4,
        __typename: 'Assortment',
        children: [],
      },
      {
        _id: 'e66542656a6887e64d0d7cb9',
        texts: {
          _id: '7f04569c0eb84dd41ddd812a',
          slug: 'Süssgetränke',
          title: 'Süssgetränke',
          subtitle: null,
          __typename: 'AssortmentTexts',
        },
        childrenCount: 4,
        __typename: 'Assortment',
        children: [],
      },
      {
        _id: '0de23bbadc6a2d8da8a73a98',
        texts: {
          _id: 'e98aaa56ab14e5f73708ca28',
          slug: 'bier-1',
          title: 'Bier',
          subtitle: null,
          __typename: 'AssortmentTexts',
        },
        childrenCount: 4,
        __typename: 'Assortment',
        children: [],
      },
    ],
  },
};

export const CreateAssortmentResponse = {
  data: {
    createAssortment: {
      _id: 'e38361a29cf8e3a6036c837a',
      texts: {
        _id: '8f7dcfdeb42f704b56248d1e',
        slug: 'snacks',
        __typename: 'AssortmentTexts',
      },
      __typename: 'Assortment',
    },
  },
};

export const UpdateAssortmentResponse = {
  data: {
    updateAssortment: {
      _id: 'snacks',
      __typename: 'Assortment',
    },
  },
};

export const SingleAssortmentResponse = {
  data: {
    assortment: {
      _id: 'e38361a29cf8e3a6036c837a',
      isActive: true,
      created: '2022-07-20T13:11:52.769Z',
      updated: '2022-07-20T13:11:52.774Z',
      sequence: 18,
      isBase: false,
      isRoot: true,
      tags: [],
      texts: {
        _id: '8f7dcfdeb42f704b56248d1e',
        slug: 'snacks',
        title: 'Snacks',
        subtitle: null,
        description: null,
        __typename: 'AssortmentTexts',
      },
      childrenCount: 6,
      media: [],
      __typename: 'Assortment',
    },
  },
};

export const AssortmentOperation = {
  GetAssortmentList: 'Assortments',
  GetSingleAssortment: 'Assortment',
  GetAssortmentPaths: 'AssortmentPaths',
  GetTranslatedAssortmentTexts: 'TranslatedAssortmentTexts',
  CreateAssortment: 'CreateAssortment',
  UpdateAssortment: 'UpdateAssortment',
};
