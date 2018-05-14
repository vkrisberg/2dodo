import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import Input from '../../elements/input';
import Checkbox from '../../elements/checkbox';
import Button from '../../elements/button';
import styles from './styles';
import account from '../../../api/account';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true
    };
  }

  handleLogin = (data) => {

    // return account.login(data)
    //   .then(result => {
    //     if (result.success) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View>
        <Field component={Input} name="login" placeholder="Логин" />
        <Field component={Input} name="password" placeholder="Пароль" />
        <View style={{ marginTop: 10, marginBottom: 25 }}>
          <Text style={styles.security}>For best security</Text>
          <Field
            style={styles.checkbox}
            name="createNewKey"
            component={Checkbox}
            checked={this.state.isChecked}
            onValueChange={() => {this.setState({isChecked: !this.state.isChecked});}}
            label="Create a new key"
          />
        </View>
        <Button onPress={handleSubmit(this.handleLogin)}>Enter</Button>
      </View>
    );
  }
}

export default reduxForm({ form: 'signIn' })(LoginForm);
