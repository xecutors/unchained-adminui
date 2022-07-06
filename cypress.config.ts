import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 4000,
  retries: {
    runMode: 3,
    openMode: 2,
  },
  e2e: {
    defaultCommandTimeout: 4000,
    projectId: 'jo7evx',
    baseUrl: 'http://localhost:3000',
    retries: {
      openMode: 2,
      runMode: 3,
    },
  },
});
