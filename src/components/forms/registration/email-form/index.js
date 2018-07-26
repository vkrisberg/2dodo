import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {TextLabel, Input, Button, Checkbox, ButtonSkip, FieldError} from '../../../elements';
import {themeEnum, phonePrefixEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import validate from '../validate';
import styles from './styles';

class RegistrationEmailForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
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
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name}/>
      </View>
    );
  };

  renderPhonePrefix = (theme, _styles) => {
    return (
      <View style={_styles.phonePrefixContainer}>
        <TextLabel theme={theme}
                   color={colors[theme].blackText}>RUS   {phonePrefixEnum.rus}</TextLabel>
        <TextLabel theme={theme}
                   color={colors[theme].grayPlaceholder} style={_styles.phonePrefixPipe}>|</TextLabel>
      </View>
    );
  };

  render() {
    const {theme, context, disabled} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.wrapper} behavior="position" enabled>
          <TextLabel theme={theme}
                     size={28}
                     weight={weights.bold}
                     textAlign={'center'}
                     style={_styles.title}>{context.t('Registration')}</TextLabel>
          <TextLabel theme={theme}
                     color={colors[theme].blackText}
                     textAlign={'center'}
                     style={_styles.description}>{context.t('RegistrationEmailDescription')}</TextLabel>
          <View style={_styles.inputContainer}>
            <Field
              name="email"
              component={this.renderField}
              placeholder={context.t('Email')}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <View>
              {this.renderPhonePrefix(theme, _styles)}
              <Field
                name="phone"
                component={this.renderField}
                placeholder={context.t('Phone')}
                style={_styles.phoneInput}
                keyboardType={'numeric'}
                autoCapitalize={'none'}
                autoCorrect={false}/>
            </View>
          </View>
          {/*<View style={_styles.checkboxContainer}>*/}
            {/*<TextLabel theme={theme} color={colors[theme].grayDarker}>{context.t('ForBestSecurity')}</TextLabel>*/}
            {/*<TextLabel theme={theme} color={colors[theme].blackText}>{context.t('CreateNewKey')}</TextLabel>*/}
            {/*<Checkbox input={{value: true}} disabled={true}/>*/}
          {/*</View>*/}
          <View style={_styles.buttonContainer}>
            <Button disabled={disabled} onPress={this.props.handleSubmit}>{context.t('Done')}</Button>
          </View>
        </KeyboardAvoidingView>
        {/*<View style={_styles.skipContainer}>*/}
          {/*<ButtonSkip*/}
            {/*// disabled={disabled}*/}
            {/*disabled={true}*/}
            {/*onSkip={this.props.handleSubmit}*/}
            {/*color={colors[theme].grayDarker}*/}
            {/*marginBottom={15}>*/}
            {/*{context.t('SkipThisStep')}*/}
          {/*</ButtonSkip>*/}
        {/*</View>*/}
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(RegistrationEmailForm);
