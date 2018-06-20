import Schema from './schema';

export default {
  hostname: 'api.2do.do',
  httpHost: 'api.2do.do',
  wsHost: 'api.2do.do/ws/',
  baseUrl: '/api',
  isSecure: true,
  storagePrefix: '@2dodo',
  maxHashCount: 10,
  realm: {
    schema: Schema,
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  },
  message: {
    protocol: '1.0.0',
  },
};
