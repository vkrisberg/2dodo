import React, {Component} from 'react';
import {View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import validate from './validate';
import {Input, Avatar, Button, FieldError} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import removeIcon from '../../../images/icons/remove/remove.png';
import addIcon from '../../../images/icons/add/add.png';
import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';

class ProfileForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    user: PropTypes.object,
    onAvatar: PropTypes.func,
    onRemoveBtn: PropTypes.func,
    onAddBtn: PropTypes.func,
    onGroups: PropTypes.func,
    onNotifications: PropTypes.func,
    onSound: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onAvatar: () => {},
    onRemoveBtn: () => {},
    onAddBtn: () => {},
    onGroups: () => {},
    onNotifications: () => {},
    onSound: () => {},
    onDelete: () => {},
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

  render() {
    const {theme, context, user, onAvatar, onRemoveBtn, onAddBtn, onGroups, onNotifications, onSound, onDelete} = this.props;
    const _styles = styles(theme);
    const namesArr = user.username.split(' ');

    return (
      <ScrollView style={_styles.wrapper}>
        <View style={_styles.container}>
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={_styles.header}>
              <Avatar source={user.avatar} onPress={onAvatar} style={_styles.avatar}/>
              <View style={_styles.headerRight}>
                <Field
                  name="firstName"
                  component={this.renderInput}
                  input={namesArr[0] && {value: namesArr[0]}}
                  placeholder={context.t('Firstname')}
                  keyboardType={'text'}
                  autoCapitalize={'none'}
                  autoCorrect={false}/>
                {namesArr[1] && <Field
                  name="secondName"
                  component={this.renderInput}
                  input={namesArr[1] && {value: namesArr[1]}}
                  placeholder={context.t('Secondname')}
                  keyboardType={'text'}
                  autoCapitalize={'none'}
                  autoCorrect={false}/>}
              </View>
            </View>
            <View style={_styles.phones}>
              {/*{*/}
                {/*user.phones.length && user.phones.map( (phone, i) =>*/}
                  {/*<View style={_styles.phoneItem}>*/}
                    {/*<TouchableOpacity onPress={onRemoveBtn}>*/}
                      {/*<Image source={removeIcon}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<Text style={_styles.phoneText}>{context.t('Phone')}</Text>*/}
                    {/*<Field*/}
                      {/*name={`phone-${i}`}*/}
                      {/*component={this.renderInput}*/}
                      {/*input={{value: phone}}*/}
                      {/*placeholder={context.t('Phone')}*/}
                      {/*keyboardType={'numeric'}*/}
                      {/*autoCapitalize={'none'}*/}
                      {/*autoCorrect={false}/>*/}
                  {/*</View>*/}
                {/*)*/}
              {/*}*/}
              <View style={_styles.phoneItem}>
                <TouchableOpacity onPress={onAddBtn}>
                  <Image source={addIcon}/>
                </TouchableOpacity>
                <Text style={_styles.phoneText}>{context.t('Phone')}</Text>
                <Field
                  name={'phone'}
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
                <Text style={[_styles.defaultText, _styles.actionSubtext]}>{user.groups[0] || context.t('Groups')}</Text>
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(ProfileForm);
