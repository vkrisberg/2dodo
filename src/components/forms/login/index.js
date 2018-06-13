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
    labels: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, labels} = this.props;

    return (
      <Container>
        <Field
          component={Input}
          name="login"
          textColor={colors.light.white}
          focusedColor={colors.light.white}
          borderColor={colors.light.blueInputBorder}
          placeholderColor={colors.light.bluePlaceholder}
          placeholder={labels.login}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={false}
        />
        <Field
          component={Input}
          name="password"
          secureTextEntry={true}
          textColor={colors.light.white}
          focusedColor={colors.light.white}
          borderColor={colors.light.blueInputBorder}
          placeholderColor={colors.light.bluePlaceholder}
          placeholder={labels.password}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={false}
        />
        <SecurityContainer>
          <SecurityText>{labels.security}</SecurityText>
          <SecurityLabel>{labels.createKey}</SecurityLabel>
          <Field
            component={Checkbox}
            name="createNewKey"
            color={colors.light.white}
          />
        </SecurityContainer>
        <Button color={colors.light.white} onPress={handleSubmit}>{labels.enter}</Button>
      </Container>
    );
  }
}


export default connect()(reduxForm({form: 'login'})(LoginForm));
