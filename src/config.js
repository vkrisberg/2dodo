import Schema from './schema';

export default {
  httpHost: 'api.2do.do',
  wsHost: 'api.2do.do/ws/',
  baseUrl: '/api',
  isSecure: true,
  storagePrefix: '@2dodo',
  realmConfig: {
    schema: Schema,
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
  },
};
