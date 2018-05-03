import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {i18nState} from 'redux-i18n';
import { reducer as formReducer } from 'redux-form';
import {navigationMiddleware} from '../utils';
import * as reducers from './reducers';

export default createStore(
  combineReducers({...reducers, i18nState, form: formReducer}),
  undefined,
  applyMiddleware(navigationMiddleware, thunkMiddleware, loggerMiddleware)
);
