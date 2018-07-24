import React, {Component} from 'react';
import {View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {Field, reduxForm, formValues} from 'redux-form';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

import {HideWrapper} from '../../../components/layouts';
import {Input, Avatar, Button, FieldError} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import validate from './validate';
import styles from './styles';

import addIcon from '../../../images/icons/add/add.png';
import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';

class ProfileUserForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    initialValues: PropTypes.object,
    onAddBtn: PropTypes.func,
    onGroups: PropTypes.func,
    onSound: PropTypes.func,
    onExit: PropTypes.func,
    onDelete: PropTypes.func,
    bioLength: PropTypes.number,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onAddBtn: () => {
    },
    onGroups: () => {
    },
    onSound: () => {
    },
    onExit: () => {
    },
    onDelete: () => {
    },
    bioLength: 100,
  };

  constructor(props) {
    super(props);
    this.state = {
      bioLength: this.props.bioLength,
    };
  }

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

  onChangeBio = (text) => {
    this.setState({
      bioLength: this.props.bioLength - text.length,
    });
  };

  renderInput = (props) => {
    const _styles = styles(this.props.theme);
    const {meta: {touched, error}} = props;
    const {theme, context} = this.props;
    const path = props.input.name;
    const errors = [];

    if (touched && error) {
      errors.push({
        path: path,
        code: error,
        message: context.t(error),
      });
    }

    return (
      <View style={_styles.inputContainer}>
        {
          path === 'bio' ?
            <Input
              {...props}
              style={[_styles.input, path === 'nickname' && _styles.fieldNickname, path === 'bio' && _styles.fieldBio]}
              theme={theme}
              maxLength={this.props.bioLength}
              error={touched && error}/> :
            <Input
              {...props}
              style={[_styles.input, path === 'nickname' && _styles.fieldNickname]}
              theme={theme}
              error={touched && error}
              editable={!(path === 'nickname')}/>
        }
        <FieldError theme={theme} errors={errors} path={props.input.name} type={'second'}/>
      </View>
    );
  };

  renderAvatar = (props) => {
    return (
      <Avatar source={props.input.value} {...props}/>
    );
  };

  onDelete = (username) => {
    this.props.onDelete(username);
  };

  onExit = () => {
    this.props.onExit();
  };


  render() {
    const {theme, context, onAddBtn, onGroups, onSound} = this.props;
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
              <View style={_styles.phoneItem}>
                <TouchableOpacity style={_styles.phoneButton} onPress={onAddBtn}>
                  <Image source={addIcon}/>
                </TouchableOpacity>
                <Text style={_styles.phoneText}>{context.t('Phone')}</Text>
                <View style={_styles.phoneRight}>
                  <Field
                    name={'phones[0]'}
                    component={this.renderInput}
                    placeholder={context.t('Phone')}
                    keyboardType={'numeric'}
                    autoCapitalize={'none'}
                    autoCorrect={false}/>
                </View>
              </View>
            </View>
            <View style={_styles.settingsContainer}>
              <Text style={_styles.settingsText}>{context.t('PersonalSettings')}</Text>
              <View className={_styles.fieldContainer}>
                <Text style={[_styles.defaultText, _styles.labelNickname]}>@</Text>
                <Field
                  name="nickname"
                  component={this.renderInput}
                  placeholder={context.t('Nickname')}
                  autoCorrect={false}/>
              </View>
              <View className={_styles.fieldContainer}>
                {/*<Text style={[_styles.defaultText, _styles.labelBio]}>{this.state.bioLength}</Text>*/}
                <Field
                  name="bio"
                  component={this.renderInput}
                  placeholder={context.t('Bio')}
                  autoCorrect={false}/>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={_styles.divider}/>
          <View>
            <HideWrapper>
              <TouchableOpacity style={_styles.actionItem} onPress={onGroups}>
                <Text style={[_styles.defaultText, _styles.actionText]}>
                  {context.t('Groups')}
                </Text>
                <View style={_styles.actionItemRight}>
                  <Text
                    style={[_styles.defaultText, _styles.actionSubtext]}>{(!!user.group[0] && user.group[0].name) || context.t('Groups')}</Text>
                  <Image source={arrowIcon}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[_styles.actionItem, {borderBottomWidth: 0,}]} onPress={onSound}>
                <Text style={[_styles.defaultText, _styles.actionText]}>
                  {context.t('SoundsApp')}
                </Text>
                <View style={_styles.actionItemRight}>
                  <Text style={[_styles.defaultText, _styles.actionSubtext]}>{context.t('Enabled')}</Text>
                  <Image source={arrowIcon}/>
                </View>
              </TouchableOpacity>
            </HideWrapper>
            <View style={_styles.divider}/>
            <View style={_styles.btnContainer}>
              <Button
                style={_styles.actionBtn}
                onPress={this.onExit}
                disabled>
                {context.t('ExitOrChange')}
              </Button>
              <Button
                style={_styles.actionBtn}
                onPress={() => this.onDelete(user.username)}
                disabled>
                <Text style={[_styles.defaultText, {color: colors[theme].redLight,}]}>{context.t('DeleteAccount')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default reduxForm({
  form: 'profileUser',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(ProfileUserForm);
