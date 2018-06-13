import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Button, Checkbox, Input, TextLabel} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import styles from './styles';

class RegistrationSettingsForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  state = {
    checked: false,
  };

  render() {
    const {theme, context} = this.props;
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
          <View style={_styles.inputContainer}>
            <Field
              name="login"
              component={Input}
              placeholder={context.t('CreateLogin')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="password"
              component={Input}
              placeholder={context.t('Password')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="repeatPassword"
              component={Input}
              placeholder={context.t('RepeatPassword')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <View style={_styles.buttonContainer}>
            <Button color="black" onPress={this.props.handleSubmit}>{context.t('Continue')}</Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(RegistrationSettingsForm);
