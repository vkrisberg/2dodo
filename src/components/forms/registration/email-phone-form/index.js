import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';

import Title from '../../../elements/title';
import Input from '../../../elements/input';
import Button from '../../../elements/button';
import Arrow from '../../../elements/arrow';
import Checkbox from '../../../elements/checkbox';

import styles from './styles';

class EmailPhoneForm extends Component {
  render() {
    return (
      <View>
        <Arrow onPress={this.props.previousPage} />
        <Title style={styles.title}>Регистрация</Title>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            Если ни указан номер телефона
            или почта, то при утере восстановление
            пароля станет не возможным
          </Text>
        </View>
        <Field component={Input} name="email" placeholder="Электронная почта" />
        <Field component={Input} name="phone" placeholder="Телефон" />
        <View style={styles.keyCopy}>
          <Field name="keyCopy" component={Checkbox} label="Создать копию ключа" />
        </View>
        <Button onPress={this.props.handleSubmit}>Продолжить</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmailPhoneForm);
