import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {TextLabel, Input, Button, FieldError} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import styles from '../styles';
import validate from '../validate';

class ResetPasswordEnterKeyForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    theme: themeEnum.light,
    disabled: false,
  };

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
          error={touched && error}
          errorColor={colors[theme].redLight}/>
        <FieldError theme={theme} errors={errors} path={props.input.name} textStyle={{color: colors[theme].redLight, textAlign: 'center'}}/>
      </View>
    );
  };

  render() {
    const {theme, context, disabled} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.wrapper} behavior="position" enabled>
          <TextLabel
            theme={theme}
            size={28}
            weight={weights.bold}
            textAlign={'center'}
            style={_styles.title}
          >
            {context.t('EnterKey')}
          </TextLabel>
          <View style={_styles.textContainer}>
            <TextLabel
              theme={theme}
              color={colors[theme].blackText}
              textAlign={'center'}
              style={_styles.description}
            >
              {context.t('EnterKeyDescription')}
            </TextLabel>
          </View>
          <View style={_styles.inputContainer}>
            <Field
              name="token"
              component={this.renderField}
              placeholder={context.t('EnterKey')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="login"
              component={this.renderField}
              placeholder={context.t('UserName')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="password"
              component={this.renderField}
              placeholder={context.t('NewPassword')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <View style={_styles.buttonContainer}>
            <Button disabled={disabled} onPress={this.props.handleSubmit}>{context.t('Continue')}</Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default reduxForm({
  form: 'resetPasswordEnterKeyForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate
})(ResetPasswordEnterKeyForm);
