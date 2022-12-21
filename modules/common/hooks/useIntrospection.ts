import { gql, useQuery } from '@apollo/client';

const introspectionQuery = gql`
  query IntrospectionQuery($typeName: String!) {
    __type(name: $typeName) {
      name
      kind
      fields {
        name
        type {
          name
          kind
          ofType {
            name
          }
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
                fields {
                  name
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                      fields {
                        name
                        type {
                          name
                          kind
                          ofType {
                            name
                            kind
                            # You can add more levels of nested fields here if needed
                          }
                        }
                      }
                    }
                  }
                }
              }
              fields {
                name
                type {
                  name
                  kind
                  ofType {
                    name
                    kind
                    fields {
                      name
                      type {
                        name
                        kind
                        ofType {
                          name
                          kind
                          fields {
                            name
                            type {
                              name
                              kind
                              ofType {
                                name
                                kind
                                # You can add more levels of nested fields here if needed
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function generateQuery(
  { __type: type },
  excludeType,
  fields = [],
  selectedFields = new Set(),
) {
  let query = '';

  if (type) {
    query += ` {`;
    (type.fields || [])?.forEach((field) => {
      if (!selectedFields.has(field.name)) {
        selectedFields.add(field.name);
        if (field.type.kind === 'OBJECT') {
          query += ` ${field.name}`;
          query += ` { ${generateQuery(
            { __type: field.type },

            excludeType,
            fields,
            selectedFields,
          )} }`;
        } else if (
          field.type.kind === 'NON_NULL' &&
          field.type.ofType.kind === 'OBJECT'
        ) {
          query += ` ${field.name}`;
          query += ` { ${generateQuery(
            field.type.ofType,

            excludeType,
            fields,
            selectedFields,
          )} }`;
        } else if (
          field.type.kind === 'LIST' &&
          field.type.ofType.kind === 'OBJECT'
        ) {
          query += ` ${field.name}`;
          query += `{ ${generateQuery(
            field.type.ofType,

            excludeType,
            fields,
            selectedFields,
          )} }`;
        } else if (
          field.type.kind === 'NON_NULL' &&
          field.type.ofType.kind === 'NON_NULL' &&
          field.type.ofType.ofType.kind === 'OBJECT'
        ) {
          query += ` ${field.name}`;
          query += `{ ${generateQuery(
            field.type.ofType.ofType,

            excludeType,
            fields,
            selectedFields,
          )}}`;
        } else {
          query += ` ${field.name}`;
        }
      }
    });
    query += ' }';
  }
  return query;
}

const useIntrospection = () => {
  const { data } = useQuery(introspectionQuery, {
    variables: {
      typeName: 'User',
    },
  });

  /* const { fields } = data?.__type; */
  if (data) console.log(generateQuery(data, 'User', []));
  /*   const flattenedFields = fields.flatMap((field) => {
    if (field.type.kind === 'OBJECT' && field.type.fields) {
      console.log(flattenFields(field.type.fields), 'aaaaaaaaaaaaaaa');
      return [field.name, ...flattenFields(field.type.fields)];
    }
    return field.name;
  }); */

  /* const nestedFields = fields.map((field) => {
    if (field.type.kind === 'OBJECT' && field.type.fields) {
      return {
        [field.name]: flattenFields(field.type.fields),
      };
    }
    return field.name;
  });
 */
  let usersQuery;

  if (data) usersQuery = generateQuery(data, 'User', []);
  console.log(usersQuery);
  const queryUsre = gql`
    query GetUser {
      users 
        ${usersQuery}
      
    }
  `;

  const { data: userData } = useQuery(queryUsre, {
    skip: !usersQuery,
  });
  console.log(userData);
};

export default useIntrospection;
