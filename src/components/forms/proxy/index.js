import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Input, FieldError} from '../../elements';
import {themeEnum} from '../../../enums';
import validate from './validate';
import styles from './styles';

class ProxyForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  renderField = (props) => {
    const _styles = styles(this.props.theme);
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
      <View style={_styles.inputContainer}>
        <Input
          {...props}
          style={_styles.input}
          theme={theme}
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name} type={'second'}/>
      </View>
    );
  };

  render() {
    const {theme, context} = this.props;
    const _styles = styles(theme);

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <Field
          name="server"
          component={this.renderField}
          placeholder={context.t('Server')}
          autoCorrect={false}
          autoCapitalize={'none'}/>
        <Field
          name="proxy"
          component={this.renderField}
          placeholder={context.t('Proxy')}
          autoCorrect={false}
          autoCapitalize={'none'}/>
        <Field
          name="userName"
          component={this.renderField}
          placeholder={context.t('UserName')}
          autoCorrect={false}
          autoCapitalize={'none'}/>
        <Field
          name="password"
          component={this.renderField}
          placeholder={context.t('Password')}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={true}/>
      </KeyboardAvoidingView>
    );
  }
}

export default reduxForm({
  form: 'proxy',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(ProxyForm);
