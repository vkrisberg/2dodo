import React, {PureComponent} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';

import {Avatar, Button, Input, FieldError, ContactListItem} from '../../elements';
import {ContactList} from '../../../components/lists';
import {themeEnum} from '../../../enums';
import styles from './styles';
import {colors} from '../../../styles';
import validate from './validate';

class CreateGroup extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    handleSubmit: PropTypes.func,
    users: PropTypes.array,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onSubmit: () => {},
    users: [],
  };

  renderAvatar = (props) => {
    return (
      <Avatar source={props.input.value} {...props}/>
    );
  };

  onAvatar = () => {
    ImagePicker.showImagePicker(this.imagePickerOptions, (response) => {
      if (response.didCancel) {}
      else if (response.error) {
        Alert.alert('Error', response.error);
      }
      else {
        this.props.change('avatar', response.data);
      }
    });
  };

  renderContactItem = ({item}) => {
    return (
      <ContactListItem
        item={item}
        context={this.props.context}/>
    );
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
      <View style={_styles.inputContainer}>
        <Input
          {...props}
          style={_styles.input}
          theme={theme}
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name} type={'second'}/>
      </View>
    );
  };

  render() {
    const {theme, context, handleSubmit, users} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.wrapper}>
        <ScrollView style={_styles.container}>
          <View style={_styles.header}>
            <Field
              name="avatar"
              component={this.renderAvatar}
              onPress={this.onAvatar}/>
            <View style={_styles.info}>
              <Field
                name="groupName"
                component={this.renderInput}
                placeholder={context.t('GroupName')}
                autoCorrect={false}/>
              <Button
                style={_styles.btn}
                color={colors[theme].blueCornFlower}
                onPress={this.onAvatar}>
                {context.t('ChangePhoto')}
              </Button>
            </View>
          </View>
          <View style={_styles.body}>
            <Text style={_styles.text}>{context.t('GroupUsers')}</Text>
            <ContactList context={context} items={users} renderItem={this.renderContactItem} showSearchResult={false}/>
          </View>
        </ScrollView>
        <View style={_styles.btnContainer}>
          <Button
            onPress={handleSubmit}>
            {context.t('CreateGroupChat')}
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'createGroup',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateGroup);
