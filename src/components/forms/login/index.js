import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';


import Input from '../../elements/input';
import Checkbox from '../../elements/checkbox';
import Button from '../../elements/button';
import {
  Security,
  StyledCheckbox,
  Container,
  SecurityContainer
} from './styles';

class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
  }

  newKey = () => this.setState({isChecked: !this.state.isChecked})

  render() {
    return (
      <Container>
        <Field
          textColor="white"
          component={Input}
          name="nickname"
          placeholder="Логин"
        />
        <Field
          textColor="white"
          component={Input}
          name="password"
          placeholder="Пароль"
        />
        <SecurityContainer>
          <Security>For best security</Security>
          <StyledCheckbox
            name="createNewKey"
            component={Checkbox}
            color="white"
            labelPadding={10}
            checked={this.state.isChecked}
            onPress={this.newKey}
            label="Create a new key"
          />
        </SecurityContainer>
        <Button onPress={this.props.onSubmit}>Enter</Button>
      </Container>
    );
  }
}

export default reduxForm({form: 'login'})(LoginForm);
