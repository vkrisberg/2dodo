import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

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
  constructor(props) {
    super(props);

    this.state = {
      isKeyCopy: false
    };
  }

  keyCopy = () => this.setState({isKeyCopy: !this.state.isKeyCopy})

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
          component={Input}
          name="phone"
          placeholder="Phone"
        />
        <SecurityContainer>
          <Security>For best security</Security>
          <StyledCheckbox
            name="createNewKey"
            component={Checkbox}
            labelPadding={10}
            checked={this.state.isKeyCopy}
            onPress={this.keyCopy}
            label="Create a new key"
          />
        </SecurityContainer>
        <Button color="black" onPress={this.props.handleSubmit}>Done</Button>
        <Skip marginTop={90} color="#9fa3ae" onSkip={this.props.handleSubmit}>Skip this step</Skip>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmailPhoneForm);
