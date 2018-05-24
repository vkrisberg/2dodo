import Realm from 'realm';

let _realm = null;
let _config = null;
let _store = null;

const init = async function (config = _config, store = _store) {
  _config = config;
  _store = store;
  _realm = await Realm.open(config)
    .then((realm) => {
      console.log('realm success', realm.path);
      return realm;
    })
    .catch((error) => {
      console.log('realm error', error);
    });
  return _realm;
};

const getInstance = function () {
  return _realm;
};

export default {
  init,
  getInstance,
};
