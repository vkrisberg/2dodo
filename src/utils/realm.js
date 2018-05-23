import Realm from 'realm';
import CONFIG from '../config.js';

let _store = null;
let _realm = null;

const init = async function (store) {
  _store = store;
  _realm = await Realm.open(CONFIG.realmConfig)
    .then((realm) => {
      console.log('realm success', realm.path);
      return realm;
    })
    .catch((error) => {
      console.log('realm error', error);
    });
  return _realm;
};

const getInstance = () => {
  return _realm;
};

export default {
  init,
  getInstance,
};
