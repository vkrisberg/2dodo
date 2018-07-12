import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import {Input, Button, Checkbox} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

class LoginForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    errors: PropTypes.object,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, context, errors, disabled, theme} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <Field
          component={Input}
          name="login"
          color={colors.light.white}
          focusedColor={colors.light.white}
          borderColor={colors.light.blueInputBorder}
          placeholderColor={colors.light.bluePlaceholder}
          placeholder={context.t('Login')}
          error={errors && errors.login}
          errorColor={colors.light.redInputBorder}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={false}
        />
        <Field
          component={Input}
          name="password"
          secureTextEntry={true}
          color={colors.light.white}
          focusedColor={colors.light.white}
          borderColor={colors.light.blueInputBorder}
          placeholderColor={colors.light.bluePlaceholder}
          placeholder={context.t('Password')}
          error={errors && errors.password}
          errorColor={colors.light.redInputBorder}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={false}
        />
        <View style={_styles.securityContainer}>
          <Text style={[_styles.text, _styles.securityText]}>{context.t('ForBestSecurity')}</Text>
          <Text style={_styles.text}>{context.t('CreateNewKey')}</Text>
          <Field
            component={Checkbox}
            name="createNewKey"
            color={colors.light.white}
          />
        </View>
        <Button color={colors.light.loginButtonText}
                borderColor={colors.light.white}
                bgColor={colors.light.white}
                disabled={disabled}
                onPress={handleSubmit}>{context.t('Enter')}</Button>
      </View>
    );
  }
}


export default connect()(reduxForm({
  form: 'login',
})(LoginForm));
