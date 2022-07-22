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
          subtitle: 'Snacks',
          description: 'Snacks',
          __typename: 'AssortmentTexts',
        },
        isBase: true,
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
        _id: 'not-active',
        isActive: false,
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
        isBase: true,
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
        _id: 'not-base',
        isActive: true,
        created: '2022-04-20T14:47:53.670Z',
        updated: '2022-07-19T14:26:50.221Z',
        sequence: 17,
        texts: {
          _id: '7f04569c0eb84dd41ddd812a',
          slug: 'Sussgetranke',
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
        _id: 'not-root',
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
        isBase: true,
        isRoot: false,
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
        subtitle: 'Snacks',
        description: 'Snacks',
        __typename: 'AssortmentTexts',
      },
    ],
  },
};

export const AssortmentPathsResponse = {
  data: {
    assortments: [
      {
        _id: 'e38361a29cf8e3a6036c837a',
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
      _id: 'e38361a29cf8e3a6036c837a',
      __typename: 'Assortment',
    },
  },
};

export const SingleAssortmentResponse = {
  data: {
    assortment: {
      _id: 'e38361a29cf8e3a6036c837a',
      isActive: true,
      created: '2022-03-22T13:47:05.168Z',
      updated: '2022-07-19T14:26:46.565Z',
      sequence: 12,
      texts: {
        _id: '8f7dcfdeb42f704b56248d1e',
        slug: 'snacks',
        title: 'Snacks',
        subtitle: 'Snacks',
        description: 'Snacks',
        __typename: 'AssortmentTexts',
      },
      isBase: true,
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
  },
};

export const SetBaseAssortmentResponse = {
  data: {
    setBaseAssortment: {
      _id: 'e38361a29cf8e3a6036c837a',
      __typename: 'Assortment',
    },
  },
};

export const UpdateAssortmentTextsResponse = {
  data: {
    updateAssortmentTexts: [
      {
        _id: 'e38361a29cf8e3a6036c837a',
        __typename: 'AssortmentTexts',
      },
    ],
  },
};

export const AssortmentLinksResponse = {
  data: {
    assortment: {
      _id: 'e38361a29cf8e3a6036c837a',
      linkedAssortments: [
        {
          _id: '7336cc61081c8b0e770dca64',
          parent: {
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
          child: {
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
          __typename: 'AssortmentLink',
        },
        {
          _id: '732cda0142e9f3def79159e0',
          parent: {
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
          child: {
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
          __typename: 'AssortmentLink',
        },
        {
          _id: '9b4e142553dc5b60465e565b',
          parent: {
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
          child: {
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
          __typename: 'AssortmentLink',
        },
      ],
      __typename: 'Assortment',
    },
  },
};

export const SearchAssortmentsResponse = {
  data: {
    searchAssortments: {
      assortments: [
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
      ],
      __typename: 'AssortmentSearchResult',
    },
  },
};

export const AddAssortmentLinkResponse = {
  data: {
    addAssortmentLink: {
      _id: '9b4e142553dc5b60465e565b',
      __typename: 'AssortmentLink',
    },
  },
};

export const RemoveAssortmentLinkResponse = {
  data: {
    removeAssortmentLink: {
      _id: '04b3a331f450f5ba31d1f5ea',
      __typename: 'AssortmentLink',
    },
  },
};

export const AssortmentMediaResponse = {
  data: {
    assortment: {
      _id: 'snacks',
      media: [
        {
          _id: 'a057db39dcd83bb5795ef38f',
          tags: [],
          texts: null,
          file: {
            _id: '26iqNJ2HWF5bI6Tpz5i7JW-07_snacks.jpg',
            url: 'https://orderly.xn--nd-fka.live/gridfs/assortment-media/26iqNJ2HWF5bI6Tpz5i7JW-07_snacks.jpg',
            name: '07_snacks.jpg',
            size: 89583,
            type: 'image/jpeg',
            __typename: 'Media',
          },
          sortKey: 1,
          __typename: 'AssortmentMedia',
        },
      ],
      __typename: 'Assortment',
    },
  },
};

export const TranslatedAssortmentMediaTextsResponse = {
  data: {
    translatedAssortmentMediaTexts: [
      {
        _id: 'f4f14c69de872a515f48dcc7',
        locale: 'en',
        title: 'moniter',
        subtitle: 'moniter',
        __typename: 'AssortmentMediaTexts',
      },
      {
        _id: '5eac9ac1a125b74ce7816b3b',
        locale: 'de',
        title: 'moniter',
        subtitle: 'moniter',
        __typename: 'AssortmentMediaTexts',
      },
    ],
  },
};

export const RemoveAssortmentMediaResponse = {
  data: {
    removeAssortmentMedia: {
      _id: 'f4f14c69de872a515f48dcc7',
      __typename: 'AssortmentMedia',
    },
  },
};

export const UpdateAssortmentMediaTextsResponse = {
  data: {
    updateAssortmentMediaTexts: [
      {
        _id: '5eac9ac1a125b74ce7816b3b',
        __typename: 'AssortmentMediaTexts',
      },
    ],
  },
};

export const assortmentRequestVariables = {
  forceLocale: 'en',
  includeInactive: false,
  includeLeaves: false,
  limit: 50,
  offset: 0,
  queryString: '',
  slugs: null,
  sort: [
    {
      key: 'sequence',
      value: 'ASC',
    },
  ],
  tags: null,
};

export const AssortmentOperation = {
  GetAssortmentList: 'Assortments',
  GetSingleAssortment: 'Assortment',
  GetAssortmentPaths: 'AssortmentPaths',
  GetTranslatedTexts: 'TranslatedAssortmentTexts',
  CreateAssortment: 'CreateAssortment',
  UpdateAssortment: 'UpdateAssortment',
  SetBaseAssortment: 'SetBaseAssortment',
  UpdateAssortmentTexts: 'updateAssortmentTexts',
  GetAssortmentLinks: 'AssortmentLinks',
  SearchAssortments: 'SearchAssortments',
  AddAssortmentLink: 'AddAssortmentLink',
  RemoveAssortmentLink: 'RemoveAssortmentLink',
  AssortmentMedia: 'AssortmentMedia',
  GetMediaTexts: 'TranslatedAssortmentMediaTexts',
  RemoveMedia: 'RemoveAssortmentMedia',
  UpdateMediaTexts: 'UpdateAssortmentMediaTexts',
};
