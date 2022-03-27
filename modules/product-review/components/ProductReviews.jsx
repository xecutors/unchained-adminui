import { EmojiSadIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';
/* import useProductReviewsByProductId from '../hooks/useProductReviewsByProductId'; */
import NoData from '../../common/components/NoData';
import ProductReviewsItem from './ProductReviewsItem';
import ProductReviewsReport from './ProductReviewsReport';

// TODO: remove mock data
const productReviews = [
  {
    _id: 'bdaa8bd9-cebc-4f52-9f39-8c7c8aaf8e3a',
    created: 1646142170000,
    deleted: null,
    updated: 1625505365000,
    author: {
      _id: '358a5be9-2f6d-46d6-a44b-2e9ecc0e9f40',
      username: 'fsutter0',
      isGuest: true,
      avatar: {
        _id: '8c80bae8-8a09-4b01-903e-fc515d6af171',
        url: 'https://robohash.org/idplaceatlibero.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'e70de092-ebe7-4ca1-892a-3d7be7923fcb',
      texts: {
        _id: 'd1df41e4-ae75-4feb-8297-4dd7a920f743',
        title: 'Tamandua, southern',
        subtitle: 'Tamandua tetradactyla',
      },
      media: {
        _id: 'be31abb4-aa5b-44e0-a69b-515c69af062e',
        file: {
          _id: 'a984b713-7457-465b-bbea-9cb3e9b02fe2',
          url: 'http://dummyimage.com/115x100.png/cc0000/ffffff',
        },
      },
    },
    rating: 1,
    review:
      'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    title: 'nisl duis bibendum',
    upVote: 1,
    downVote: 1,
    voteReport: 1,
  },
  {
    _id: '55d73218-57ee-4e50-a02c-8df95057dd11',
    created: 1645613095000,
    deleted: 1623016422000,
    updated: 1645352333000,
    author: {
      _id: '261918cd-98f5-4f5b-9288-ba930bca4193',
      username: 'eandraud1',
      isGuest: false,
      avatar: {
        _id: 'ccd76830-1313-46cb-bb35-d83d0b12173c',
        url: 'https://robohash.org/omnistemporibusofficiis.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '4f5e1729-257f-4eb9-961e-9d7084e3b39d',
      texts: {
        _id: '2865474c-b0eb-46a8-954d-6476e9e016eb',
        title: 'Gecko, ring-tailed',
        subtitle: 'Cyrtodactylus louisiadensis',
      },
      media: {
        _id: '85cd490b-4176-4cee-8b86-1f08c544a8dd',
        file: {
          _id: '8e75a8cb-b457-4abc-b4fb-91d7620cb568',
          url: 'http://dummyimage.com/111x100.png/ff4444/ffffff',
        },
      },
    },
    rating: 2,
    review:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.',
    title: 'convallis eget eleifend luctus ultricies',
    upVote: 2,
    downVote: 2,
    voteReport: 2,
  },
  {
    _id: '2a0c9e3a-c150-4593-807c-f668e07a1c89',
    created: 1638304671000,
    deleted: null,
    updated: 1635386096000,
    author: {
      _id: 'e3ce8141-5973-4c31-b9ff-e1ae090877ba',
      username: 'jespinola2',
      isGuest: true,
      avatar: {
        _id: '444387b7-b3fd-4a3e-b334-ae47c2545252',
        url: 'https://robohash.org/molestiaesimiliquenesciunt.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '183a4baf-3dae-4911-a75d-5b622a32800d',
      texts: {
        _id: 'f252c3d7-e490-4060-a6e3-09a8c0764f3f',
        title: 'Komodo dragon',
        subtitle: 'Varanus komodensis',
      },
      media: {
        _id: '04f4658e-3b46-484c-8634-92ddd56276bd',
        file: {
          _id: 'bd69cd9d-4bc9-4f7c-9fdd-b48b76651635',
          url: 'http://dummyimage.com/198x100.png/5fa2dd/ffffff',
        },
      },
    },
    rating: 3,
    review:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    title: 'dui vel nisl duis',
    upVote: 3,
    downVote: 3,
    voteReport: 3,
  },
  {
    _id: 'adbf27c1-3eee-489a-9e1b-48ac565d212c',
    created: 1641160743000,
    deleted: 1625457892000,
    updated: 1616379035000,
    author: {
      _id: '4c8e836c-396c-42a9-b903-3805a4215d26',
      username: 'umiddler3',
      isGuest: false,
      avatar: {
        _id: 'ae90cbb9-45d5-431a-a247-b1fcbf791cd8',
        url: 'https://robohash.org/repellendusdolorbeatae.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'eb325e42-ded5-43bb-ba79-4946445941f9',
      texts: {
        _id: 'fd243225-c4b8-4e81-bfde-45b7525f5361',
        title: 'Viper, egyptian',
        subtitle: 'Naja haje',
      },
      media: {
        _id: 'f2741113-8397-4214-bdb1-d8ca22c76184',
        file: {
          _id: 'cf66c4f4-6bed-4fa7-b3e2-2f1052f29a1b',
          url: 'http://dummyimage.com/144x100.png/cc0000/ffffff',
        },
      },
    },
    rating: 4,
    review:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    title: 'bibendum morbi non quam nec',
    upVote: 4,
    downVote: 4,
    voteReport: 4,
  },
  {
    _id: '382fcb95-8e5b-46d4-8304-3548a6f62422',
    created: 1627911131000,
    deleted: null,
    updated: 1642629986000,
    author: {
      _id: '047f53b9-1df3-43ae-9681-7c26c0f36378',
      username: 'bdukelow4',
      isGuest: false,
      avatar: {
        _id: 'd26d3e32-1288-467a-a841-70f01c7d1832',
        url: 'https://robohash.org/veletut.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '3178dbf9-6d53-4082-ab06-a91c4a282998',
      texts: {
        _id: 'e13f9d2a-90de-4597-9f33-59bdd57b7525',
        title: 'Boat-billed heron',
        subtitle: 'Cochlearius cochlearius',
      },
      media: {
        _id: '908a6745-50e9-4ce9-acd7-ad5cb71142e7',
        file: {
          _id: '2ac82bee-f0c9-4ee9-8124-06434c857457',
          url: 'http://dummyimage.com/127x100.png/dddddd/000000',
        },
      },
    },
    rating: 5,
    review:
      'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    title: 'odio elementum eu interdum',
    upVote: 5,
    downVote: 5,
    voteReport: 5,
  },
  {
    _id: 'd2f5b8e7-a74f-40ad-aaa0-d8a13f46eefa',
    created: 1639030184000,
    deleted: 1631910286000,
    updated: 1641618257000,
    author: {
      _id: 'a9a25852-c448-4dc7-ac2b-41c45d67d596',
      username: 'dheardman5',
      isGuest: true,
      avatar: {
        _id: '510eb3ee-2172-42f6-ae0b-c3d4be575bad',
        url: 'https://robohash.org/estsinttempore.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'd67f9afb-701a-4a95-9e0b-a681b1585e33',
      texts: {
        _id: 'afd0b88c-603c-4c6e-ae66-cfe162615af1',
        title: 'Lesser masked weaver',
        subtitle: 'Ploceus intermedius',
      },
      media: {
        _id: 'f0caef15-0f55-422c-91a3-03082b17933f',
        file: {
          _id: '85da3f73-8bb8-43ef-92db-7d2de329a4ec',
          url: 'http://dummyimage.com/193x100.png/cc0000/ffffff',
        },
      },
    },
    rating: 6,
    review:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.',
    title: 'venenatis tristique fusce congue',
    upVote: 6,
    downVote: 6,
    voteReport: 6,
  },
  {
    _id: 'b078c575-6b56-451d-a67d-9ec6938704f9',
    created: 1629503283000,
    deleted: 1625201834000,
    updated: 1616653690000,
    author: {
      _id: '516f9f41-37e6-4dbb-9011-b44dfac74ffd',
      username: 'cmougel6',
      isGuest: false,
      avatar: {
        _id: 'ca98f4b8-3084-4f7d-9ceb-ea84ce844f6b',
        url: 'https://robohash.org/eteumut.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '39c009dc-b17c-4233-99e1-ab69b6b5bd30',
      texts: {
        _id: 'b437b43e-6196-4b57-933c-5d3854e0f24e',
        title: 'Blue wildebeest',
        subtitle: 'Connochaetus taurinus',
      },
      media: {
        _id: 'ed27236a-b703-48b7-a9b4-6dced9485f5e',
        file: {
          _id: 'b9f37f04-aa49-48f7-89c0-c78568c9a4c3',
          url: 'http://dummyimage.com/183x100.png/ff4444/ffffff',
        },
      },
    },
    rating: 7,
    review:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
    title: 'pellentesque ultrices phasellus id',
    upVote: 7,
    downVote: 7,
    voteReport: 7,
  },
  {
    _id: 'c4c43e61-93a3-4837-8db9-740bf5dbf085',
    created: 1647248423000,
    deleted: 1643435915000,
    updated: 1632064411000,
    author: {
      _id: 'ccaa24fa-1e92-435c-8411-157ffbcce01b',
      username: 'spreator7',
      isGuest: true,
      avatar: {
        _id: '75b0300e-de52-4b66-ae3c-bfbb039b76a0',
        url: 'https://robohash.org/utvellaborum.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '2936b173-ba72-43ac-9c95-fe0a18c95ad0',
      texts: {
        _id: '0d0cf5a0-2f10-4ca3-aa71-63eca6b6c72a',
        title: 'Oryx, fringe-eared',
        subtitle: 'Oryx gazella callotis',
      },
      media: {
        _id: '471fa47d-a55d-4148-a782-c064ca3b314c',
        file: {
          _id: '51f320da-fdd0-4c13-9af4-76d84540c15d',
          url: 'http://dummyimage.com/221x100.png/dddddd/000000',
        },
      },
    },
    rating: 8,
    review:
      'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
    title: 'congue vivamus metus arcu',
    upVote: 8,
    downVote: 8,
    voteReport: 8,
  },
  {
    _id: '1b870eb2-5952-4913-bacf-067c47a29e86',
    created: 1635265229000,
    deleted: 1634666360000,
    updated: 1620386717000,
    author: {
      _id: '67d87632-33b3-446f-8f22-a8a528605de4',
      username: 'cabramamovh8',
      isGuest: true,
      avatar: {
        _id: '128aa95f-fed1-41f3-98e2-eb321b18c7be',
        url: 'https://robohash.org/nostrumametsunt.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'dd93c4f5-38fd-411d-acf8-d408a1d176b1',
      texts: {
        _id: '820fa945-46ca-4b7b-a5eb-2eb7960478f5',
        title: 'Painted stork',
        subtitle: 'Mycteria leucocephala',
      },
      media: {
        _id: 'e85a3bb2-2a8a-406f-93e4-b0c7df9d4ec9',
        file: {
          _id: '7dbab247-f7b6-485c-be6b-ea49bed20ed9',
          url: 'http://dummyimage.com/200x100.png/ff4444/ffffff',
        },
      },
    },
    rating: 9,
    review:
      'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.',
    title: 'ac diam cras pellentesque volutpat',
    upVote: 9,
    downVote: 9,
    voteReport: 9,
  },
  {
    _id: 'c33915ea-030a-4fe1-8962-bff3dc010977',
    created: 1632648992000,
    deleted: 1623663996000,
    updated: 1634982273000,
    author: {
      _id: '0170c018-af33-40ec-8852-9407a847cec4',
      username: 'csurpliss9',
      isGuest: true,
      avatar: {
        _id: '88e58a19-6686-48e5-99fa-aa05eebadac1',
        url: 'https://robohash.org/beataetemporibusaccusantium.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'f4318b39-01b5-4614-993a-05208c1d9c40',
      texts: {
        _id: 'ba8be31b-fca2-4731-8b66-f98484cca443',
        title: 'Hanuman langur',
        subtitle: 'Semnopithecus entellus',
      },
      media: {
        _id: '32fc1298-6829-46b0-8f5c-b7c7f2bf71ca',
        file: {
          _id: '711ee10e-4217-4991-b0b7-c9a51af48ab7',
          url: 'http://dummyimage.com/172x100.png/dddddd/000000',
        },
      },
    },
    rating: 10,
    review:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.',
    title: 'vitae ipsum aliquam non mauris',
    upVote: 10,
    downVote: 10,
    voteReport: 10,
  },
];

const ProductReviews = (/* {  productId } */) => {
  // TODO: Uncomment product review data
  //   const { productReviews } = useProductReviewsByProductId({
  //     productId,
  //   });
  const { formatMessage } = useIntl();

  return (
    <div className="mt-5 sm:max-w-full">
      {productReviews?.length ? (
        <div className="rounded bg-white shadow">
          <div className="mx-auto p-4 sm:p-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:p-8">
            <ProductReviewsReport productReviews={productReviews} />

            <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <h3 className="sr-only">
                {formatMessage({
                  id: 'recent_reviews',
                  defaultMessage: 'Recent reviews',
                })}
              </h3>

              <div className="flow-root">
                <div className="-my-3">
                  {productReviews.map((review) => (
                    <ProductReviewsItem key={review._id} review={review} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoData message="Reviews" Icon={<EmojiSadIcon />} />
      )}
    </div>
  );
};

export default ProductReviews;
