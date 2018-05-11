import React, {Component} from 'react';
import {AsyncStorage, View, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {accountActions} from '../../store/actions';
import {ws} from '../../utils';
import {Title} from '../../components/elements';
import {routeEnum, storageEnum} from '../../enums';
import chatIcon from '../login/img/chat.png';

import styles from './styles';
import CONFIG from '../../config';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.account.isAuth) {
      this.props.navigation.navigate(routeEnum.Main);
    } else {
      this.props.dispatch(accountActions.remind())
        .then(() => {
          this.wsConnect();
        }).catch(async () => {
          const skipEvents = await AsyncStorage.getItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`);
          if (skipEvents) {
            this.props.navigation.navigate(routeEnum.Login);
            return;
          }
          this.props.navigation.navigate(routeEnum.Events);
      });
    }
  }

  wsConnect = () => {
    const {deviceId, username, hashKey} = this.props.account;

    ws.init({
      deviceId,
      username,
      hashKey,
      navigation: this.props.navigation,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={chatIcon}/>
        <Title>2DODO</Title>
        <Text style={styles.text}>
          Do what you want
        </Text>
      </View>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Preload);
