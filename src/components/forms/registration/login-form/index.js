import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Button, Checkbox, Input, TextLabel, FieldError} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import validate from '../validate';
import styles from './styles';

class RegistrationLoginForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    errors: PropTypes.any,
    defaultServer: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
    errors: [],
  };

  state = {
    page: 0,
    checked: false,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidUpdate() {
    if (this.state.page !== this.props.page) {
      this.setState({page: this.props.page});
      this.props.change('page', this.props.page);
    }
  }

  toggleServerInput = (checked) => {
    this.setState({checked});
    if (!checked) {
      this.props.change('server', '');
    }
  };

  onSubmit = () => {
    if (!this.props.handleSubmit()) {
      this.props.untouch('email');
    }
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
          error={touched && error}/>,
        <FieldError theme={theme} errors={errors} path={props.input.name}/>
      </View>
    );
  };

  renderServerInput = (_styles) => {
    if (this.state.checked) {
      return (
        <Field
          name="server"
          component={this.renderField}
          placeholder={this.props.defaultServer}
          style={_styles.serverInput}
          autoCapitalize={'none'}
          autoCorrect={false}/>
      );
    }
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
                     style={_styles.title}>{context.t('Registration')}</TextLabel>
          <TextLabel theme={theme}
                     color={colors[theme].blackText}
                     textAlign={'center'}
                     style={_styles.description}>{context.t('RegistrationLoginDescription')}</TextLabel>
          <View style={_styles.inputContainer}>
            <Field
              name="login"
              component={this.renderField}
              placeholder={context.t('CreateLogin')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="password"
              component={this.renderField}
              placeholder={context.t('Password')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="repeatPassword"
              component={this.renderField}
              placeholder={context.t('RepeatPassword')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <View style={_styles.checkboxContainer}>
            <TextLabel theme={theme} color={colors[theme].blackText}>{context.t('UseSpecialServerParams')}</TextLabel>
            <Checkbox input={{value: this.state.checked, onChange: this.toggleServerInput}}/>
          </View>
          {this.renderServerInput(_styles)}
          <View style={_styles.buttonContainer}>
            <Button onPress={this.onSubmit}>{context.t('Continue')}</Button>
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
  validate,
})(RegistrationLoginForm);
