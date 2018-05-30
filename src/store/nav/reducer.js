import {MainStack} from '../../router';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

const navReducer = createNavigationReducer(MainStack);

export default navReducer;
