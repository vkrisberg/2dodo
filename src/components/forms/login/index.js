import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Input, Button} from '../../elements';
import {
  Container
} from './styles';

class LoginForm extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, placeholder} = this.props;

    return (
      <Container>
        <Field
          textColor="white"
          component={Input}
          name="username"
          placeholder={placeholder}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <Button onPress={handleSubmit}>Enter</Button>
      </Container>
    );
  }
}


export default connect()(reduxForm({form: 'login'})(LoginForm));
