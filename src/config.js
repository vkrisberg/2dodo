import Schema from './schema';

export default {
  httpHost: 'api.2do.do',
  wsHost: 'api.2do.do/ws/',
  baseUrl: '/api',
  isSecure: true,
  storagePrefix: '@2dodo',
  realm: {
    schema: Schema,
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  },
  message: {
    protocol: '1.0.0',
  },
};
