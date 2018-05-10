import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {accountActions} from '../../store/actions';
import {websocket} from '../../utils';
import {Title} from '../../components/elements';
import routeEnum from '../../enums/route-enum';
import chatIcon from '../login/img/chat.png';

import styles from './styles';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.handleTimeout = setTimeout(() => { this.props.navigation.navigate(routeEnum.Events); }, 2000);
    if (!this.props.account.username || !this.props.account.hashKey) {
      this.props.dispatch(accountActions.remind()).then((data) => {
        console.log('remind', this.props.account);
        this.wsConnect(this.props.account);
      });
    }
  }

  componentWillUnmount() {
    // clearInterval(this.handleTimeout);
  }

  wsConnect = (account) => {
    const ws = websocket.init(account.deviceId, account.username, account.hashKey);
    ws.onopen = () => {
      console.log('websocket connected');
    };
    ws.onerror = (error) => {
      console.log('websocket error', error);
    };
    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('websocket closed clear');
      } else {
        console.log('websocket failed');
      }
      console.log('code: ' + event.code + ' reason: ' + event.reason);
    };
    ws.onmessage = (event) => {
      console.log('websocket received', event.data);
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={chatIcon} />
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
