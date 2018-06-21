import {get, map, filter, uniqBy} from 'lodash';

import {apiGroup, apiServer} from '../../api';
import {services, wsMessage} from '../../utils';
import {dbEnum, messageEnum} from '../../enums';

export const types = {
  LOAD: Symbol('LOAD'),
  LOAD_SUCCESS: Symbol('LOAD_SUCCESS'),
  LOAD_FAILURE: Symbol('LOAD_FAILURE'),

  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),

  RESEND: Symbol('RESEND'),
  RESEND_SUCCESS: Symbol('RESEND_SUCCESS'),
  RESEND_FAILURE: Symbol('RESEND_FAILURE'),

  DELETE: Symbol('DELETE'),
  DELETE_SUCCESS: Symbol('DELETE_SUCCESS'),
  DELETE_FAILURE: Symbol('DELETE_FAILURE'),

  RECEIVE_MESSAGE_SUCCESS: Symbol('RECEIVE_MESSAGE_SUCCESS'),
  RECEIVE_MESSAGE_FAILURE: Symbol('RECEIVE_MESSAGE_FAILURE'),
};

export default {

  loadList: (groupId = '', filter = '', sort = 'dateCreate', descending = false) => {
    return async dispatch => {
      dispatch({type: types.LOAD});
      try {
        const realm = services.getRealm();
        let messages = realm.objects(dbEnum.GroupMessage)
          .sorted(sort, descending);

        // TODO - remove after tests
        // await realm.write(() => {
        //   realm.delete(messages);
        // });

        if (groupId) {
          messages = messages.filtered(`groupId = '${groupId}'`);
        }
        if (filter) {
          messages = messages.filtered(filter);
        }
        console.log('group messages loaded', messages.length);
        const payload = messages.map((item) => {
          return {...item};
        });
        dispatch({type: types.LOAD_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.LOAD_FAILURE, error: e});
        throw e;
      }
    };
  },

  send: ({groupId, link, type = messageEnum.text, data = ''}) => {
    return async (dispatch, getState) => {
      dispatch({type: types.SEND});
      try {
        const realm = services.getRealm();
        const {account} = getState();
        const dateNow = new Date();
        const group = realm.objectForPrimaryKey(dbEnum.Group, groupId);
        if (!group) {
          throw new Error(`group '${groupId}' is not found`);
        }
        const sendData = {
          link,
          message: JSON.stringify({type, data, dateSend: wsMessage.dateToRfc(dateNow)}),
        };
        const messageData = {
          id: wsMessage.generateUuid(),
          groupId,
          groupLink: group.link,
          groupType: group.type,
          type,
          username: account.user.username,
          text: data,
          isOwn: true,
          dateSend: dateNow,
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let groupMessage = {};
        await realm.write(() => {
          groupMessage = realm.create(dbEnum.GroupMessage, messageData, false);
        });
        const payload = {...groupMessage};
        // console.log('group message created', groupMessage);
        await apiGroup.sendGroupMessage(sendData);
        dispatch({type: types.SEND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.SEND_FAILURE, error: e});
        throw e;
      }
    };
  },

  resend: (id) => {
    return async dispatch => {
      dispatch({type: types.RESEND});
      try {
        const realm = services.getRealm();
        const groupMessage = realm.objectForPrimaryKey(dbEnum.GroupMessage, id);
        if (!groupMessage) {
          throw new Error(`group message '${id}' is not found`);
        }
        const payload = {...groupMessage};
        const sendData = {
          link: groupMessage.groupLink,
          message: JSON.stringify({
            link: groupMessage.groupLink,
            type: groupMessage.type,
            data: groupMessage.text,
            dateSend: groupMessage.dateSend,
          }),
        };
        await apiGroup.sendGroupMessage(sendData);
        // console.log('group message resend', payload);
        dispatch({type: types.RESEND_SUCCESS, payload});
        return payload;
      } catch (e) {
        dispatch({type: types.RESEND_FAILURE, error: e});
        throw e;
      }
    };
  },

  delete: (id) => {
    return async dispatch => {
      dispatch({type: types.DELETE});
      try {
        const realm = services.getRealm();
        const groupMessage = realm.objectForPrimaryKey(dbEnum.GroupMessage, id);
        if (!groupMessage) {
          throw new Error('delete failed: group message is not found');
        }
        await realm.write(() => {
          realm.delete(groupMessage);
        });
        // console.log('group message deleted', id);
        dispatch({type: types.DELETE_SUCCESS, payload: id});
        return true;
      } catch (e) {
        dispatch({type: types.DELETE_FAILURE, error: e});
        throw e;
      }
    };
  },

  receiveMessage: (message) => {
    return async (dispatch, getState) => {
      const realm = services.getRealm();
      try {
        // send delivery report
        const msgEncryptTime =  get(message, 'encrypt_time', null);
        await apiServer.deliveryReport(msgEncryptTime);

        const {account} = getState();
        const dateNow = new Date();
        let data = get(message, 'data', null);
        if (!data) {
          throw new Error('data is null');
        }
        if (!data.link) {
          throw new Error('data.link is null');
        }
        const error = get(message, 'error', null);
        if (error) {
          throw new Error(error);
        }
        const dataMessage = JSON.parse(data.message);

        const groups = realm.objects(dbEnum.Group).filtered(`link = '${data.link}'`);
        if (!groups || !groups.length) {
          throw new Error(`group link '${data.link}' is not found`);
        }
        if (groups.length > 1) {
          throw new Error(`more than one group with link '${data.link}' found`);
        }

        const group = groups[0];

        const messageData = {
          id: wsMessage.generateUuid(),
          groupId: group.id,
          groupLink: group.link,
          groupType: group.type,
          type: dataMessage.type || messageEnum.text,
          username: wsMessage.getUsername(message.from),
          from: message.from,
          text: dataMessage.data,
          isOwn: false,
          dateSend: wsMessage.rfcToDate(dataMessage.dateSend),
          dateCreate: dateNow,
          dateUpdate: dateNow,
        };
        let groupMessage = {};
        await realm.write(() => {
          groupMessage = realm.create(dbEnum.GroupMessage, messageData, false);
        });
        const payload = {...groupMessage};
        // console.log('group message received', payload);
        dispatch({type: types.RECEIVE_MESSAGE_SUCCESS, payload});
        return payload;
      } catch (e) {
        console.log('group message received error', e);
        dispatch({type: types.RECEIVE_MESSAGE_FAILURE, error: e});
        throw e;
      }
    };
  },
};
