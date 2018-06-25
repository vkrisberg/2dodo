import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {BackgroundLayout} from '../../components/layouts';
import {accountActions} from '../../store/actions';
import Logo from '../../components/elements/logo';
import {routeEnum, storageEnum} from '../../enums';
import {services} from '../../utils';
import CONFIG from '../../config';
import styles from './styles';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
    services.navigationInit(props.navigation);
  }

  componentDidMount() {
    const {dispatch, navigation} = this.props;
    const {authorized} = this.props.account;

    if (authorized) {
      navigation.replace(routeEnum.Messages);
    } else {
      dispatch(accountActions.remind())
        .then((data) => {
          const {deviceId, hostname, user, keys} = this.props.account;
          const password = data.password;
          dispatch(accountActions.connect({deviceId, hostname, user, keys, password})).catch((error) => {
            console.log('login error', error);
          });
        })
        .catch(async () => {
          const skipEvents = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`);
          if (skipEvents) {
            setTimeout(() => navigation.replace(routeEnum.Login), 2000);
            return;
          }
          navigation.replace(routeEnum.Events);
        });
    }
  }

  render() {
    return (
      <BackgroundLayout style={styles.container} background="preload" barHidden={true}>
        <Logo/>
        <Text style={styles.text}>Do what you want</Text>
      </BackgroundLayout>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Preload);
