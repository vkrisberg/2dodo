import React, {Component} from 'react';
import {View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {Field, reduxForm, formValues} from 'redux-form';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

import {Input, Avatar, Button, FieldError} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import validate from './validate';
import styles from './styles';

import removeIcon from '../../../images/icons/remove/remove.png';
import addIcon from '../../../images/icons/add/add.png';
import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';

class ProfileForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    initialValues: PropTypes.object,
    onRemoveBtn: PropTypes.func,
    onAddBtn: PropTypes.func,
    onGroups: PropTypes.func,
    onNotifications: PropTypes.func,
    onSound: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onRemoveBtn: () => {
    },
    onAddBtn: () => {
    },
    onGroups: () => {
    },
    onNotifications: () => {
    },
    onSound: () => {
    },
    onDelete: () => {
    },
  };

  componentDidMount() {
    this.imagePickerOptions = {
      title: this.props.context.t('ChooseYourPhoto'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: false,
      allowsEditing: true,
    };
  }

  onAvatar = () => {
    ImagePicker.showImagePicker(this.imagePickerOptions, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
        Alert.alert('Error', response.error);
      }
      else {
        this.props.change('avatar', response.data);
      }
    });
  };

  renderInput = (props) => {
    const _styles = styles(this.props.theme);
    const {meta: {touched, error}} = props;
    const {theme, context} = this.props;
    const errors = [];

    if (touched && error) {
      errors.push({
        path: props.input.name,
        code: error,
        message: context.t(error),
      });
    }

    return (
      <View style={{width: '100%'}}>
        <Input
          {...props}
          style={_styles.input}
          theme={theme}
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name}/>
      </View>
    );
  };

  renderAvatar = (props) => {
    return (
      <Avatar source={props.input.value} {...props}/>
    );
  };

  render() {
    const {theme, context, onRemoveBtn, onAddBtn, onGroups, onNotifications, onSound, onDelete} = this.props;
    const user = this.props.initialValues;
    const _styles = styles(theme);

    return (
      <ScrollView style={_styles.wrapper}>
        <View style={_styles.container}>
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={_styles.header}>
              <Field
                name="avatar"
                component={this.renderAvatar}
                onPress={this.onAvatar}/>
              <View style={_styles.headerRight}>
                <Field
                  name="firstName"
                  component={this.renderInput}
                  placeholder={context.t('Firstname')}
                  autoCorrect={false}/>
                <Field
                  name="secondName"
                  component={this.renderInput}
                  placeholder={context.t('Secondname')}
                  autoCorrect={false}/>
              </View>
            </View>
            <View style={_styles.phones}>
              {
                !!Object.keys(user.phones).length && Object.keys(user.phones).map((phone, i) =>
                  <View key={i} style={_styles.phoneItem}>
                    <TouchableOpacity onPress={onRemoveBtn}>
                      <Image source={removeIcon}/>
                    </TouchableOpacity>
                    <Text style={_styles.phoneText}>{context.t('Phone')}</Text>
                    <Field
                      name={`phones[${i}]`}
                      component={this.renderInput}
                      placeholder={context.t('Phone')}
                      keyboardType={'numeric'}
                      autoCapitalize={'none'}
                      autoCorrect={false}/>
                  </View>
                )
              }
              <View style={_styles.phoneItem}>
                <TouchableOpacity onPress={onAddBtn}>
                  <Image source={addIcon}/>
                </TouchableOpacity>
                <Text style={_styles.phoneText}>{context.t('Phone')}</Text>
                <Field
                  name={'phones[1]'}
                  component={this.renderInput}
                  placeholder={context.t('Phone')}
                  keyboardType={'numeric'}
                  autoCapitalize={'none'}
                  autoCorrect={false}/>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={_styles.divider}/>
          <View>
            <TouchableOpacity style={_styles.actionItem} onPress={onGroups}>
              <Text style={[_styles.defaultText, _styles.actionText]}>
                {context.t('Groups')}
              </Text>
              <View style={_styles.actionItemRight}>
                <Text
                  style={[_styles.defaultText, _styles.actionSubtext]}>{user.groups[0] || context.t('Groups')}</Text>
                <Image source={arrowIcon}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={_styles.actionItem} onPress={onNotifications}>
              <Text style={[_styles.defaultText, _styles.actionText]}>
                {context.t('Notifications')}
              </Text>
              <View style={_styles.actionItemRight}>
                <Text style={[_styles.defaultText, _styles.actionSubtext]}>{context.t('Enabled')}</Text>
                <Image source={arrowIcon}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[_styles.actionItem, {borderBottomWidth: 0,}]} onPress={onSound}>
              <Text style={[_styles.defaultText, _styles.actionText]}>
                {context.t('Sound')}
              </Text>
              <View style={_styles.actionItemRight}>
                <Text style={[_styles.defaultText, _styles.actionSubtext]}>{user.sound || context.t('Sound')}</Text>
                <Image source={arrowIcon}/>
              </View>
            </TouchableOpacity>
            <View style={_styles.divider}/>
            <Button
              style={_styles.actionBtn}
              onPress={onDelete}>
              <Text style={[_styles.defaultText, {color: colors[theme].redLight,}]}>{context.t('DeleteContact')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default reduxForm({
  form: 'profile',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(ProfileForm);
