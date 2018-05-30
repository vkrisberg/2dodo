import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Title from '../../../elements/title';
import Input from '../../../elements/input';
import Button from '../../../elements/button';
import Checkbox from '../../../elements/checkbox';
import Skip from '../../../elements/skip';
import {
  Description,
  StyledTitle,
  DescriptionWrapper,
  Security,
  SecurityContainer,
  StyledCheckbox,
  Container
} from './styles';

class EmailPhoneForm extends Component {

  static propTypes = {
    previousPage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isKeyCopy: false
    };
  }

  toggleKeyCopy = () => {
    this.setState({isKeyCopy: !this.state.isKeyCopy});
  };

  render() {
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
        <Button color="black" onPress={this.props.handleSubmit}>Done</Button>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmailPhoneForm);
