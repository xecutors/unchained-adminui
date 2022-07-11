import hasOperationName from './hasOperationName';

export const aliasQuery = (req, alias) => {
  req.alias = `gql${alias}Query`;
};

export const fullAliasName = (alias) => {
  return `@gql${alias}Query`;
};

export default { aliasQuery, fullAliasName };
