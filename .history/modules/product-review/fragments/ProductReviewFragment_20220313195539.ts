import { gql } from '@apollo/client';

// const ProductReviewFragment = gql`
//    fragment ProductReviewFragment on ProductReview {
//     _id
//     created
//     updated
//     deleted
//     author {
//       _id
//       username
//       isGuest
//       avatar {
//         _id

//         url
//       }
//     }
//     product {
//       _id
//       texts {
//         _id
//         title
//         subtitle
//       }
//       media {
//         _id
//         file {
//           _id
//           url
//         }
//       }
//     }
//     rating
//     title
//     upVote: voteCount(type: UPVOTE)
//     downVote: voteCount(type: DOWNVOTE)
//     voteReport: voteCount(type: REPORT)
//   }
// `;
const ProductReview = 
[ {
  id: 1,
  author: "John",
  title: "Doe",
  rating:'23',
  // "email": "johndoe@abc.com",
  // "gender": "Male",
  // "status": "Terminated"
};
]



export default ProductReview;
