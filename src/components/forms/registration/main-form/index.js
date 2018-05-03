import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Button from '../../../elements/button';
import Checkbox from '../../../elements/checkbox';
import Input from '../../../elements/input';
import Title from '../../../elements/title';
import styles from './styles';
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
        <Title style={styles.title}>Регистрация</Title>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            Во время регистрации приложение создаст
            ключ безопасности для восстановления
            доступа с любых устройств
          </Text>
        </View>
        <View>
          <Field name="login" component={Input} placeholder="Создайте Логин" />
          <Field name="password" component={Input} placeholder="Пароль" />
          <Field name="confirmPassword" component={Input} placeholder="Повторить пароль" />
          <Field
            name="ownServer"
            component={Checkbox}
            label="Применить свои параметры сервера"
            onClick={this.toggleServerInput}
          />
        </View>
        { isChecked &&  <Field name="server" style={styles.serverInput} component={Input} placeholder="https://servername.ru" /> }
        <Button onPress={handleSubmit}>Продолжить</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(MainForm);