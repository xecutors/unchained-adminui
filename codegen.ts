import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4010/graphql',
  documents: 'modules/**/*.{ts,tsx}',
  generates: {
    'gql/types.ts': {
      preset: 'near-operation-file',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],

      config: {
        withResultType: true,
        withHooks: true,
        typesPrefix: 'I',
        fieldWrapperValue: 'T | Promise<T>',
        wrapFieldDefinitions: true,
      },
    },
  },
};

export default config;
