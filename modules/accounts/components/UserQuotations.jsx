import Loading from '../../common/components/Loading';
import QuotationList from '../../quotation/components/QuotationList';
import useUserQuotations from '../../quotation/hooks/useUserQuotations';

const UserQuotations = ({ _id: userId }) => {
  const { quotations, loading } = useUserQuotations({ userId });
  const quotationss=
  [{
   "_id": "d2b44380-4935-484f-a8ee-f9d2da325822",
   "created": "4/19/2021",
   "expires": "3/29/2022",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/107x100.png/dddddd/000000"
       }
     },
     "texts": {
       "title": "Water - Spring 1.5lit"
     }
   },
   "status": "REQUESTED"
 }, {
   "_id": "62579a22-ff22-458a-b822-b5551032a61d",
   "created": "4/9/2021",
   "expires": "5/27/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/177x100.png/ff4444/ffffff"
       }
     },
     "texts": {
       "title": "Gelatine Leaves - Bulk"
     }
   },
   "status": "REQUESTED"
 }, {
   "_id": "ef16167c-5cd5-4503-94cb-2de9b33e67ee",
   "created": "10/6/2021",
   "expires": "2/25/2022",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/204x100.png/cc0000/ffffff"
       }
     },
     "texts": {
       "title": "Fish - Bones"
     }
   },
   "status": "PROCESSING"
 }, {
   "_id": "3b3b40b0-fec8-4518-a3e0-b020effb2f38",
   "created": "12/8/2021",
   "expires": "6/19/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/168x100.png/ff4444/ffffff"
       }
     },
     "texts": {
       "title": "Container - Foam Dixie 12 Oz"
     }
   },
   "status": "FULLFILLED"
 }, {
   "_id": "4004fc9b-472d-449d-9b56-27b9550366cd",
   "created": "3/13/2022",
   "expires": "2/22/2022",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/178x100.png/5fa2dd/ffffff"
       }
     },
     "texts": {
       "title": "Cheese - Feta"
     }
   },
   "status": "PROCESSING"
 }, {
   "_id": "000f0d6c-f0f4-4e7a-8832-9aa019f26a9e",
   "created": "4/11/2021",
   "expires": "9/26/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/100x100.png/cc0000/ffffff"
       }
     },
     "texts": {
       "title": "Cream - 35%"
     }
   },
   "status": "PROCESSING"
 }, {
   "_id": "5f1ae05b-5776-4140-ac77-897c9cbc2680",
   "created": "2/25/2022",
   "expires": "10/21/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/191x100.png/cc0000/ffffff"
       }
     },
     "texts": {
       "title": "Wine - Guy Sage Touraine"
     }
   },
   "status": "REQUESTED"
 }, {
   "_id": "6243d16c-5012-41b2-b77c-fa110d61f311",
   "created": "2/23/2022",
   "expires": "11/17/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/101x100.png/5fa2dd/ffffff"
       }
     },
     "texts": {
       "title": "Creme De Banane - Marie"
     }
   },
   "status": "PROCESSING"
 }, {
   "_id": "c348f1b8-216f-4dd7-8bda-fff592f1606f",
   "created": "8/8/2021",
   "expires": "11/18/2021",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/162x100.png/ff4444/ffffff"
       }
     },
     "texts": {
       "title": "Skirt - 29 Foot"
     }
   },
   "status": "FULLFILLED"
 }, {
   "_id": "2640d4b6-0743-4771-8f27-ba3ccaddc1d6",
   "created": "5/15/2021",
   "expires": "3/6/2022",
   "product": {
     "media": {
       "file": {
         "url": "http://dummyimage.com/184x100.png/cc0000/ffffff"
       }
     },
     "texts": {
       "title": "Pork - Ham, Virginia"
     }
   },
   "status": "PROPOSED"
 }]
  if (loading) return <Loading />;
  return <QuotationList quotations={quotationss}  showUser={false} />;
};

export default UserQuotations;
