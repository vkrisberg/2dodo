import React, {Component} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Button, Input, TextLabel, Avatar, ButtonTheme, FieldError} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import {validation} from '../../../../utils';
import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (values.firstName && !validation.nameRegex.test(values.firstName)) {
    errors.firstName = 'NameRegexpError';
  }

  if (values.secondName && !validation.nameRegex.test(values.secondName)) {
    errors.secondName = 'NameRegexpError';
  }

  return errors;
};

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

  renderField = (props) => {
    const {meta: {touched, error}} = props;
    const {theme, context} = this.props;
    const errors = [];

    if (touched && error) {
      errors.push({
        path: props.input.name,
        code: error,
        message: context.t(error),
      });
    }

    return (
      <View>
        <Input
          {...props}
          theme={theme}
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name}/>
      </View>
    );
  };

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
            <ButtonTheme context={context}
                         theme={theme}
                         type={themeEnum.light}
                         onPress={this.onThemeChange(themeEnum.light)}/>
            <ButtonTheme context={context}
                         theme={theme}
                         type={themeEnum.night}
                         onPress={this.onThemeChange(themeEnum.night)}/>
          </View>
          <View style={_styles.inputContainer}>
            <Field
              name="firstName"
              component={this.renderField}
              placeholder={context.t('Name')}
              autoCorrect={false}/>
            <Field
              name="secondName"
              component={this.renderField}
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
  form: 'settings',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(RegistrationSettingsForm);
