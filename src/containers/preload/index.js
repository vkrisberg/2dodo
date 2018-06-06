import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {BackgroundLayout} from '../../components/layouts';
import {accountActions} from '../../store/actions';
import Logo from '../../components/elements/logo';
import {routeEnum, storageEnum} from '../../enums';
import {StyledText} from './styles';
import {services} from '../../utils';
import CONFIG from '../../config';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
    const {navigation} = props;
    services.websocketInit({navigation});
  }

  componentDidMount() {
    const {dispatch, navigation} = this.props;
    const {authorized} = this.props.account;

    if (authorized) {
      navigation.replace(routeEnum.Messages);
    } else {
      dispatch(accountActions.remind())
        .then(() => {
          const {deviceId, user, keys} = this.props.account;
          dispatch(accountActions.login({deviceId, user, keys}))
            .then(() => {
              this.wsConnect({deviceId, user, keys});
            })
            .catch((error) => {
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

  wsConnect = ({deviceId, user, keys}) => {
    services.websocketConnect({
      deviceId,
      username: user.username,
      password: keys.hashKey,
    });
  };

  render() {
    return (
      <BackgroundLayout barHidden>
        <Logo/>
        <StyledText>
          Do what you want
        </StyledText>
      </BackgroundLayout>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Preload);
