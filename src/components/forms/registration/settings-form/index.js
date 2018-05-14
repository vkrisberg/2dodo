import React, { Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import Arrow from '../../../elements/arrow';
import Title from '../../../elements/title';
import Input from '../../../elements/input';
import Button from '../../../elements/button';

class SettingsForm extends Component {

  setDayTheme = () => {
    return null;
  }

  setNightTheme = () => {
    return null;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View>
        <Arrow onPress={this.props.previousPage} />
        <Title style={styles.title}>Настройки</Title>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            Можно настроить приложение сейчас
            или отложить этот шаг до лучших времен
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.themeButton, { marginRight: 36 }]} onPress={this.setDayTheme}>
            <Text style={styles.themeButtonText}>День</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeButton} onPress={this.setNightTheme}>
            <Text style={styles.themeButtonText}>Ночь</Text>
          </TouchableOpacity>
        </View>

        <Field name="fullName" component={Input} placeholder="Фамилия и Имя" />
        <View style={styles.image}>
        </View>
        <Text style={[styles.description, { marginBottom: 30}]}>
          После нажатия продолжить приложение
          попросит доступ к push-уведомлениям
          для получения сообщений, доступ
          к микрофону и камере для видео-аудио связи
          и геопозиции для отправки карт
        </Text>
        <Button onPress={handleSubmit}>
          Продолжить
        </Button>
        <View>
          <TouchableOpacity style={{marginTop: 50}} onPress={handleSubmit}>
            <Text>Пропустить заполнение</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(withNavigation(SettingsForm));
