import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {TextLabel, Input, Button } from '../../../elements';
import {themeEnum} from '../../../../enums';
import {colors, weights} from '../../../../styles';
import styles from './styles';

class ForgotPassEnterKeyForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  render() {
    const {theme, context} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView style={_styles.wrapper} behavior="position" enabled>
          <TextLabel
            theme={theme}
            size={28}
            weight={weights.bold}
            textAlign={'center'}
            style={_styles.title}
          >
            {context.t('EnterKey')}
          </TextLabel>
          <View style={_styles.textContainer}>
            <TextLabel
              theme={theme}
              color={colors[theme].blackText}
              textAlign={'center'}
              style={_styles.description}
            >
              {context.t('EnterKeyDescription')}
            </TextLabel>
          </View>
          <View style={_styles.inputContainer}>
            <Field
              name="key"
              component={Input}
              placeholder={context.t('EnterKey')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="password"
              component={Input}
              placeholder={context.t('Password')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="repeatPassword"
              component={Input}
              placeholder={context.t('RepeatPassword')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <View style={_styles.buttonContainer}>
            <Button onPress={this.props.handleSubmit}>{context.t('Done')}</Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default reduxForm({
  form: 'forgotPassword',
})(ForgotPassEnterKeyForm);
