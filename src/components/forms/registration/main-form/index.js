import React, { Component } from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Button from '../../../elements/button';
import Checkbox from '../../../elements/checkbox';
import Input from '../../../elements/input';
import {
  Description,
  StyledTitle,
  DescriptionWrapper,
  ServerInput
} from './styles';
import Title from '../../../elements/title';
// import validate from '../validate';

class MainForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
  }

  static propTypes = {
    handleSubmit: PropTypes.func
  }

  toggleServerInput = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { handleSubmit } = this.props;
    const { isChecked } = this.state;

    return (
      <View>
        <Title style={StyledTitle}>Регистрация</Title>
        <DescriptionWrapper>
          <Description>
            Во время регистрации приложение создаст
            ключ безопасности для восстановления
            доступа с любых устройств
          </Description>
        </DescriptionWrapper>
        <View>
          <Field name="nickname" focusedColor="black" component={Input} placeholder="Create login" />
          <Field name="password" focusedColor="black" component={Input} placeholder="Password" />
          <Field name="confirmPassword" focusedColor="black" component={Input} placeholder="Repeat password" />
          <Field
            name="ownServer"
            component={Checkbox}
            checked={isChecked}
            label="Use a special servers parameters"
            onPress={this.toggleServerInput}
          />
        </View>
        { isChecked &&  <ServerInput
          focusedColor="black"
          name="server"
          component={Input}
          placeholder="https://servername.ru"
        /> }
        <Button color="black" onPress={handleSubmit}>Continue</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(MainForm);
