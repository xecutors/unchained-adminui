import hasOperationName from './hasOperationName';

const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};

export default aliasMutation;
