import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import QuotationDetail from '../../modules/quotation/components/QuotationDetail';
import useQuotation from '../../modules/quotation/hooks/useQuotation';

// TODO remove mock data
const quotationss = [
  {
    _id: '1e25edb5-93ed-45aa-9c2f-adf0363f1086',
    user: {
      username: 'iscoates0',
      avatar: {
        url: 'https://robohash.org/molestiasdelenitivoluptatum.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'c86cb696-259a-467e-9228-7fe0277c042d',
      texts: {
        title: 'Water - Perrier',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/244x100.png/5fa2dd/ffffff',
        },
      },
    },
    created: 1622375260000,
    expires: 1627765194000,
    status: 'REJECTED',
    isExpired: true,
    quotationNumber: '8635010639',
    fullfilled: 1632352491000,
    rejected: 1632433918000,
    updated: 1624044040000,
    country: {
      _id: 'ae07e2af-c8d1-46e3-b341-9c2cba76b0c4',
      isoCode: 'ID',
      flagEmoji: 'Indonesia',
    },
    currency: {
      isoCode: 'IDR',
      isActive: true,
      _id: '0486f392-ee93-4794-af72-9412f284ad19',
    },
    logs: [],
    configuration: {
      value: 'Brekke, Bogan and Watsica',
      compony: 'Brainverse',
      domain: 'rambler.ru',
      TLD: 'net',
    },
    documents: [
      {
        _id: '930411a8-b165-47ef-9720-d00a6b1ca407',
        name: 'American bighorn sheep',
        type: 'audio/x-mpeg-3',
        url: 'http://imgur.com/mauris.json?in=rhoncus&purus=dui&eu=vel&magna=sem&vulputate=sed&luctus=sagittis&cum=nam&sociis=congue&natoque=risus&penatibus=semper&et=porta&magnis=volutpat&dis=quam&parturient=pede&montes=lobortis&nascetur=ligula&ridiculus=sit&mus=amet&vivamus=eleifend&vestibulum=pede&sagittis=libero&sapien=quis&cum=orci&sociis=nullam&natoque=molestie&penatibus=nibh&et=in&magnis=lectus&dis=pellentesque&parturient=at&montes=nulla&nascetur=suspendisse&ridiculus=potenti&mus=cras&etiam=in&vel=purus&augue=eu&vestibulum=magna&rutrum=vulputate&rutrum=luctus&neque=cum&aenean=sociis&auctor=natoque&gravida=penatibus&sem=et&praesent=magnis&id=dis&massa=parturient&id=montes&nisl=nascetur&venenatis=ridiculus&lacinia=mus&aenean=vivamus&sit=vestibulum&amet=sagittis&justo=sapien&morbi=cum&ut=sociis&odio=natoque&cras=penatibus&mi=et&pede=magnis&malesuada=dis&in=parturient&imperdiet=montes&et=nascetur&commodo=ridiculus&vulputate=mus&justo=etiam&in=vel&blandit=augue&ultrices=vestibulum&enim=rutrum&lorem=rutrum&ipsum=neque&dolor=aenean&sit=auctor&amet=gravida&consectetuer=sem&adipiscing=praesent&elit=id&proin=massa&interdum=id&mauris=nisl&non=venenatis&ligula=lacinia&pellentesque=aenean&ultrices=sit&phasellus=amet&id=justo&sapien=morbi&in=ut&sapien=odio&iaculis=cras&congue=mi&vivamus=pede&metus=malesuada&arcu=in',
      },
    ],
  },
  {
    _id: '88c296d7-fe0e-4ea8-9070-5254e6fa880f',
    user: {
      username: 'mlunney1',
      avatar: {
        url: 'https://robohash.org/inetveritatis.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '7d0d44fb-e0d2-4a0e-804c-11fec52b2414',
      texts: {
        title: 'Soup - Canadian Pea, Dry Mix',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/118x100.png/cc0000/ffffff',
        },
      },
    },
    created: 1615895359000,
    expires: 1645537702000,
    status: 'REJECTED',
    isExpired: true,
    quotationNumber: '8511717641',
    fullfilled: 1646600608000,
    rejected: 1628833524000,
    updated: 1624523829000,
    country: {
      _id: '93bd5b54-d902-4d21-91f9-2557730b89bd',
      isoCode: 'CN',
      flagEmoji: 'China',
    },
    currency: {
      isoCode: 'CNY',
      isActive: true,
      _id: '112bf37c-fe01-41f9-9b29-10a17a4923a4',
    },
    logs: [
      {
        _id: 'dcb91006-1675-451d-bc30-81a742b6fdb2',
        created: 1621286619000,
        level:
          'ONION,APIS MELLIFERA,DROSERA ROTUNDIFOLIA,EUPHRASIA STRICTA,URTICA URENS.',
        message:
          'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.',
        user: {
          _id: '3a3dfcac-7a0c-4297-b2b3-e42e36ae2165',
          username: 'efarrey0',
        },
        order: {
          _id: '62c3a615-0eac-4905-a966-eac6ed2611c5',
          orderNumber: '9085602912',
        },
      },
      {
        _id: '5907ff6f-b763-4ad9-ae10-39063a26dce2',
        created: 1622675640000,
        level: 'paroxetine hydrochloride',
        message:
          'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
        user: {
          _id: 'f2a9c3a2-4e5d-4d20-8f7e-d49dfd8f7f66',
          username: 'nherrero1',
        },
        order: {
          _id: '9fb1470f-6ba4-46b3-8873-7fae49c60233',
          orderNumber: '9587535014',
        },
      },
      {
        _id: '55e88cfe-6413-4499-a520-548c49726a5f',
        created: 1637806258000,
        level:
          'HELIANTHEMUM NUMMULARIUM FLOWER, CLEMATIS VITALBA TOP, IMPATIENS GLANDULIFERA FLOWER, PRUNUS CERASIFERA FLOWER, and ORNITHOGALUM UMBELLATUM',
        message:
          'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.',
        user: {
          _id: 'e944282e-ee21-472a-b613-be378dd5c951',
          username: 'oashlee2',
        },
        order: {
          _id: '611336b4-dd1e-4e57-b118-c3e7bac6c3c6',
          orderNumber: '6049900159',
        },
      },
      {
        _id: '68c64273-1a8a-48eb-98bc-62c796a1cb3d',
        created: 1632778151000,
        level: 'BENZOYL PEROXIDE',
        message: 'Duis ac nibh.',
        user: {
          _id: '37dd4677-24ef-45c7-aba2-df4b3a640fcf',
          username: 'dshawel3',
        },
        order: {
          _id: '70c94c8b-a0a8-4706-aa25-017de228df7e',
          orderNumber: '5145575130',
        },
      },
    ],
    configuration: {
      value: 'Schmitt Inc',
      compony: 'Centizu',
      domain: 'sciencedaily.com',
      TLD: 'biz',
    },
    documents: [
      {
        _id: 'ae69fff1-ad26-4315-8de6-21973e404c12',
        name: 'Sheep, american bighorn',
        type: 'image/jpeg',
        url: 'http://digg.com/enim/sit.js?erat=maecenas&vestibulum=pulvinar&sed=lobortis&magna=est&at=phasellus&nunc=sit&commodo=amet&placerat=erat&praesent=nulla&blandit=tempus&nam=vivamus&nulla=in&integer=felis&pede=eu&justo=sapien&lacinia=cursus&eget=vestibulum&tincidunt=proin&eget=eu&tempus=mi&vel=nulla&pede=ac&morbi=enim&porttitor=in&lorem=tempor&id=turpis&ligula=nec&suspendisse=euismod&ornare=scelerisque&consequat=quam&lectus=turpis&in=adipiscing&est=lorem&risus=vitae&auctor=mattis&sed=nibh&tristique=ligula&in=nec&tempus=sem&sit=duis&amet=aliquam',
      },
      {
        _id: '88b66e7a-8133-487c-9d29-623ad2f39f46',
        name: 'Bear, sloth',
        type: 'application/vnd.ms-excel',
        url: 'http://whitehouse.gov/sapien.png?justo=ultrices&eu=erat&massa=tortor&donec=sollicitudin&dapibus=mi&duis=sit&at=amet&velit=lobortis&eu=sapien&est=sapien&congue=non&elementum=mi&in=integer&hac=ac&habitasse=neque&platea=duis&dictumst=bibendum&morbi=morbi&vestibulum=non&velit=quam&id=nec&pretium=dui&iaculis=luctus&diam=rutrum&erat=nulla&fermentum=tellus&justo=in&nec=sagittis&condimentum=dui&neque=vel&sapien=nisl&placerat=duis&ante=ac&nulla=nibh&justo=fusce&aliquam=lacus&quis=purus&turpis=aliquet&eget=at&elit=feugiat&sodales=non&scelerisque=pretium&mauris=quis&sit=lectus&amet=suspendisse&eros=potenti&suspendisse=in&accumsan=eleifend&tortor=quam&quis=a&turpis=odio&sed=in&ante=hac&vivamus=habitasse&tortor=platea&duis=dictumst&mattis=maecenas&egestas=ut&metus=massa&aenean=quis&fermentum=augue&donec=luctus&ut=tincidunt&mauris=nulla&eget=mollis&massa=molestie&tempor=lorem&convallis=quisque&nulla=ut&neque=erat&libero=curabitur&convallis=gravida&eget=nisi&eleifend=at&luctus=nibh&ultricies=in&eu=hac&nibh=habitasse&quisque=platea&id=dictumst&justo=aliquam&sit=augue&amet=quam&sapien=sollicitudin&dignissim=vitae&vestibulum=consectetuer&vestibulum=eget&ante=rutrum&ipsum=at&primis=lorem&in=integer&faucibus=tincidunt&orci=ante',
      },
      {
        _id: '77a790eb-2c8c-424d-ad38-c61a38244404',
        name: 'Mountain duck',
        type: 'application/x-msexcel',
        url: 'http://rakuten.co.jp/libero/nullam/sit/amet/turpis/elementum/ligula.xml?ultrices=lorem&enim=quisque&lorem=ut&ipsum=erat&dolor=curabitur&sit=gravida&amet=nisi&consectetuer=at&adipiscing=nibh&elit=in&proin=hac&interdum=habitasse&mauris=platea&non=dictumst&ligula=aliquam&pellentesque=augue&ultrices=quam&phasellus=sollicitudin&id=vitae&sapien=consectetuer&in=eget&sapien=rutrum&iaculis=at&congue=lorem&vivamus=integer&metus=tincidunt&arcu=ante&adipiscing=vel&molestie=ipsum&hendrerit=praesent&at=blandit&vulputate=lacinia&vitae=erat&nisl=vestibulum&aenean=sed&lectus=magna&pellentesque=at&eget=nunc&nunc=commodo&donec=placerat&quis=praesent&orci=blandit&eget=nam&orci=nulla&vehicula=integer&condimentum=pede&curabitur=justo&in=lacinia&libero=eget&ut=tincidunt&massa=eget&volutpat=tempus&convallis=vel&morbi=pede&odio=morbi&odio=porttitor&elementum=lorem',
      },
      {
        _id: '98883690-68b7-449a-8b57-0b5ad106b9da',
        name: 'Cape cobra',
        type: 'video/msvideo',
        url: 'https://wiley.com/justo/in/hac/habitasse/platea.json?id=iaculis&pretium=diam&iaculis=erat&diam=fermentum&erat=justo&fermentum=nec&justo=condimentum&nec=neque&condimentum=sapien&neque=placerat&sapien=ante&placerat=nulla&ante=justo&nulla=aliquam&justo=quis&aliquam=turpis&quis=eget&turpis=elit&eget=sodales&elit=scelerisque&sodales=mauris&scelerisque=sit&mauris=amet&sit=eros&amet=suspendisse&eros=accumsan&suspendisse=tortor&accumsan=quis&tortor=turpis&quis=sed&turpis=ante&sed=vivamus&ante=tortor&vivamus=duis&tortor=mattis&duis=egestas&mattis=metus&egestas=aenean&metus=fermentum&aenean=donec&fermentum=ut&donec=mauris&ut=eget&mauris=massa&eget=tempor&massa=convallis&tempor=nulla&convallis=neque&nulla=libero',
      },
    ],
  },
  {
    _id: '7dd2f509-c288-4380-8e35-6a3dd71c889e',
    user: {
      username: 'cdukesbury2',
      avatar: {
        url: 'https://robohash.org/involuptatemenim.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'c675d1c6-0ae7-4f9f-bb1f-53c18f30ccd5',
      texts: {
        title: 'Broom And Brush Rack Black',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/175x100.png/5fa2dd/ffffff',
        },
      },
    },
    created: 1625116197000,
    expires: 1642223583000,
    status: 'REJECTED',
    isExpired: false,
    quotationNumber: '3480459196',
    fullfilled: 1620354593000,
    rejected: 1627519846000,
    updated: 1624685914000,
    country: {
      _id: '24a8e427-5a9e-4693-b771-fde14d5efb4e',
      isoCode: 'LK',
      flagEmoji: 'Sri Lanka',
    },
    currency: {
      isoCode: 'LKR',
      isActive: false,
      _id: '696d9153-5e8a-4a23-a9c7-a3f3208dbf45',
    },
    logs: [],
    configuration: {
      value: 'Dibbert, Crist and Kassulke',
      compony: 'Feedfish',
      domain: 'booking.com',
      TLD: 'org',
    },
    documents: [
      {
        _id: '523cfabd-4dd1-4592-85a1-96f3316a71c3',
        name: 'Skunk, striped',
        type: 'video/quicktime',
        url: 'https://cam.ac.uk/maecenas/rhoncus/aliquam/lacus/morbi.png?vel=hac&lectus=habitasse&in=platea&quam=dictumst&fringilla=etiam&rhoncus=faucibus&mauris=cursus&enim=urna&leo=ut&rhoncus=tellus&sed=nulla&vestibulum=ut&sit=erat&amet=id&cursus=mauris&id=vulputate&turpis=elementum&integer=nullam&aliquet=varius&massa=nulla&id=facilisi&lobortis=cras&convallis=non&tortor=velit&risus=nec&dapibus=nisi&augue=vulputate&vel=nonummy&accumsan=maecenas&tellus=tincidunt&nisi=lacus&eu=at&orci=velit&mauris=vivamus&lacinia=vel&sapien=nulla&quis=eget&libero=eros&nullam=elementum&sit=pellentesque&amet=quisque&turpis=porta&elementum=volutpat&ligula=erat&vehicula=quisque&consequat=erat&morbi=eros&a=viverra&ipsum=eget&integer=congue&a=eget&nibh=semper&in=rutrum&quis=nulla&justo=nunc&maecenas=purus&rhoncus=phasellus&aliquam=in&lacus=felis&morbi=donec&quis=semper&tortor=sapien&id=a&nulla=libero&ultrices=nam&aliquet=dui&maecenas=proin&leo=leo&odio=odio&condimentum=porttitor&id=id&luctus=consequat&nec=in&molestie=consequat&sed=ut&justo=nulla&pellentesque=sed&viverra=accumsan&pede=felis&ac=ut&diam=at&cras=dolor&pellentesque=quis&volutpat=odio&dui=consequat&maecenas=varius&tristique=integer&est=ac&et=leo&tempus=pellentesque&semper=ultrices',
      },
    ],
  },
  {
    _id: '8b5e9249-3dd4-4505-8134-cd6f125a235f',
    user: {
      username: 'lpitkeathley3',
      avatar: {
        url: 'https://robohash.org/possimusetsequi.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '3a0cd20f-b870-40d1-80a6-8b534408da8c',
      texts: {
        title: 'Beer - Mcauslan Apricot',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/126x100.png/dddddd/000000',
        },
      },
    },
    created: 1616760903000,
    expires: 1622380296000,
    status: 'REQUESTED',
    isExpired: false,
    quotationNumber: '8397648178',
    fullfilled: 1637793828000,
    rejected: 1620044054000,
    updated: 1621431071000,
    country: {
      _id: 'f1b22b96-065f-4fbf-85e2-0fd786c5d19b',
      isoCode: 'EG',
      flagEmoji: 'Egypt',
    },
    currency: {
      isoCode: 'EGP',
      isActive: false,
      _id: 'b783fb45-a126-4089-afb2-331dd908eea5',
    },
    logs: [
      {
        _id: '8e128117-e809-4ee2-a4be-6a199c14944f',
        created: 1618937748000,
        level: 'Thiothixene',
        message:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        user: {
          _id: 'a972d24e-04f8-499d-9abf-0285dcb9fdf7',
          username: 'cnolte0',
        },
        order: {
          _id: '7392cac5-3fc7-4b0f-8fff-f37cb352428e',
          orderNumber: '0572350236',
        },
      },
    ],
    configuration: {
      value: 'Hirthe, Watsica and Raynor',
      compony: 'Avavee',
      domain: 'auda.org.au',
      TLD: 'edu',
    },
    documents: [
      {
        _id: '5f3dc081-3602-4cba-87dd-9fef92f52fa0',
        name: 'Antelope, sable',
        type: 'application/x-troff-msvideo',
        url: 'https://mashable.com/a/nibh/in/quis/justo/maecenas.jpg?nam=id&congue=nulla&risus=ultrices&semper=aliquet&porta=maecenas&volutpat=leo&quam=odio&pede=condimentum&lobortis=id&ligula=luctus&sit=nec&amet=molestie&eleifend=sed&pede=justo&libero=pellentesque&quis=viverra&orci=pede&nullam=ac&molestie=diam&nibh=cras&in=pellentesque&lectus=volutpat&pellentesque=dui&at=maecenas&nulla=tristique&suspendisse=est&potenti=et&cras=tempus&in=semper&purus=est&eu=quam&magna=pharetra&vulputate=magna&luctus=ac&cum=consequat&sociis=metus&natoque=sapien&penatibus=ut&et=nunc&magnis=vestibulum&dis=ante&parturient=ipsum&montes=primis&nascetur=in&ridiculus=faucibus&mus=orci&vivamus=luctus&vestibulum=et&sagittis=ultrices&sapien=posuere&cum=cubilia&sociis=curae&natoque=mauris&penatibus=viverra&et=diam&magnis=vitae&dis=quam&parturient=suspendisse&montes=potenti&nascetur=nullam&ridiculus=porttitor&mus=lacus&etiam=at&vel=turpis&augue=donec&vestibulum=posuere&rutrum=metus&rutrum=vitae',
      },
    ],
  },
  {
    _id: 'a209845b-49d9-4780-a0db-be9b73c5e31f',
    user: {
      username: 'rmccoll4',
      avatar: {
        url: 'https://robohash.org/sedestplaceat.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '88851ee3-e11e-46ec-8672-8df7ee7639cb',
      texts: {
        title: 'Stock - Veal, White',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/190x100.png/dddddd/000000',
        },
      },
    },
    created: 1642790546000,
    expires: 1638269571000,
    status: 'PROPOSED',
    isExpired: true,
    quotationNumber: '1386918466',
    fullfilled: 1616331361000,
    rejected: 1644834938000,
    updated: 1638922511000,
    country: {
      _id: '3d840e47-778d-4e74-b7e1-6014cb8a43a9',
      isoCode: 'CN',
      flagEmoji: 'China',
    },
    currency: {
      isoCode: 'CNY',
      isActive: false,
      _id: '1c026e4b-a865-4c40-b4fb-429f5eb9e483',
    },
    logs: [
      {
        _id: 'c8da8579-b9c4-4b65-b3ce-32267f60ac6b',
        created: 1640630538000,
        level: 'Piperonyl butoxide, Pyrethrum extract',
        message:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
        user: {
          _id: '78673b79-9866-419d-a747-5475d20e8f37',
          username: 'hmacneachtain0',
        },
        order: {
          _id: '83146f44-2188-4673-b5b7-9ed06deaef18',
          orderNumber: '5282808412',
        },
      },
      {
        _id: '6c9af0b2-0a70-4060-a6fc-1c1223ba98e8',
        created: 1632385398000,
        level: 'tazobactam sodium and piperacillin sodium',
        message:
          'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
        user: {
          _id: '8d6989a1-f675-4612-be73-5e6f7f0f3886',
          username: 'egilbart1',
        },
        order: {
          _id: '1a9538ae-3dde-4660-8061-4bf33d8db8d3',
          orderNumber: '1982961120',
        },
      },
      {
        _id: 'ddffc3fc-c050-4487-a521-96a62ca01ea9',
        created: 1628624542000,
        level: 'vardenafil hydrochloride',
        message:
          'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.',
        user: {
          _id: 'ab04e054-f344-4591-925d-041cfa600101',
          username: 'jcornall2',
        },
        order: {
          _id: 'ec917562-2294-4cf0-83b1-73fb9cbc7343',
          orderNumber: '9930469605',
        },
      },
    ],
    configuration: {
      value: 'Hagenes and Sons',
      compony: 'Quamba',
      domain: 'histats.com',
      TLD: 'name',
    },
    documents: [
      {
        _id: '4793c5d2-6a8f-4a05-8e50-637cdfe1de63',
        name: 'Sugar glider',
        type: 'image/x-tiff',
        url: 'https://vinaora.com/donec/diam/neque/vestibulum.jsp?gravida=purus&sem=phasellus&praesent=in&id=felis&massa=donec&id=semper&nisl=sapien&venenatis=a&lacinia=libero&aenean=nam&sit=dui&amet=proin&justo=leo&morbi=odio&ut=porttitor&odio=id&cras=consequat&mi=in&pede=consequat&malesuada=ut&in=nulla&imperdiet=sed',
      },
      {
        _id: '6b8ae7c6-bac5-4f35-bb71-2a56cf17a827',
        name: 'Owl, australian masked',
        type: 'image/png',
        url: 'http://whitehouse.gov/commodo.js?turpis=ante&sed=ipsum&ante=primis&vivamus=in&tortor=faucibus&duis=orci&mattis=luctus&egestas=et&metus=ultrices&aenean=posuere&fermentum=cubilia&donec=curae&ut=nulla&mauris=dapibus&eget=dolor&massa=vel&tempor=est&convallis=donec&nulla=odio&neque=justo&libero=sollicitudin&convallis=ut&eget=suscipit&eleifend=a&luctus=feugiat&ultricies=et&eu=eros&nibh=vestibulum&quisque=ac&id=est&justo=lacinia&sit=nisi&amet=venenatis&sapien=tristique&dignissim=fusce&vestibulum=congue&vestibulum=diam&ante=id&ipsum=ornare&primis=imperdiet&in=sapien&faucibus=urna&orci=pretium&luctus=nisl&et=ut&ultrices=volutpat&posuere=sapien&cubilia=arcu&curae=sed&nulla=augue&dapibus=aliquam&dolor=erat&vel=volutpat&est=in&donec=congue&odio=etiam&justo=justo&sollicitudin=etiam&ut=pretium&suscipit=iaculis&a=justo&feugiat=in&et=hac&eros=habitasse&vestibulum=platea&ac=dictumst&est=etiam&lacinia=faucibus&nisi=cursus&venenatis=urna&tristique=ut&fusce=tellus&congue=nulla',
      },
    ],
  },
  {
    _id: '3d4f685d-942b-4853-bbe1-22d23f412570',
    user: {
      username: 'sparis5',
      avatar: {
        url: 'https://robohash.org/expeditaoptioporro.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '4b7e0ecc-ee53-40f4-9206-ca64b179cfc6',
      texts: {
        title: 'Pail - 4l White, With Handle',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/228x100.png/cc0000/ffffff',
        },
      },
    },
    created: 1639180969000,
    expires: 1625029506000,
    status: 'REQUESTED',
    isExpired: false,
    quotationNumber: '5751036468',
    fullfilled: 1639847241000,
    rejected: 1619400237000,
    updated: 1645046113000,
    country: {
      _id: 'f35b5a01-81ed-4c54-879b-db1a0c6012dc',
      isoCode: 'CA',
      flagEmoji: 'Canada',
    },
    currency: {
      isoCode: 'CAD',
      isActive: false,
      _id: '2cac6fbe-4876-42c2-8306-62d7b58546e1',
    },
    logs: [
      {
        _id: '6255d415-da93-46c4-a4a1-e0899542a6e8',
        created: 1624426369000,
        level:
          'ARNICA MONTANA, BELLIS PERENNIS, CHAMOMILLA, IPECACUANHA, LYCOPODIUM CLAVATUM',
        message: 'Pellentesque at nulla. Suspendisse potenti.',
        user: {
          _id: 'ff82ce1b-2f26-493a-8e59-e993aac54a84',
          username: 'crising0',
        },
        order: {
          _id: 'b3599232-e7e9-4cf6-99dc-53cd7beea18f',
          orderNumber: '2252757973',
        },
      },
      {
        _id: 'e7894b3d-d371-46b1-9086-38e6238a5f4f',
        created: 1615920568000,
        level: 'Hydrocortisone',
        message:
          'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.',
        user: {
          _id: '29e01e64-896f-4845-b227-5ace29eef47c',
          username: 'mgowlett1',
        },
        order: {
          _id: '55e887f2-059e-42d0-b7a9-c86e9c345a1d',
          orderNumber: '2636680136',
        },
      },
      {
        _id: 'a7c85ec4-daa3-4b51-9d54-525c941be901',
        created: 1643853490000,
        level: 'BUPIVACAINE HYDROCHLORIDE',
        message:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        user: {
          _id: 'bdf8a0b8-7d85-4a2c-ae28-fdd96248699d',
          username: 'slamswood2',
        },
        order: {
          _id: '030c8e59-4dd9-4c65-8dd5-f5b367affc86',
          orderNumber: '2225586640',
        },
      },
    ],
    configuration: {
      value: 'Lesch-Keebler',
      compony: 'Devify',
      domain: 'virginia.edu',
      TLD: 'info',
    },
    documents: [
      {
        _id: '49b7f184-abcd-4c3a-83e9-22fe7bd6016f',
        name: 'Mongoose, yellow',
        type: 'video/x-mpeg',
        url: 'https://usnews.com/porttitor/id.aspx?nunc=id&nisl=lobortis&duis=convallis&bibendum=tortor&felis=risus&sed=dapibus&interdum=augue&venenatis=vel&turpis=accumsan&enim=tellus&blandit=nisi&mi=eu&in=orci&porttitor=mauris&pede=lacinia&justo=sapien&eu=quis&massa=libero&donec=nullam&dapibus=sit&duis=amet&at=turpis&velit=elementum&eu=ligula&est=vehicula&congue=consequat&elementum=morbi&in=a&hac=ipsum&habitasse=integer&platea=a&dictumst=nibh&morbi=in&vestibulum=quis&velit=justo&id=maecenas&pretium=rhoncus&iaculis=aliquam&diam=lacus&erat=morbi&fermentum=quis&justo=tortor&nec=id&condimentum=nulla&neque=ultrices&sapien=aliquet&placerat=maecenas&ante=leo&nulla=odio&justo=condimentum&aliquam=id&quis=luctus&turpis=nec&eget=molestie&elit=sed&sodales=justo&scelerisque=pellentesque&mauris=viverra&sit=pede&amet=ac&eros=diam&suspendisse=cras&accumsan=pellentesque&tortor=volutpat&quis=dui&turpis=maecenas&sed=tristique&ante=est&vivamus=et&tortor=tempus&duis=semper&mattis=est&egestas=quam&metus=pharetra&aenean=magna&fermentum=ac',
      },
      {
        _id: 'c4eee3ba-fc65-4e8d-8950-3235bf271cf1',
        name: 'Goose, canada',
        type: 'application/x-msexcel',
        url: 'http://amazon.com/libero/quis.json?vestibulum=venenatis&proin=lacinia&eu=aenean&mi=sit&nulla=amet&ac=justo&enim=morbi&in=ut&tempor=odio&turpis=cras&nec=mi&euismod=pede&scelerisque=malesuada&quam=in&turpis=imperdiet&adipiscing=et&lorem=commodo&vitae=vulputate&mattis=justo&nibh=in&ligula=blandit&nec=ultrices&sem=enim&duis=lorem&aliquam=ipsum&convallis=dolor&nunc=sit&proin=amet&at=consectetuer&turpis=adipiscing&a=elit&pede=proin&posuere=interdum&nonummy=mauris&integer=non&non=ligula&velit=pellentesque&donec=ultrices&diam=phasellus&neque=id&vestibulum=sapien&eget=in&vulputate=sapien&ut=iaculis&ultrices=congue&vel=vivamus&augue=metus&vestibulum=arcu&ante=adipiscing&ipsum=molestie&primis=hendrerit&in=at&faucibus=vulputate&orci=vitae&luctus=nisl&et=aenean&ultrices=lectus&posuere=pellentesque&cubilia=eget&curae=nunc&donec=donec&pharetra=quis&magna=orci&vestibulum=eget&aliquet=orci&ultrices=vehicula&erat=condimentum&tortor=curabitur&sollicitudin=in&mi=libero&sit=ut',
      },
      {
        _id: 'aebfef3f-fddb-4df4-9fba-5640cf9ffa8e',
        name: 'Gulls (unidentified)',
        type: 'application/excel',
        url: 'http://drupal.org/interdum/in/ante/vestibulum/ante/ipsum/primis.xml?sociis=interdum&natoque=mauris&penatibus=non&et=ligula&magnis=pellentesque&dis=ultrices&parturient=phasellus&montes=id&nascetur=sapien&ridiculus=in&mus=sapien&etiam=iaculis&vel=congue&augue=vivamus&vestibulum=metus&rutrum=arcu&rutrum=adipiscing&neque=molestie&aenean=hendrerit&auctor=at&gravida=vulputate&sem=vitae&praesent=nisl&id=aenean&massa=lectus&id=pellentesque&nisl=eget&venenatis=nunc&lacinia=donec&aenean=quis&sit=orci&amet=eget&justo=orci',
      },
      {
        _id: '9cfd448b-a1ab-4e89-85f1-64d2a15045f2',
        name: 'Eastern fox squirrel',
        type: 'image/png',
        url: 'http://guardian.co.uk/felis/sed/lacus/morbi/sem.jsp?hendrerit=sapien&at=sapien&vulputate=non&vitae=mi&nisl=integer&aenean=ac&lectus=neque&pellentesque=duis&eget=bibendum&nunc=morbi&donec=non&quis=quam&orci=nec&eget=dui&orci=luctus&vehicula=rutrum&condimentum=nulla&curabitur=tellus&in=in&libero=sagittis&ut=dui&massa=vel&volutpat=nisl&convallis=duis&morbi=ac&odio=nibh&odio=fusce&elementum=lacus&eu=purus&interdum=aliquet&eu=at&tincidunt=feugiat',
      },
    ],
  },
  {
    _id: '9261acae-7e2c-45a1-8956-ac547ebf8243',
    user: {
      username: 'lyurygyn6',
      avatar: {
        url: 'https://robohash.org/estestdolor.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '6cc97b9a-0368-4580-8ec8-0228c26540bc',
      texts: {
        title: 'Ice Cream - Turtles Stick Bar',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/207x100.png/ff4444/ffffff',
        },
      },
    },
    created: 1629548483000,
    expires: 1631927641000,
    status: 'PROCESSING',
    isExpired: false,
    quotationNumber: '5456597500',
    fullfilled: 1618456067000,
    rejected: 1615654040000,
    updated: 1643607117000,
    country: {
      _id: 'a4f83134-fc82-4ae1-8155-aad797e94195',
      isoCode: 'ID',
      flagEmoji: 'Indonesia',
    },
    currency: {
      isoCode: 'IDR',
      isActive: true,
      _id: 'cbc3db1e-585c-452a-9408-1814c38fc481',
    },
    logs: [
      {
        _id: '45b33de6-88ca-4f75-9784-3e9ec8ff3da2',
        created: 1629231382000,
        level:
          'Acetaminophen, Dextromethorphan Hydrobromide, Doxylamine Succinate',
        message:
          'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
        user: {
          _id: '475ad49c-ccea-40de-b2a1-ac28cb47142c',
          username: 'mgalier0',
        },
        order: {
          _id: 'c2431a6a-06f5-4f92-8b1f-e342efdef93d',
          orderNumber: '8764931595',
        },
      },
    ],
    configuration: {
      value: 'Wehner-Gutmann',
      compony: 'Jaxbean',
      domain: 't.co',
      TLD: 'net',
    },
    documents: [
      {
        _id: '5b2cbf1d-17d6-4539-a697-69a4d18d05b7',
        name: 'Cape clawless otter',
        type: 'video/avi',
        url: 'http://imdb.com/id/massa/id/nisl/venenatis.json?mauris=quisque&lacinia=ut&sapien=erat&quis=curabitur&libero=gravida&nullam=nisi&sit=at&amet=nibh&turpis=in&elementum=hac&ligula=habitasse&vehicula=platea&consequat=dictumst&morbi=aliquam',
      },
      {
        _id: 'b1f0a6ab-4563-49cd-9c5c-4f05ba169394',
        name: 'Red-tailed phascogale',
        type: 'video/msvideo',
        url: 'http://unesco.org/at/turpis/donec.xml?ipsum=in&primis=consequat&in=ut&faucibus=nulla&orci=sed&luctus=accumsan&et=felis&ultrices=ut&posuere=at&cubilia=dolor&curae=quis&donec=odio&pharetra=consequat&magna=varius&vestibulum=integer&aliquet=ac&ultrices=leo&erat=pellentesque&tortor=ultrices&sollicitudin=mattis&mi=odio&sit=donec&amet=vitae&lobortis=nisi&sapien=nam&sapien=ultrices&non=libero&mi=non&integer=mattis&ac=pulvinar',
      },
      {
        _id: '2bc339df-890c-4b88-91a1-b3e5f5401109',
        name: 'Red-cheeked cordon bleu',
        type: 'audio/mpeg3',
        url: 'http://cdc.gov/enim/in/tempor.json?turpis=suspendisse&enim=potenti&blandit=cras&mi=in&in=purus&porttitor=eu&pede=magna&justo=vulputate&eu=luctus&massa=cum&donec=sociis&dapibus=natoque&duis=penatibus&at=et&velit=magnis&eu=dis&est=parturient&congue=montes&elementum=nascetur&in=ridiculus&hac=mus&habitasse=vivamus&platea=vestibulum&dictumst=sagittis&morbi=sapien&vestibulum=cum&velit=sociis&id=natoque&pretium=penatibus&iaculis=et&diam=magnis&erat=dis&fermentum=parturient&justo=montes&nec=nascetur&condimentum=ridiculus&neque=mus&sapien=etiam&placerat=vel&ante=augue&nulla=vestibulum&justo=rutrum&aliquam=rutrum&quis=neque&turpis=aenean&eget=auctor&elit=gravida&sodales=sem&scelerisque=praesent&mauris=id&sit=massa&amet=id&eros=nisl&suspendisse=venenatis&accumsan=lacinia&tortor=aenean&quis=sit&turpis=amet&sed=justo&ante=morbi&vivamus=ut&tortor=odio&duis=cras&mattis=mi&egestas=pede&metus=malesuada&aenean=in&fermentum=imperdiet&donec=et&ut=commodo&mauris=vulputate&eget=justo&massa=in&tempor=blandit&convallis=ultrices',
      },
    ],
  },
  {
    _id: '41fe18b7-2a66-43dd-94c9-e8b866e8da9a',
    user: {
      username: 'cpriestman7',
      avatar: {
        url: 'https://robohash.org/adipiscieaquidem.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: '5a23b07f-636a-4103-b25e-17c8d57964cb',
      texts: {
        title: 'Appetizer - Southwestern',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/176x100.png/5fa2dd/ffffff',
        },
      },
    },
    created: 1616109643000,
    expires: 1644373171000,
    status: 'FULLFILLED',
    isExpired: true,
    quotationNumber: '9105775906',
    fullfilled: 1617809868000,
    rejected: 1631141633000,
    updated: 1629300864000,
    country: {
      _id: 'c58bbac5-cede-460f-bd74-240b61bb7830',
      isoCode: 'GB',
      flagEmoji: 'United Kingdom',
    },
    currency: {
      isoCode: 'GBP',
      isActive: true,
      _id: '779685a0-3ac6-4602-b6d3-956bb800a12c',
    },
    logs: [
      {
        _id: '257c4a37-8e77-4094-a401-f51ff4ea584a',
        created: 1617399522000,
        level: 'Dextromethorphan Hydrobromide and Guaifenesin',
        message: 'Vestibulum sed magna at nunc commodo placerat.',
        user: {
          _id: 'f7f2762b-f79f-418a-a9de-fcdd09f53477',
          username: 'vbarhims0',
        },
        order: {
          _id: 'a77ffe76-f2b0-41ae-9f06-653ca0d266e7',
          orderNumber: '2967417831',
        },
      },
      {
        _id: 'a514b5ff-eeb9-47e1-b857-553d64d968df',
        created: 1626699329000,
        level: 'Oxygen',
        message: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        user: {
          _id: 'e62dcd92-4f3d-42d4-916b-77819808e9c2',
          username: 'gplampin1',
        },
        order: {
          _id: 'd8407632-9045-4b9e-a54d-ead3aeef9d4f',
          orderNumber: '9351870847',
        },
      },
      {
        _id: 'c9c4380c-643d-4796-95a1-29577393cd1d',
        created: 1644647944000,
        level: 'mechlorethamine hydrochloride',
        message:
          'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        user: {
          _id: 'd1b5fd33-d10f-4397-8f98-85fe50cc3d1f',
          username: 'ustarrs2',
        },
        order: {
          _id: '44ad9f9f-b0e0-4c2e-8a6a-4b1bad85d03a',
          orderNumber: '6819658419',
        },
      },
    ],
    configuration: {
      value: 'Swift-Casper',
      compony: 'Shufflester',
      domain: 'howstuffworks.com',
      TLD: 'com',
    },
    documents: [
      {
        _id: '873bb7ad-73a2-4ef1-8313-1f93a08757e1',
        name: 'Cape starling',
        type: 'video/x-msvideo',
        url: 'https://canalblog.com/in.jsp?non=placerat&ligula=praesent&pellentesque=blandit&ultrices=nam&phasellus=nulla&id=integer&sapien=pede&in=justo&sapien=lacinia&iaculis=eget&congue=tincidunt&vivamus=eget&metus=tempus&arcu=vel&adipiscing=pede&molestie=morbi&hendrerit=porttitor&at=lorem&vulputate=id&vitae=ligula&nisl=suspendisse&aenean=ornare&lectus=consequat&pellentesque=lectus&eget=in&nunc=est&donec=risus&quis=auctor&orci=sed&eget=tristique&orci=in&vehicula=tempus&condimentum=sit&curabitur=amet&in=sem&libero=fusce&ut=consequat&massa=nulla&volutpat=nisl&convallis=nunc&morbi=nisl&odio=duis&odio=bibendum',
      },
      {
        _id: '801599e0-77dd-4d9b-ab84-90ae462be7b2',
        name: 'African polecat',
        type: 'application/msword',
        url: 'http://storify.com/neque.jpg?interdum=suspendisse&venenatis=ornare&turpis=consequat&enim=lectus&blandit=in&mi=est&in=risus&porttitor=auctor&pede=sed&justo=tristique&eu=in&massa=tempus&donec=sit&dapibus=amet&duis=sem&at=fusce&velit=consequat&eu=nulla&est=nisl&congue=nunc&elementum=nisl&in=duis&hac=bibendum&habitasse=felis&platea=sed&dictumst=interdum&morbi=venenatis&vestibulum=turpis&velit=enim&id=blandit&pretium=mi&iaculis=in&diam=porttitor&erat=pede&fermentum=justo&justo=eu&nec=massa&condimentum=donec&neque=dapibus&sapien=duis&placerat=at&ante=velit&nulla=eu&justo=est&aliquam=congue&quis=elementum&turpis=in&eget=hac&elit=habitasse&sodales=platea&scelerisque=dictumst&mauris=morbi&sit=vestibulum&amet=velit&eros=id&suspendisse=pretium&accumsan=iaculis&tortor=diam&quis=erat&turpis=fermentum&sed=justo&ante=nec&vivamus=condimentum&tortor=neque&duis=sapien&mattis=placerat&egestas=ante&metus=nulla&aenean=justo&fermentum=aliquam&donec=quis&ut=turpis',
      },
    ],
  },
  {
    _id: 'c3b246c7-5cc1-4c5a-a40c-ab7dff295f7c',
    user: {
      username: 'lschlagh8',
      avatar: {
        url: 'https://robohash.org/fugitasperioresrerum.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'ad9b449d-4bb0-4919-8b76-30d2f7577609',
      texts: {
        title: 'Fish - Halibut, Cold Smoked',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/187x100.png/cc0000/ffffff',
        },
      },
    },
    created: 1631736345000,
    expires: 1618094294000,
    status: 'PROPOSED',
    isExpired: true,
    quotationNumber: '6346343955',
    fullfilled: 1635577488000,
    rejected: 1616653362000,
    updated: 1629285512000,
    country: {
      _id: '2105b453-fe63-4bec-88c1-b8f537b6e2d1',
      isoCode: 'UZ',
      flagEmoji: 'Uzbekistan',
    },
    currency: {
      isoCode: 'UZS',
      isActive: false,
      _id: '98f64de9-0815-4a25-9159-0e9c193d23cd',
    },
    logs: [
      {
        _id: '797076f4-d945-4fed-91f6-362f9131ee72',
        created: 1624388177000,
        level: 'Cyclobenzaprine Hydrochloride',
        message:
          'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        user: {
          _id: '57f9e1c2-357a-451f-aa27-9979ec17ab4e',
          username: 'fhammerich0',
        },
        order: {
          _id: 'e4192910-f9f5-4489-b220-1d050469ffb0',
          orderNumber: '5091740856',
        },
      },
      {
        _id: '2edd152f-83d0-4a42-aada-359cc31307d0',
        created: 1631992225000,
        level: 'Metformin hydrochloride',
        message:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        user: {
          _id: '54cedd83-c67d-4125-8692-cd285a225d08',
          username: 'jserfati1',
        },
        order: {
          _id: '176bc79a-e911-43a7-97d3-dd0c0d3c897d',
          orderNumber: '0521663903',
        },
      },
    ],
    configuration: {
      value: 'Kub and Sons',
      compony: 'Yakitri',
      domain: 'princeton.edu',
      TLD: 'info',
    },
    documents: [
      {
        _id: 'f06252b2-a162-45dc-a02a-651e88bc1f83',
        name: 'Black-throated butcher bird',
        type: 'video/avi',
        url: 'https://amazon.de/nulla/eget/eros/elementum/pellentesque/quisque.html?et=nonummy&ultrices=maecenas&posuere=tincidunt&cubilia=lacus&curae=at&duis=velit&faucibus=vivamus&accumsan=vel&odio=nulla&curabitur=eget&convallis=eros&duis=elementum&consequat=pellentesque&dui=quisque&nec=porta&nisi=volutpat&volutpat=erat&eleifend=quisque&donec=erat&ut=eros&dolor=viverra&morbi=eget&vel=congue&lectus=eget&in=semper&quam=rutrum&fringilla=nulla&rhoncus=nunc&mauris=purus&enim=phasellus&leo=in&rhoncus=felis&sed=donec&vestibulum=semper&sit=sapien&amet=a&cursus=libero&id=nam&turpis=dui&integer=proin&aliquet=leo&massa=odio&id=porttitor&lobortis=id&convallis=consequat&tortor=in&risus=consequat&dapibus=ut&augue=nulla&vel=sed&accumsan=accumsan&tellus=felis&nisi=ut&eu=at&orci=dolor&mauris=quis&lacinia=odio&sapien=consequat&quis=varius&libero=integer&nullam=ac&sit=leo&amet=pellentesque&turpis=ultrices&elementum=mattis&ligula=odio&vehicula=donec&consequat=vitae&morbi=nisi&a=nam&ipsum=ultrices&integer=libero&a=non&nibh=mattis&in=pulvinar&quis=nulla&justo=pede&maecenas=ullamcorper&rhoncus=augue&aliquam=a&lacus=suscipit&morbi=nulla&quis=elit&tortor=ac&id=nulla&nulla=sed&ultrices=vel&aliquet=enim&maecenas=sit&leo=amet&odio=nunc&condimentum=viverra',
      },
      {
        _id: '374bc5ed-222d-4c9c-896b-489a4a4640af',
        name: 'Rhesus monkey',
        type: 'application/pdf',
        url: 'https://goo.gl/pretium/iaculis/diam/erat.jpg?lacinia=felis&nisi=eu&venenatis=sapien&tristique=cursus&fusce=vestibulum&congue=proin&diam=eu&id=mi&ornare=nulla&imperdiet=ac&sapien=enim&urna=in&pretium=tempor&nisl=turpis&ut=nec&volutpat=euismod&sapien=scelerisque&arcu=quam&sed=turpis&augue=adipiscing&aliquam=lorem&erat=vitae&volutpat=mattis&in=nibh&congue=ligula&etiam=nec&justo=sem&etiam=duis&pretium=aliquam&iaculis=convallis&justo=nunc&in=proin&hac=at&habitasse=turpis&platea=a&dictumst=pede&etiam=posuere&faucibus=nonummy&cursus=integer&urna=non&ut=velit&tellus=donec&nulla=diam&ut=neque&erat=vestibulum&id=eget&mauris=vulputate&vulputate=ut&elementum=ultrices&nullam=vel&varius=augue&nulla=vestibulum&facilisi=ante&cras=ipsum&non=primis&velit=in&nec=faucibus&nisi=orci&vulputate=luctus&nonummy=et&maecenas=ultrices&tincidunt=posuere&lacus=cubilia&at=curae&velit=donec&vivamus=pharetra&vel=magna&nulla=vestibulum&eget=aliquet&eros=ultrices&elementum=erat&pellentesque=tortor&quisque=sollicitudin&porta=mi&volutpat=sit&erat=amet&quisque=lobortis&erat=sapien&eros=sapien&viverra=non&eget=mi&congue=integer&eget=ac&semper=neque&rutrum=duis&nulla=bibendum&nunc=morbi&purus=non&phasellus=quam&in=nec',
      },
    ],
  },
  {
    _id: '15c5d73b-0684-425c-86e5-46b4fbbe3bd9',
    user: {
      username: 'scorby9',
      avatar: {
        url: 'https://robohash.org/velitpossimusquia.png?size=50x50&set=set1',
      },
    },
    product: {
      _id: 'd33f2c3f-325b-436c-abb5-2e8180658fbe',
      texts: {
        title: 'Basil - Pesto Sauce',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/243x100.png/cc0000/ffffff',
        },
      },
    },
    created: 1623660949000,
    expires: 1621770899000,
    status: 'PROPOSED',
    isExpired: true,
    quotationNumber: '2467898911',
    fullfilled: 1640345096000,
    rejected: 1621585909000,
    updated: 1641576545000,
    country: {
      _id: 'a829a911-5b1f-402f-af9f-96bc5c6e3490',
      isoCode: 'JP',
      flagEmoji: 'Japan',
    },
    currency: {
      isoCode: 'JPY',
      isActive: true,
      _id: 'c56b0a7d-2565-45a2-8ae4-4216d10758ec',
    },
    logs: [
      {
        _id: '88d9b572-5efe-4319-8684-ae7ff574b44c',
        created: 1632949504000,
        level: 'Octinoxate',
        message: 'Vestibulum rutrum rutrum neque.',
        user: {
          _id: '459ae2de-3abe-4b0b-a008-69149dfa7ee3',
          username: 'vmcgaraghan0',
        },
        order: {
          _id: '6ef85deb-9365-423c-b329-c82911f8f679',
          orderNumber: '7606959404',
        },
      },
      {
        _id: '5f2b8bed-f81f-4643-a0f7-37b4c1791341',
        created: 1640101026000,
        level: 'Venlafaxine Hydrochloride',
        message: 'In hac habitasse platea dictumst.',
        user: {
          _id: '97c6a830-56da-41d2-a21a-712520cf5dd0',
          username: 'tlynes1',
        },
        order: {
          _id: 'f5a9a004-4ba1-4496-b336-8930fd2c9bbc',
          orderNumber: '6401979453',
        },
      },
      {
        _id: '78a2dad9-785c-4f7a-9fd6-3cdc15b46cb1',
        created: 1636988519000,
        level: 'FLUPHENAZINE HYDROCHLORIDE',
        message: 'Quisque ut erat.',
        user: {
          _id: 'cc6e60d7-8e1c-4490-847b-57ac23fbd02b',
          username: 'kblanko2',
        },
        order: {
          _id: 'ec5f47ca-5556-4007-a84a-c5ce32f0d153',
          orderNumber: '0297200445',
        },
      },
    ],
    configuration: {
      value: 'Champlin Group',
      compony: 'Realpoint',
      domain: 'latimes.com',
      TLD: 'gov',
    },
    documents: [
      {
        _id: '8efb97da-f0b6-4ca9-9876-df437a6d4a86',
        name: 'Sportive lemur',
        type: 'image/jpeg',
        url: 'https://reverbnation.com/non/mi.js?viverra=eget&diam=congue&vitae=eget&quam=semper&suspendisse=rutrum&potenti=nulla&nullam=nunc&porttitor=purus&lacus=phasellus&at=in&turpis=felis&donec=donec&posuere=semper&metus=sapien&vitae=a&ipsum=libero&aliquam=nam&non=dui&mauris=proin&morbi=leo&non=odio&lectus=porttitor&aliquam=id&sit=consequat&amet=in&diam=consequat&in=ut&magna=nulla&bibendum=sed&imperdiet=accumsan&nullam=felis&orci=ut&pede=at&venenatis=dolor&non=quis&sodales=odio&sed=consequat&tincidunt=varius&eu=integer&felis=ac&fusce=leo&posuere=pellentesque&felis=ultrices&sed=mattis&lacus=odio&morbi=donec&sem=vitae&mauris=nisi&laoreet=nam&ut=ultrices&rhoncus=libero&aliquet=non&pulvinar=mattis&sed=pulvinar&nisl=nulla&nunc=pede&rhoncus=ullamcorper&dui=augue&vel=a&sem=suscipit&sed=nulla&sagittis=elit&nam=ac&congue=nulla&risus=sed&semper=vel&porta=enim&volutpat=sit&quam=amet&pede=nunc&lobortis=viverra&ligula=dapibus&sit=nulla&amet=suscipit&eleifend=ligula&pede=in&libero=lacus&quis=curabitur&orci=at',
      },
    ],
  },
];

const QuotationDetailPage = () => {
  const { formatMessage } = useIntl();

  const { query } = useRouter();
  const { quotationId } = query;
  const { /* quotation, */ loading } = useQuotation({ quotationId });

  // TODO remove mock data
  const [quotationn] = quotationss.filter((item) => item._id === quotationId);

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs
        currentPageTitle={
          quotationn?.quotationNumber ? `#${quotationn?.quotationNumber}` : ''
        }
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'quotation_detail',
            defaultMessage: 'Quotation Detail',
          })}
        />
      </div>
      {/* TODO change mock props data */}
      {loading ? <Loading /> : <QuotationDetail quotation={quotationn} />}
    </div>
  );
};

export default QuotationDetailPage;
