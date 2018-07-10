import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel, Button} from '../../../elements';
import MarkIcon from '../../../icons/mark-icon';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import styles from '../styles';

class SuccessMessage extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    email: PropTypes.string,
    handleToLogin: PropTypes.func,
    lng: PropTypes.string,
  };

  static defaultProps = {
    theme: themeEnum.light,
    handleToLogin: () => {
    },
  };

  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      time: 180000,
    };
  }

  componentDidMount() {
    this._countDown();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleToLogin = () => {
    this.props.handleToLogin();
  };

  _countDown = () => {
    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState((prevState) => ({
          time: prevState.time - 1000,
        }));
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  };

  render() {
    const {theme, context, email, lng} = this.props;
    const _styles = styles(theme);
    const minutes = new Date(this.state.time).getMinutes();
    const seconds = new Date(this.state.time).getSeconds();

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.wrapper} behavior="position" enabled>
          <View style={_styles.topBlock}>
            <View style={_styles.iconContainer}>
              <MarkIcon color={colors[theme].white}/>
            </View>
          </View>
          <TextLabel
            theme={theme}
            size={28}
            weight={weights.bold}
            textAlign={'center'}
            style={_styles.successTitle}
          >
            {context.t('SuccessForgotPass')}
          </TextLabel>
          <TextLabel
            theme={theme}
            color={colors[theme].blackText}
            textAlign={'center'}
            style={_styles.successDescription}
          >
            {context.t('SuccessForgotPassDescription')}
            {email}
          </TextLabel>
          <View style={[_styles.buttonContainer, {marginTop: 22}]}>
            <Button onPress={this.handleToLogin}>{context.t('Login')}</Button>
          </View>
          <View style={_styles.bottomBlock}>
            <TextLabel
              theme={theme}
              color={colors[theme].grayDarker}
              textAlign={'center'}
              style={_styles.subDescription}
            >
              {context.t('SuccessForgotPassSubDescription')}
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
              &nbsp;
              {`${lng === 'en' ? 'minutes' : 'минуты'}`}
            </TextLabel>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default SuccessMessage;
