import EnrollmentList from '../../enrollment/components/EnrollmentList';
import useUserEnrollments from '../../enrollment/hooks/useUserEnrollments';

const UserEnrollments = ({ _id: userId }) => {
  const { enrollments } = useUserEnrollments({ userId });

  const enrollmentss = [
    {
      _id: '38d483d7-200f-42a9-9a1c-4139b8fe12aa',
      created: '11/29/2021',
      expires: '10/19/2021',
      plan: {
        product: {
          texts: {
            title: 'Longan',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/133x100.png/ff4444/ffffff',
            },
          },
        },
      },
      status: 'TERMINATED',
      payment: {
        provider: {
          interface: {
            label: 'Agatha Dubock',
            version: '4.0',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Ealasaid Got',
            version: '4.8.1',
          },
        },
      },
    },
    {
      _id: 'a695a7fa-085f-48bc-8406-4340548e131c',
      created: '10/8/2021',
      expires: '2/17/2022',
      plan: {
        product: {
          texts: {
            title: 'Chef Hat 20cm',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/210x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      status: 'INITIAL',
      payment: {
        provider: {
          interface: {
            label: 'Mellisa Inott',
            version: '9.2.4',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Susie Walework',
            version: '4.66',
          },
        },
      },
    },
    {
      _id: 'b22c51bf-3868-4c51-b551-ef03241d7faa',
      created: '7/25/2021',
      expires: '6/19/2021',
      plan: {
        product: {
          texts: {
            title: 'Curry Paste - Madras',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
            },
          },
        },
      },
      status: 'PAUSED',
      payment: {
        provider: {
          interface: {
            label: 'Caroline Ivanyushkin',
            version: '9.2',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Jamaal McQuilkin',
            version: '6.8',
          },
        },
      },
    },
    {
      _id: 'f016500e-ddcd-450b-87eb-bf50c9f3929d',
      created: '7/10/2021',
      expires: '10/23/2021',
      plan: {
        product: {
          texts: {
            title: 'Snapple - Mango Maddness',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/118x100.png/ff4444/ffffff',
            },
          },
        },
      },
      status: 'ACTIVE',
      payment: {
        provider: {
          interface: {
            label: 'Myrle Worvill',
            version: '6.9',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Celeste Gravet',
            version: '0.4.8',
          },
        },
      },
    },
    {
      _id: '8a66a7d3-45fc-4391-ad21-c4a29c54b54d',
      created: '4/14/2021',
      expires: '1/18/2022',
      plan: {
        product: {
          texts: {
            title: 'Appetizer - Mushroom Tart',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/124x100.png/cc0000/ffffff',
            },
          },
        },
      },
      status: 'TERMINATED',
      payment: {
        provider: {
          interface: {
            label: 'Elke Turnell',
            version: '0.7.1',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Delores McColgan',
            version: '0.84',
          },
        },
      },
    },
    {
      _id: 'a127ce36-031f-42ce-b6db-3ea02a0efe90',
      created: '11/6/2021',
      expires: '6/26/2021',
      plan: {
        product: {
          texts: {
            title: 'Soup - Campbells Pasta Fagioli',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/195x100.png/cc0000/ffffff',
            },
          },
        },
      },
      status: 'INITIAL',
      payment: {
        provider: {
          interface: {
            label: 'Christie Antoszewski',
            version: '0.9.5',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Winne Ambrodi',
            version: '3.1',
          },
        },
      },
    },
    {
      _id: '01a9b851-c418-48c3-8b04-7ec2523a2377',
      created: '11/17/2021',
      expires: '5/10/2021',
      plan: {
        product: {
          texts: {
            title: 'Arctic Char - Fillets',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/218x100.png/ff4444/ffffff',
            },
          },
        },
      },
      status: 'INITIAL',
      payment: {
        provider: {
          interface: {
            label: 'Joanna Foley',
            version: '6.4.0',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Fancie Arnaut',
            version: '8.3.0',
          },
        },
      },
    },
    {
      _id: 'fe5213f2-f739-4091-ada5-504453d5862a',
      created: '6/4/2021',
      expires: '9/2/2021',
      plan: {
        product: {
          texts: {
            title: 'Pear - Asian',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/156x100.png/dddddd/000000',
            },
          },
        },
      },
      status: 'PAUSED',
      payment: {
        provider: {
          interface: {
            label: 'Lockwood McClaren',
            version: '5.86',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Marshal Cornil',
            version: '0.11',
          },
        },
      },
    },
    {
      _id: '474cd340-dc31-47a3-8b77-9c61838b1b4f',
      created: '3/17/2022',
      expires: '6/8/2021',
      plan: {
        product: {
          texts: {
            title: 'Salmon - Atlantic, Skin On',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/133x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      status: 'INITIAL',
      payment: {
        provider: {
          interface: {
            label: 'Natividad Astbery',
            version: '0.84',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Danika Albasiny',
            version: '0.9.2',
          },
        },
      },
    },
    {
      _id: 'cb15b029-04c8-472c-a5aa-5dbb25c1c120',
      created: '6/22/2021',
      expires: '7/20/2021',
      plan: {
        product: {
          texts: {
            title: 'Chicken - Base',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/215x100.png/ff4444/ffffff',
            },
          },
        },
      },
      status: 'ACTIVE',
      payment: {
        provider: {
          interface: {
            label: 'Lilith Charlton',
            version: '0.3.9',
          },
        },
      },
      delivery: {
        provider: {
          interface: {
            label: 'Tann Tallant',
            version: '2.0',
          },
        },
      },
    },
  ];

  return <EnrollmentList enrollments={enrollmentss} />;
};

export default UserEnrollments;
