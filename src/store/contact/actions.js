import apiContact from '../../api/contact';
import {realm} from '../../utils';
import {dbEnum} from '../../enums';

export const types = {
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAILURE: 'LOAD_FAILURE',

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAILURE: 'CREATE_FAILURE',

  UPDATE: 'UPDATE',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_FAILURE',

  DELETE: 'DELETE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE',

  UPDATE_PUBKEY: 'UPDATE_PUBKEY',
  UPDATE_PUBKEY_SUCCESS: 'UPDATE_PUBKEY_SUCCESS',
  UPDATE_PUBKEY_FAILURE: 'UPDATE_PUBKEY_FAILURE',
};

const _realm = realm.getInstance();

export default {

  load: (filter = '', sort = 'username', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const contacts = _realm.objects(dbEnum.Contact)
          .sorted(sort, descending);
        if (filter) {
          contacts.filtered(filter);
        }
        const payload = contacts.length ? [...contacts] : [];
        console.log('contacts', payload);
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  create: (data) => {
    return async dispatch => {
      dispatch({type: types.CREATE});
      try {
        data.dateCreate = new Date();
        data.dateUpdate = data.dateCreate;
        await _realm.write(() => {
          _realm.create(dbEnum.Contact, data, true);
        });
        const contact = _realm.objectForPrimaryKey(dbEnum.Contact, data.username);
        const payload = {...contact};
        console.log('contact', payload);
        apiContact.getOpenKey([data.username]);
        dispatch({type: types.CREATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.CREATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  update: (data) => {
    return async dispatch => {
      dispatch({type: types.UPDATE});
      try {
        data.dateUpdate = new Date();
        await _realm.write(() => {
          _realm.create(dbEnum.Contact, data, true);
        });
        const contact = _realm.objectForPrimaryKey(dbEnum.Contact, data.username);
        const payload = {...contact};
        console.log('contact', payload);
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (username) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const contact = _realm.objectForPrimaryKey(dbEnum.Contact, username);
        if (!contact) {
          throw new Error('delete failed: contact is not found');
        }
        await _realm.delete(contact);
        dispatch({type: types.DELETE_SUCCESS, payload: username});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  updatePublicKey: (data) => {
    return async dispatch => {
      dispatch({type: types.UPDATE_PUBKEY});
      try {
        if (data.error) {
          throw new Error(data.error);
        }

        const contacts = [];
        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[i];

          // TODO - remove after fixing on server
          item.name += '@api.2do.do';

          const contact = _realm.objectForPrimaryKey(dbEnum.Contact, item.name);
          if (contact) {
            await _realm.write(() => {
              contact.dateUpdate = new Date();
              contact.publicKey = item.open_key;
            });
            console.log('CONTACT UPDATED', contact.username);
            contacts.push({...contact});
          }
        }
        dispatch({type: types.UPDATE_PUBKEY_SUCCESS, payload: contacts});
        return true;
      } catch (e) {
        dispatch({type: types.UPDATE_PUBKEY_FAILURE, error: e});
        throw e;
      }
    };
  },
};
