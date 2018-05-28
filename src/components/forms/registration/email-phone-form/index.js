import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import {Title, Input, Button} from '../../../elements';
import {
  Description,
  StyledTitle,
  DescriptionWrapper,
  Container
} from './styles';

class EmailPhoneForm extends Component {

  static propTypes = {
    previousPage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <Container>
        <Title style={StyledTitle}>Registration</Title>
        <DescriptionWrapper>
          <Description>
            Phone or mail is required to restore access to your account
          </Description>
        </DescriptionWrapper>
        <Field
          focusedColor="#7bb2ff"
          component={Input}
          name="email"
          placeholder="Email"
        />
        <Field
          focusedColor="#7bb2ff"
          name="firstName"
          component={Input}
          placeholder="Name"
        />
        <Field
          focusedColor="#7bb2ff"
          name="secondName"
          component={Input}
          placeholder="Second Name"
        />
        <Button style={{marginTop: 10}} color="black" onPress={handleSubmit}>Done</Button>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmailPhoneForm);
