import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import validate from './validate';
import {Input, Button, FieldError, Checkbox} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

class CreateChannel extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      privateChannel: false,
    };
  }

  onCheckboxPress = () => {
    this.setState({
      privateChannel: !this.state.privateChannel,
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
          placeholderColor={colors[theme].blueKrayola}
          borderColor={colors[theme].grayLight}
          theme={theme}
          error={touched && error}/>
        <FieldError theme={theme} errors={errors} path={props.input.name}/>
      </View>
    );
  };

  render() {
    const {theme, context, onSubmit} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.fieldsContainer} behavior="position" enabled>
          <Field
            name="uniqueId"
            component={this.renderInput}
            placeholder={context.t('UniqueId')}
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={false}/>
          <Field
            name="channelName"
            component={this.renderInput}
            placeholder={context.t('ChannelName')}
            keyboardType={'text'}
            autoCapitalize={'none'}
            autoCorrect={false}/>
          <Field
            name="description"
            component={this.renderInput}
            placeholder={context.t('Description')}
            keyboardType={'text'}
            autoCapitalize={'none'}
            autoCorrect={false}/>
          <View style={_styles.privateBlock}>
            <Text style={_styles.text}>{context.t('PrivateChannel')}</Text>
            <Checkbox
              input={{value: this.state.privateChannel, onChange: this.onCheckboxPress,}}
              style={_styles.checkbox}/>
          </View>
          <Field
            name="password"
            component={this.renderInput}
            placeholder={context.t('Password')}
            secureTextEntry={true}
            autoCapitalize={'none'}
            autoCorrect={false}/>
          <Field
            name="repeatPassword"
            component={this.renderInput}
            placeholder={context.t('RepeatPassword')}
            secureTextEntry={true}
            autoCapitalize={'none'}
            autoCorrect={false}/>
        </KeyboardAvoidingView>
        <View style={_styles.btnContainer}>
          <Button
            style={_styles.btn}
            backgroundColor={colors[theme].white}
            onPress={this.onSubmit}>
            <Text style={_styles.btnText}>{context.t('Create')}</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'create-channel',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateChannel);
