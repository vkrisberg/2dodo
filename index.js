import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'es6-symbol/implement';

import './shim';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
