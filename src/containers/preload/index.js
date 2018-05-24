import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {accountActions} from '../../store/actions';
import Logo from '../../components/elements/logo';
import BackgroundContainer from '../background-container';
import {routeEnum, storageEnum} from '../../enums';
import {StyledText} from './styles';
import {ws} from '../../utils';
import CONFIG from '../../config';

class Preload extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({})
  };

  constructor(props) {
    super(props);

    ws.init({navigation: props.navigation});
  }

  componentDidMount() {
    const {dispatch, navigation} = this.props;
    const {authorized} = this.props.account;

    if (authorized) {
      navigation.navigate(routeEnum.Main);
    } else {
      dispatch(accountActions.remind())
        .then(() => {
          const {deviceId, user, keys} = this.props.account;
          dispatch(accountActions.login({navigation, deviceId, user, keys}))
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
            setTimeout(() => navigation.navigate(routeEnum.Login), 2000);
            return;
          }
          navigation.navigate(routeEnum.Events);
        });
    }
  }

  wsConnect = ({deviceId, user, keys}) => {
    ws.connect({
      deviceId,
      username: user.username,
      password: keys.hashKey,
    });
  };

  render() {
    return (
      <BackgroundContainer barHidden>
        <Logo/>
        <StyledText>
          Do what you want
        </StyledText>
      </BackgroundContainer>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Preload);
