import React, {Component} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Button, Input, TextLabel, Avatar} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import styles from './styles';
import ThemeButton from '../../../elements/theme-button';

class RegistrationSettingsForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    user: PropTypes.object,
    initialValues: PropTypes.object,
    onAvatar: PropTypes.func,
    onTheme: PropTypes.func,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  onThemeChange(theme) {
    return () => {
      this.props.onTheme && this.props.onTheme(theme);
    };
  }

  render() {
    const {theme, context, user} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.wrapper} behavior="position" enabled>
          <TextLabel theme={theme}
                     size={28}
                     weight={weights.bold}
                     textAlign={'center'}
                     style={_styles.title}>{context.t('Settings')}</TextLabel>
          <TextLabel theme={theme}
                     color={colors[theme].blackText}
                     textAlign={'center'}
                     style={_styles.description}>{context.t('RegistrationSettingsDescription')}</TextLabel>
          <View style={_styles.avatarContainer}>
            <Avatar source={user.avatar} onPress={this.props.onAvatar}/>
            <TextLabel style={_styles.avatarLabel}
                       color={colors[theme].blueDarker}>{context.t('SetYourPhoto')}</TextLabel>
          </View>
          <View style={_styles.themeContainer}>
            <ThemeButton context={context}
                         theme={theme}
                         type={themeEnum.light}
                         onPress={this.onThemeChange(themeEnum.light)}/>
            <ThemeButton context={context}
                         theme={theme}
                         type={themeEnum.night}
                         onPress={this.onThemeChange(themeEnum.night)}/>
          </View>
          <View style={_styles.inputContainer}>
            <Field
              name="firstName"
              component={Input}
              placeholder={context.t('Name')}
              autoCorrect={false}/>
            <Field
              name="secondName"
              component={Input}
              placeholder={context.t('SecondName')}
              autoCorrect={false}/>
          </View>
          <View style={_styles.buttonContainer}>
            <TextLabel theme={theme}
                       color={colors[theme].blackText}
                       textAlign={'center'}>{context.t('GetAccessToPushNotifications')}</TextLabel>
            <Button color="black" style={_styles.button} onPress={this.props.handleSubmit}>{context.t('GoToApp')}</Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RegistrationSettingsForm);
