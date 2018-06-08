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
          textColor="white"
          component={Input}
          name="login"
          placeholder={labels.login}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={false}
        />
        <Field
          textColor="white"
          component={Input}
          name="password"
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
            color={colors.white}
          />
        </SecurityContainer>
        <Button onPress={handleSubmit}>{labels.enter}</Button>
      </Container>
    );
  }
}


export default connect()(reduxForm({form: 'login'})(LoginForm));
