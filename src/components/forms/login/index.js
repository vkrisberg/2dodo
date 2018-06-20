import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Input, Button, Checkbox} from '../../elements';
import {
  Container,
  SecurityContainer,
  SecurityText,
  SecurityLabel,
} from './styles';
import {colors} from '../../../styles';

class LoginForm extends Component {

  static propTypes = {
    context: PropTypes.object,
    errors: PropTypes.object,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, context, errors} = this.props;

    return (
      <Container>
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
        <SecurityContainer>
          <SecurityText>{context.t('ForBestSecurity')}</SecurityText>
          <SecurityLabel>{context.t('CreateNewKey')}</SecurityLabel>
          <Field
            component={Checkbox}
            name="createNewKey"
            color={colors.light.white}
          />
        </SecurityContainer>
        <Button color={colors.light.loginButtonText}
                borderColor={colors.light.white}
                bgColor={colors.light.white}
                onPress={handleSubmit}>{context.t('Enter')}</Button>
      </Container>
    );
  }
}


export default connect()(reduxForm({
  form: 'login',
})(LoginForm));
