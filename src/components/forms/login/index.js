import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';


import Input from '../../elements/input';
import Checkbox from '../../elements/checkbox';
import Button from '../../elements/button';
import styles from './styles';

class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: true
    };
  }

  render() {
    return (
      <View>
        <Field component={Input} name="nickname" placeholder="Логин"/>
        <Field component={Input} name="password" placeholder="Пароль"/>
        <View style={{marginTop: 10, marginBottom: 25}}>
          <Text style={styles.security}>For best security</Text>
          <Field
            style={styles.checkbox}
            name="createNewKey"
            component={Checkbox}
            checked={this.state.isChecked}
            onValueChange={() => {
              this.setState({isChecked: !this.state.isChecked});
            }}
            label="Create a new key"
          />
        </View>
        <Button onPress={this.props.onSubmit}>Enter</Button>
      </View>
    );
  }
}

export default reduxForm({form: 'login'})(LoginForm);
