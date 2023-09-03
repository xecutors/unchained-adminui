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
        typesPrefix: 'I',
        fieldWrapperValue: 'T | Promise<T>',
        wrapFieldDefinitions: true,
        withHooks: false,
        withMutationFn: false,
        withRefetchFn: false,
        withResultType: false,
        withMutationOptionsType: false,
        addDocBlocks: false,
        documentMode: 'external',
        experimentalFragmentVariables: true,
        skipTypename: true,
        dedupeOperationSuffix: true,
        namingConvention: 'change-case-all#pascalCase',
        arrayInputCoercion: false,
        immutableTypes: true,
        mergeFragmentTypes: true,
      },
    },
  },
};

export default config;
