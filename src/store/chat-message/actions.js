import apiContact from '../../api/contact';
import {services} from '../../utils';
import {dbEnum} from '../../enums';

export const types = {
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAILURE: 'LOAD_FAILURE',

  LOAD_ONE: 'LOAD_ONE',
  LOAD_ONE_SUCCESS: 'LOAD_ONE_SUCCESS',
  LOAD_ONE_FAILURE: 'LOAD_ONE_FAILURE',

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAILURE: 'CREATE_FAILURE',

  UPDATE: 'UPDATE',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_FAILURE',
};

export default {

  loadList: (filter = '', sort = 'username', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let contacts = realm.objects(dbEnum.Contact)
          .sorted(sort, descending);
        if (filter) {
          contacts = contacts.filtered(filter);
        }
        // console.log('contacts loaded', contacts.length);
        const payload = [...contacts];
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  loadOne: (username) => {
    return async dispatch => {
      dispatch({type: types.LOAD_ONE});
      try {
        const realm = services.getRealm();
        const contact = realm.objectForPrimaryKey(dbEnum.Contact, username);
        // console.log('contact loaded', contact);
        const payload = {...contact};
        dispatch({type: types.LOAD_ONE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_ONE_FAILURE, error: e});
        throw e;
      }
    };
  },

  create: (data) => {
    return async dispatch => {
      dispatch({type: types.CREATE});
      try {
        const realm = services.getRealm();
        data.dateCreate = new Date();
        data.dateUpdate = data.dateCreate;
        await realm.write(() => {
          realm.create(dbEnum.Contact, data, true);
        });
        const contact = realm.objectForPrimaryKey(dbEnum.Contact, data.username);
        const payload = {...contact};
        // console.log('contact created', contact);
        apiContact.getOpenKey([payload.username]);
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
        const realm = services.getRealm();
        data.dateUpdate = new Date();
        await realm.write(() => {
          realm.create(dbEnum.Contact, data, true);
        });
        const contact = realm.objectForPrimaryKey(dbEnum.Contact, data.username);
        const payload = {...contact};
        // console.log('contact updated', contact);
        dispatch({type: types.UPDATE_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE, error: e});
        throw e;
      }
    };
  },
};
