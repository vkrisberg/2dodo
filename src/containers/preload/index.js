import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {accountActions} from '../../store/actions';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import {routeEnum, storageEnum} from '../../enums';

import styles from './styles';
import CONFIG from '../../config';
import {ws} from '../../utils';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {dispatch, navigation} = this.props;
    const {authorized, deviceId, user, keys} = this.props.account;

    if (authorized) {
      navigation.navigate(routeEnum.Main);
    } else {
      dispatch(accountActions.remind())
        .then(() => {
          dispatch(accountActions.login({navigation, deviceId, user, keys}))
            .then(() => {
              this.wsConnect();
            })
            .catch((error) => {
              console.log('login error', error);
            });
        })
        .catch(async () => {
          const skipEvents = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`);
          if (skipEvents) {
            navigation.navigate(routeEnum.Login);
            return;
          }
          navigation.navigate(routeEnum.Events);
        });
    }
  }

  wsConnect = () => {
    const {deviceId, user, keys} = this.props.account;

    ws.init({
      deviceId,
      username: user.username,
      hashKey: keys.hashKey,
      navigation: this.props.navigation,
    });
  };

  render() {
    return (
      <BackgroundContainer style={styles.container}>
        <Logo/>
        <Text style={styles.text}>
          Do what you want
        </Text>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Preload);
