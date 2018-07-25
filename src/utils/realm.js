import Realm from 'realm';

const init = async function (config) {
  return Realm.open(config)
    .then((realm) => {
      console.log('realm success', realm.path);
      return realm;
    })
    .catch((error) => {
      console.log('realm error', error);
    });
};

export default {
  init,
};
