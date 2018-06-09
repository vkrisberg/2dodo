import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {Button, Input, TextLabel} from '../../../elements';
import {themeEnum} from '../../../../enums';
import {weights} from '../../../../styles';
import styles from './styles';

class RegistrationLoginForm extends Component {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    defaultServer: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);
  }

  toggleServerInput = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    const {theme, context} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <KeyboardAvoidingView behavior="position" enabled>
          <TextLabel theme={theme}
                     size={28}
                     weight={weights.bold}
                     textAlign={'center'}
                     style={_styles.title}>{context.t('Registration')}</TextLabel>
          <TextLabel theme={theme}
                     textAlign={'center'}
                     style={_styles.description}>{context.t('RegistrationLoginDescription')}</TextLabel>
          <View style={_styles.inputContainer}>
            <Field
              name="login"
              component={Input}
              placeholder={context.t('CreateLogin')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="password"
              component={Input}
              placeholder={context.t('Password')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
            <Field
              name="repeatPassword"
              component={Input}
              placeholder={context.t('RepeatPassword')}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <Button color="black" onPress={this.props.handleSubmit}>Continue</Button>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(RegistrationLoginForm);
