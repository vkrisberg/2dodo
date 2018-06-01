import { AppRegistry } from 'react-native';
import 'es6-symbol/implement';

import './shim';
import App from './src/App';

AppRegistry.registerComponent('tododo', () => App);
