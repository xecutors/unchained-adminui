import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4010/graphql',
  documents: 'modules/**/*.{ts,tsx}',
  generates: {
    'gql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],

      config: {        
        withHooks: true,
        typesPrefix: 'I',
        fieldWrapperValue: 'T | Promise<T>',
        wrapFieldDefinitions: true,
      },
    },
  },
};

export default config;
