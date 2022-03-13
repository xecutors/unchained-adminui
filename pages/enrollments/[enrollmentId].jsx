import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import EnrollmentDetail from '../../modules/enrollment/components/EnrollmentDetail';
import useEnrollment from '../../modules/enrollment/hooks/useEnrollment';

//TODO remove mock data
const enrollmentss = [
  {
    _id: 'aa2b44f9-022f-4317-90dc-2f19d2ed285f',
    user: {
      username: 'Kimmy',
      avatar: {
        url: 'https://robohash.org/quamquodsed.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Domainer',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAM+SURBVBgZBcHLT1xVAMDh333MkxmYAYZOwbGGPqRaHq0gpIBGba3GR2KibjQmsHDXsHDjP2DSmBgTU7swUUk0ajemK1HapjYIoYRqi4DoUAsNjwIyw9wZ7tzHOff4fZpSCgAAgJHJ4UHgPNADZAATKAG3VKAufTb49c8AAACaUgqAkclhExgF3nwtdyaSjmWw7BpsD4R0EGxxfXNMSCGvCiHf/vLlHyoAmlKKkcnhEHCju/HJ/hdzz2E5EVw8li2NsIqwawco4RHDZtOdYHZjdk744pnv3rpS0gGA0VMNx/oHmrspSA9f1xBCpyrC2IQpuBG2nRhrpRCPJp6mO/t4h+f63wMYxbMPBoCP3zn2qjEv99mkSjUQVJwEBTeE5UB+vUxpf59IehetLk9fYxvXF2dav7k1etfoHT756bnm3hOaEWNTF6CaOCgT3N4yqDo6i+sVgmiRyKG/cWvz7ARFzKLkRENOv72yVG8CPbnaFu7YG+xEdZ4wDhMgWN32cJwqdVmFVT/OcrAHriIlIuR3XM48dgrfFe0m0BA3a1i1N9h2bZLxVva8JMViQF3GoSltsyO7sNy7RFSZ8n+7FPbiJGJJfE+kTKWUpinwXAtFDjMkGZv20WIJNpcFuqqlOVMlWR7EWvdxmMX37oNSCCE0U4qgYHlWS4ORIhntZG3HxPFDhKMRok0x7v27izOTIhOeIROdJ+JZlJ0yY1O/IEVQMoUvfl8pPGg5Es9x7eEkqfgRwkYO37FRRopwIk2tO0FbdomnjvfxSP1RbixcYXp+AqNa8XTfExd/XLopDiUymPY6pd0p0mkXU7iENEVENzAr1+hq60Tqks6DZ5GaT1/7aXTPyepfvXJ53HP9n8YXb/JsSxd1Rg3pREBdWFIbdkiGXIqVLUJagtePnwfggxe+4HBTB0BIB/Bd/91f83fm/lz5i3NtPbSmTA7EFY1GmQbdplgusrAxxYWrQwBcGB/i3vYcgKMppQB46fPnk8IXl4Uvz77XP2QisygVR9M1Fv75ltXiFKc7BjiaPUn+4R9Mzf3G2v3SJ5pSCgAAgP6Pet+QQr4vZdAeyCANAJSMatnTveoBIAqUgUvTFzc+/B+ww5qo63KzbgAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Streptopelia senegalensis',
          version: '8.3.0',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Piperia Rydb.',
          version: '3.65',
        },
      },
    },
    created: '1620733238000',
    expires: '1643653469000',
    updated: '1635234009000',
    status: 'TERMINATED',
    isExpired: true,
    enrollmentNumber: '8400126483',
    periods: {
      start: '1639018089000',
      end: '1621895282000',
      isTrial: true,
    },
    contact: {
      telNumber: '931-161-4157',
      emailAddress: 'kyorke0@soup.io',
    },
    billingAddress: '5 Lerdahl Alley',
  },
  {
    _id: '86cb51d1-325b-434d-9985-45f29fd5953a',
    user: {
      username: 'Deny',
      avatar: {
        url: 'https://robohash.org/porroundedolorum.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Flowdesk',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANDSURBVDjLZZNvUBN0GMf3ot7ldb2q63UvuuuFd93Vq/ROMYyu9C4CCwE1uqHFOD3D1SxPUFCb5OBwBwMJMf5GjT/bMBhjILjGNraxv47JcGrIakIYAxT89BtXHdqLz7vn832eF99HAkg2UjhyYIugXRAR/CVYFswKumXD+995en6j+Izgh6TQf6sJe6wP0/QoutAonYEBOgLNHDLlPJL2ZRk+Mex57okAIT0rGGkMnufeooNQ3IsnPo424kQ/5afR6+Wya5x21wgV1jPkaNPdH7fvfn5jQFND4AxTC2b8CxZ8cz6csy6aJ338OBVG5ZhE+WuA74asaH0DVFgUpF9517AeIOS3BA+jD8zo5vR0zOvpjQ/Re9tLXfAGFz0hZHoHsh4Lp216NJEqHDNa3q9NXU1Tb9+dDPhJP1WN/Xc9LXNdtN23Yo25KXf6UNpuINU5yDcaOeLXoHYeJNj0EZNdpbgupVJS+YYnGRCd+KOHxmgt5bFLYrsXS8xF4S9OpF12iqw28iePUeLYxYxJzvyEDh7cZW6iA+P5nWvJgMXwvIlTwWJkk3I0dwdpidjJaR2jYGAYZegqSruCmO8EK7e7mTErSXh+ZnV6hPH6T5HIru1P3Jwz8Y37KAVuFfXTRnJbLOR2ekivuc6F/mri3q9ZS4yQuFlAfExG4EoeEw15vFf85rLks8HcO87ZTlTeU3wbHqTEdo3MRjvZ2hAntc3c93zF2pKFxfA+lqJ7WfAr8GtSMI+peF2x+Z5EFKNbG6hEN9XA4eunOelqJbtpFHltJTM2+T9yLku3svjTexy/+m2+139Onak4GTAoOaDLTBXFeOSJ6fnCeIgjA4WUNp3Fc7VInD3MUiSP5WgO8+KSgJCLLmZiDjcn5ceCrPUi7Wnd1VVuPkZPoAZlfQY+gwJ3r4o71gwWI3uJu77Epd6BXJ1BzVAxx9vy17f/18QPLqdtEsVwl/Uepv1cCixME9R8iEnxMqPVafSVbafBfBRjqAFFqzQphwQvPfFMO6u2bUq5sMVQIn2NFUsVK9YKrKXbaDv4Ct3D1WjMJ5LianKz4MX/feO/ZGx94WHZvlcf959No+7c1rUdis0JIfwmGBBkPz3/Nw6S0St8tXZAAAAAAElFTkSuQmCC',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Zenaida galapagoensis',
          version: '1.2',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Dubautia reticulata (Sherff) D.D. Keck',
          version: '0.3.2',
        },
      },
    },
    created: '1623730672000',
    expires: '1645110002000',
    updated: '1638607377000',
    status: 'TERMINATED',
    isExpired: true,
    enrollmentNumber: '3741349887',
    periods: {
      start: '1639430367000',
      end: '1634002504000',
      isTrial: false,
    },
    contact: {
      telNumber: '102-991-6955',
      emailAddress: 'derbe1@nhs.uk',
    },
    billingAddress: '77 Charing Cross Junction',
  },
  {
    _id: '0d35f429-ac8d-4566-bd81-4ad96c72f003',
    user: {
      username: 'Ezra',
      avatar: {
        url: 'https://robohash.org/eumsimiliqueut.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Trippledex',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAChSURBVCjPpZExCgIxEEVfZI/jGWy8gFewX6w9h7C1V1iwXRsvYCN4DUEEJ3HzLbIRF4zNZsq8/+bDOPH/zZgKVABHASzdVj0vAp6A4bH60CBEp5s6iV9TZZWAjULO0rqvFekbdq7QQUQisFZKG08Mw+prMwL2JUOkJwIr2Sd/cSMgGdqyIZVcDIbUJBDqR+6QgFPJAGcA5spZz32A3eRrvgFwMGHf7+AlJwAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Funambulus pennati',
          version: '0.9.7',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Papaver dubium L.',
          version: '7.6',
        },
      },
    },
    created: '1618270774000',
    expires: '1620125766000',
    updated: '1644226069000',
    status: 'TERMINATED',
    isExpired: true,
    enrollmentNumber: '4628447470',
    periods: {
      start: '1640964806000',
      end: '1644032739000',
      isTrial: true,
    },
    contact: {
      telNumber: '855-864-0903',
      emailAddress: 'esames2@blogger.com',
    },
    billingAddress: '0 Laurel Park',
  },
  {
    _id: 'd348b48d-cb88-46fb-9780-b84e072e7fa3',
    user: {
      username: 'Garrek',
      avatar: {
        url: 'https://robohash.org/autemsuntquod.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Regrant',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL2SURBVDjLVdNNaBx1GMfx78zO7Lu765qQWIPteqiH+IKCjTmkClIVPHi0pVDSXBT0sGhLUOvJl0OL4AuVBC+CLXpoD1KqweBBWFFajOChSTU20q2h6e66nX2Znfm/ejCJ8Qff6+fy8DjWWgCmz9f3AR/cV0pPhtIQSoM0hoEyAdAFmoAG2kAL+Bz41mNzRqmJh0fzk689MczO9YUphsIU25EeExK6sebPZo9v/ugfAKo7gZFC0gGgflvjOw6eAwkPUr7LvSmXhOviJ+CRsQy7irnyp5fW33e3AC1loWQilIGucAgkdDoRQQRBBK0B3OppAF4/e53JSo4HhvzhbSAfBiP7v5pHHZ2mH2kqJ2cZ+uxjwqBPNzb0IstAgAEc3eGna22WrgfrLoA4Ol2eXfrimZw3QDoeYWyRePh0GZ0/RdTu0o8NfWnAwkYn5sPF1Y4WYtoVR44cNGH01+iwXzT1FvVj76CApUNVxI2ApNNn77EZUrXviZSDsaB9jRKicv7lxxZdM4jm433jabO0Asdn6eTLOC7oQpnfX3gFfrmKnBjnnrmTuFJiLag4RotYA7gmHLyY+LoWmcounBNvYm81cLEkgyaVuXdRe+7GuVijPlPFSfpIren1Q6WE6AC42YsXvjy9e//EtdXbyHyKyqszYOH+946TKHiEbcOVuXMEUwfI+NDqxahYbCy89awFcAEWhvaKj6YO48WQaDTAcXGbDcIA1k6cQuaKYCHruTTaA7SI17eu501Vzw4Bbz84OU6veobvlgW5rubHTy6Q9i2+B8nEvxWysFoPUUJsbANaiKeA535eXqM98OjFFqktsXQQyqC0wVhLuVjkpadHudkK0UI0/gOkfPT5Jx/KvHH48f/9gLYgtUUowMLphXWyPnR7IVrK1k5g7WYz4MziMqV8hlIhTSmXophLcUc2SSrpkvJcDk2NkPKg8XcXLeWNbcAoda52eWWsdnllN3DXZnduVkwnfT+d9inkMpQKWX69Wv8N+GEL+AdfSH+n2ppttwAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Aonyx capensis',
          version: '5.4.2',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Philodendron marginatum Urb.',
          version: '0.54',
        },
      },
    },
    created: '1630040501000',
    expires: '1618221765000',
    updated: '1636233590000',
    status: 'PAUSED',
    isExpired: false,
    enrollmentNumber: '9606219003',
    periods: {
      start: '1632042041000',
      end: '1629220159000',
      isTrial: false,
    },
    contact: {
      telNumber: '545-840-2198',
      emailAddress: 'gizen3@discovery.com',
    },
    billingAddress: '525 Monument Junction',
  },
  {
    _id: '8bd3957e-8bbb-4925-a8d4-35fd8978d756',
    user: {
      username: 'Amara',
      avatar: {
        url: 'https://robohash.org/nonhiclaudantium.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Tin',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHVSURBVDjLhZNbi9pQFIXzJ+a1xX8hhP7Q0k47zFPHK4p3FBQVbyhe8YIVsTpJGid1SIiXRFbPPmI6jpc+7Jdz9vrW2ic7Qq/XQ7fbRbvdRqvVQrPZRKPRQL1eR61WuwMg3Cqh0+lgv9+f1Xw+55ByuXwTIpAzCWazGXeeTqcOhM5YChQKhasQgSJTM7nRQbVareu6Dsuy+DkBS6USstnsRYhArsdGJt6yyLP1eo2tuoFRWfG7yWSCfD6PTCZzBhHI+RjZtm2Q2HrZQvsm4eWzBKN8gIzHY0qBZDJ5AhHYjKaqqrxpt9txZ+1ewurHb6x8KrTvsgMZjUaUAtFo1IEIlUrlE5vRVBSFN5kjnTuvPCpeg0u8voMMh0NKgVAoxCGcUiwWRTajKcvyAfLTwPLrO8i9DL14gPT7fUqBQCBw58ySy+VENqMpSdI5xL/En0cF8sMv7K1Ding8Dp/P9/HkRdl8YjqdNheLxT/Il2doDzLUp2dsjM1bscsZ4W2lUikxkUiYtIkcMjagPSmwN7Yj9nq9LucRLy1HLBYTI5GISZt4/MQkZucn4qsAqnA47GYvbdKCDQaDi+KbAKpgMOj2+/0miT0ej+viKv/vd2Wubib+cO3+L9t+PiarnEW1AAAAAElFTkSuQmCC',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Dicrostonyx groenlandicus',
          version: '8.51',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Stenocereus (A. Berger) Riccob.',
          version: '0.95',
        },
      },
    },
    created: '1632528939000',
    expires: '1636596467000',
    updated: '1641676639000',
    status: 'INITIAL',
    isExpired: true,
    enrollmentNumber: '7139875820',
    periods: {
      start: '1627849183000',
      end: '1624483058000',
      isTrial: false,
    },
    contact: {
      telNumber: '101-379-6516',
      emailAddress: 'amckall4@spotify.com',
    },
    billingAddress: '0 Pennsylvania Point',
  },
  {
    _id: 'f9a0f018-424e-4792-ac3b-23592689b6e8',
    user: {
      username: 'Findlay',
      avatar: {
        url: 'https://robohash.org/voluptasexplicabovitae.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Sub-Ex',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK7SURBVDjLpVNLT1NBGD1z7+2DR2poS0uR1tBKhNBGKyaYGDSpkZ0LXZogK/fs2LlSdOFKQyILE5P+BF2pGEx4KApEbGjaRkGqtFRKX9y29+3MNeDKhMRJvpncyXfOd77z3SGGYeB/lsC2mZmZ+81mM6YoSoumaUSSJEuj0bCyU9d1YrPZZKfT+XJycnKC5Y+NjQ3RYzMej++T6enpEzzPl6PRKJgaCjAjufYat6/3Qf72DI/f9sPhHUA6nRkvlUpPKNhBg0kf5kOhUCIcDju9Xi+y2Szy+Tz29vbQHejH3MovpGrncXZoBIQQ5HK5GxzH2ex2OwRBINVq9bJAq552OBxIJBLweDyIRCKgrYC2gs7OTiSTSczPz8PlciEWi2F3dxflctnMSaVSZwSWWCgU4Ha7obQF8Gi2AVEl0Kk+G7HgSk8QzlqNyk+DqWTATCYDn89ntsqxTRRF+P1+vPgiQzI42C00rBw0zoJ3P9pMYLFYNMGyLIMafKTSJKBum3GgcbQ3ngYHC/cnVGIFnRDaY2m8qT9EQ66b3yzfVMBYDlnZMgwd7NcgHEDx4DmCep2CVBk97gGstj+nJOIRgXCogDoKq9ECVbeDoxOy2+6A5xVAV7Goqjjp7MNA1zBqTRGfR95D+ur7S8Cqr6+vI9odwVrFA0mgY9JlXBsch0YVabpGTTWwU8ki0nMJB3IDK1Ic+ko/BFa9UqmY43GVShju7TXN+UglM/D3YgYKVaHqChRNQVWq4Zx/BAdKHR9GFyDQmU5sbW09oEpsHR0dZHl5mTCC7ltNqJoKryNAwZpJlqtsw9nehdXsAhY3liAsnVog/3pMN58G9SY1V6atMAND7kFyMTiKT9uLmE2/yssqru5MGRvkuK8xfI8TLwRirXPp2Z+yboJT7P7YBMG7RNR0vrWha8HClLF5eP8bbVCla6rK198AAAAASUVORK5CYII=',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Trichosurus vulpecula',
          version: '4.2.9',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Prunus lusitanica L.',
          version: '0.3.8',
        },
      },
    },
    created: '1639272967000',
    expires: '1644448979000',
    updated: '1635798612000',
    status: 'ACTIVE',
    isExpired: true,
    enrollmentNumber: '3295757585',
    periods: {
      start: '1623159668000',
      end: '1644664643000',
      isTrial: true,
    },
    contact: {
      telNumber: '546-753-2110',
      emailAddress: 'fcoatts5@paginegialle.it',
    },
    billingAddress: '58 Buena Vista Junction',
  },
  {
    _id: '0526b125-3d17-4b6a-b316-f27c63d3939b',
    user: {
      username: 'Robin',
      avatar: {
        url: 'https://robohash.org/molestiaeconsecteturest.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Bitwolf',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVDjLY/j//z8DJZhhcBoQMuUBJxCzkWxAeXl5PYiOm/toTtDEB0U5OTkCqamp/XFxcfvDwsISYOpsbGwUjI2N12tpaQUgazYoKSn5D8QJgRPuqdevf/nKp+MOf3R0tEJISMh/Ly+vBGTL1NXVC1BcADQgobi4eH5ubu59ED9o4r05Hs23WkBsd3f3+XZ2dudhalVUVBxkZGQUUAwoLCx0ADpZAejk/0AnB7g13JTOX/z4lW3pVWmgkw0sLCz+A53sAFIrKSkZgBIG+fn5AZmZmQIgNtDJ+4ODg/eD2Pbl19odK65Ogzp5v7y8/HxxcXEFAQEBBxQD0tPTAxISEhwiIiIcAgICEry9vf8DnexgnnNJKHbGvVcGyedVgE5OUFZW/s/HxzcfJRaATnYAOtkBWRDo5PvAUAa7Qj/xfIV1waUVIDY3N/d9NjY2lMAEObkA6GS4nywtLRUMDAzqgU6uBzrZQTv2DKdX442r6uGnhVhYWAoYGBgEhkBSpqsBAOTifxrCztZUAAAAAElFTkSuQmCC',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Anastomus oscitans',
          version: '6.3.5',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Calystegia occidentalis (A. Gray) Brummitt ssp. occidentalis',
          version: '0.8.5',
        },
      },
    },
    created: '1640031825000',
    expires: '1626350689000',
    updated: '1635211834000',
    status: 'PAUSED',
    isExpired: true,
    enrollmentNumber: '3386657389',
    periods: {
      start: '1615518134000',
      end: '1622219212000',
      isTrial: false,
    },
    contact: {
      telNumber: '353-111-7705',
      emailAddress: 'rdunham6@is.gd',
    },
    billingAddress: '06 Forest Dale Trail',
  },
  {
    _id: '7f28438f-bb7a-413c-b302-a87c32cb641a',
    user: {
      username: 'Jordain',
      avatar: {
        url: 'https://robohash.org/quiasuscipitfacilis.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Overhold',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVDjLpZPLquJAEIbPQ+Wd8gAZnTirPIGIgiLoxo2iCxeuBJGgoggq3trLwoX3a9R4QVGxpv/mJCJzOMMwDUVCur+/qv7qfBDRx//EHx/6/b7U6/W0brerdzodgzFmtFotvdlsavV6XfpWgMMyh9l6vabz+UyPx0PE6XSixWJBtVqNVSoV+UuBT9i8Xq+EhefhcCDTNOlyuYhvEC2Xy2apVJLfBD7LZha82+1ou91SPp8nwzBos9kQqrJEdF1n2WxWsgV4v5p1wIIBOp0/KZfLCXi5XIrAGgwGlEqlNFuAm6VDGaUCtLI6HE4RPKOA4QP8QIJEIqHbAu1224BZ+/1ewMi4Wq047BDhcv2iarVKs9lMCN1uN4pGo4YtwMckBFC+BeMgYFV1kaL8EHvT6dSuIhKJvAQajYYOx9GG1SsOqqr6Bk8mEzGZ4XBI4XD41QKfr4bN5/MpwPl8LspVFEXA2BuPxzQajeh+v1OxWKRgMPgykc9VKhQKDB5gIRsCsAUiKxLgncOMh/R2kTKZjJxOp024j4PH49GuBpcJmSHCQdPn88lfXuVkMinH43HGWxItwBP0jLljlBxkHo9H/vZnisViUigU0gKBgO73+w2v12twSHe73Rp/l/76N/5r/AZGRj/URbdFDAAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Antechinus flavipes',
          version: '0.29',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Bryum amblyodon Müll. Hal.',
          version: '1.0',
        },
      },
    },
    created: '1620936146000',
    expires: '1630112305000',
    updated: '1622018282000',
    status: 'PAUSED',
    isExpired: true,
    enrollmentNumber: '3247799761',
    periods: {
      start: '1632225814000',
      end: '1628277670000',
      isTrial: false,
    },
    contact: {
      telNumber: '394-275-1099',
      emailAddress: 'jsieghart7@multiply.com',
    },
    billingAddress: '98 Oxford Point',
  },
  {
    _id: 'f5e832e3-b27f-4f4e-a98d-9791077b44fc',
    user: {
      username: 'Georgie',
      avatar: {
        url: 'https://robohash.org/doloremqueenimbeatae.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Kanlam',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJTSURBVDjLpVPPbxJBFP5md4Gl/HAJULHogRqUJiVpw8GYmFjhoDcPHIzRBO+Gk8c2HvwTjCfryaQcjDZR08hFwsWD1DZGQhSLaUk4UDkYUQSWZdd504Ct4dZJvrzZzXzv+957M8yyLBxnSTjmUkabarX6djgcJjlgGAYGg8EYuq6P0e/3KRYymUyKeIxK4OTLdru9GAwGxaH/1+EybTYbisUi6vV6KpvNFoQDrnhf0zQ0m004HI4x6TCR9o1GA16vF5FIhESX+e8CK5fLQt3v96Pdbh+xS6UQkTEGWZaFusfjgcvlQj6fR61WSymkTtapVjqkqqrASF3ETgX4+Q6m9yZM00Sv10M8HkelUllWSKnT6aDVaokGEYEOUTMpMkvHGbaB6dkUdqrraBqLUBQFbrdbuKQESVKiDyLxkoRlSTqY8FmtjkDiErynFjH16RnsmEF3GEA4HCZOUiJVqpVACUagb5W1EXbuwRPQMGy/wumFO/DpWxga+njEIsGIRJZjsRii0ShmZyOYD7UwM38D6G2j9HQNbq0LtfsNU/quOEsJFEpAE6AEo9EJ/PoCTZ+Cx/eHq+/ybvK+/N5EZOkeBoVVnJxOC5csl8u94bVcO3TLMNC7uODbxELqNlTbe5h64+AyMBtkVwL7OxLWX25gs+nPs0mPafvx0t3A3PVHoXNOrlrijnRsvfiMRHoOTD4BOK/iw5OV75ZpXpmYoPTwYiN+ay0sS3uwjB90G468P9l5HvuVj/j6+sFzZdILM/q6ur2a7lom7wVv1j9Y4wiKlhX6C0eqiNj1HMM7AAAAAElFTkSuQmCC',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Zosterops pallidus',
          version: '4.7',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Psychotria hobdyi Sohmer',
          version: '7.6',
        },
      },
    },
    created: '1639007925000',
    expires: '1638555339000',
    updated: '1641074748000',
    status: 'TERMINATED',
    isExpired: false,
    enrollmentNumber: '8468250309',
    periods: {
      start: '1624809679000',
      end: '1645672731000',
      isTrial: true,
    },
    contact: {
      telNumber: '862-678-6706',
      emailAddress: 'gcarlett8@freewebs.com',
    },
    billingAddress: '437 Meadow Vale Trail',
  },
  {
    _id: '099680e2-d640-4c32-bde4-b452c5ece551',
    user: {
      username: 'Doris',
      avatar: {
        url: 'https://robohash.org/sapientearchitectocumque.png?size=50x50&set=set1',
      },
    },
    plan: {
      product: {
        texts: {
          title: 'Vagram',
        },
        media: {
          file: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGdSURBVDjLpVMxa8JAFL6rAQUHXQoZpLU/oUOnDtKtW/MDBFHHThUKTgrqICgOEtd2EVxb2qFkKTgVChbSCnZTiVBEMBRLiEmafleCDaWxDX3w8e7dve+7l3cv1LZt8h/jvA56vV7DNM20YRgE/jyRSOR+ytvwEgAxvVwui/BF+LTvCtjNwKvj/X8CbgXPOHMEZl559HsTu93uPQi7jBiNRgMEx8PR0GIxRB+y2eze2gqQeAXoSCaqqu5bpsWIdyzGvvRrBW7rdDo2I6ZSKeq7B8x0XV/bwJWAJEnHSMwBDUEQWq5GfsJthUJhlVuv11uckyiGgiH2RWK73RYRb2cymbG7gnK5vIX9USwWI1yAI/KjLGK7teEI8HN1TizrnZWdRxxsNps8vI3YLpVKbB2EWB6XkMHzgAlvriYRSW+app1Mpy/jSCRSRSyDUON5nuJGytaAHI/vVPv9p/FischivL96gEP2bGxorhVFqYXDYQFCScwBYa9EKU1OlAkB+QLEU2AGaJ7PWKlUDiF2BBw4P9Mt/KUoije+5uAv9gGcjD6Kg4wu3AAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    payment: {
      provider: {
        interface: {
          label: 'Ardea golieth',
          version: '0.8.0',
        },
      },
    },
    delivery: {
      provider: {
        interface: {
          label: 'Crataegus ×anomala Sarg. (pro sp.)',
          version: '8.66',
        },
      },
    },
    created: '1627943217000',
    expires: '1639886444000',
    updated: '1635540938000',
    status: 'ACTIVE',
    isExpired: false,
    enrollmentNumber: '6419321174',
    periods: {
      start: '1632118544000',
      end: '1619130301000',
      isTrial: true,
    },
    contact: {
      telNumber: '581-570-2359',
      emailAddress: 'depilet9@canalblog.com',
    },
    billingAddress: '92510 Anniversary Terrace',
  },
];

const EnrollmentDetailPage = () => {
  const { formatMessage } = useIntl();

  const { query } = useRouter();
  const { enrollmentId } = query;
  const { enrollment, loading } = useEnrollment({ enrollmentId });

  //TODO remove mock data
  const enrollemntt = enrollmentss.filter(
    (enrollment) => enrollment._id === enrollmentId,
  );

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'enrollment_detail',
            defaultMessage: 'Enrollment Detail',
          })}
        />
      </div>

      {/* TODO change mock props data */}
      {loading ? <Loading /> : <EnrollmentDetail enrollment={enrollemntt} />}
    </div>
  );
};

export default EnrollmentDetailPage;
