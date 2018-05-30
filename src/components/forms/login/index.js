import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Input from '../../elements/input';
import Checkbox from '../../elements/checkbox';
import Button from '../../elements/button';
import {
  Security,
  StyledCheckbox,
  Container,
  SecurityContainer
} from './styles';

class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
  }

  toggleNewKey = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    return (
      <Container>
        <Field
          textColor="white"
          component={Input}
          name="username"
          placeholder="Login"
        />
        <Button onPress={this.props.handleSubmit}>Enter</Button>
      </Container>
    );
  }
}


export default connect()(reduxForm({form: 'login'})(LoginForm));
