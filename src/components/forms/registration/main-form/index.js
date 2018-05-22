import React, {Component} from 'react';
import {View} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import Button from '../../../elements/button';
import Checkbox from '../../../elements/checkbox';
import Input from '../../../elements/input';
import {
  Description,
  StyledTitle,
  DescriptionWrapper,
  ServerInput
} from './styles';
import Title from '../../../elements/title';

// import validate from '../validate';

class MainForm extends Component {

  static propTypes = {
    defaultServer: PropTypes.string,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
  }

  toggleServerInput = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    const {defaultServer, handleSubmit} = this.props;
    const {isChecked} = this.state;

    return (
      <View>
        <Title style={StyledTitle}>Registration</Title>
        <DescriptionWrapper>
          <Description>
            During registration, the application will create security key for recovery
          </Description>
        </DescriptionWrapper>
        <View>
          <Field
            name="nickname"
            focusedColor="#7bb2ff"
            component={Input}
            placeholder="Create login"
          />
          <Field
            name="password"
            focusedColor="#7bb2ff"
            component={Input}
            placeholder="Password"
          />
          <Field
            name="confirmPassword"
            focusedColor="#7bb2ff"
            component={Input}
            placeholder="Repeat password"
          />
          <Field
            name="ownServer"
            component={Checkbox}
            checked={isChecked}
            label="Use a special servers parameters"
            onPress={this.toggleServerInput}
          />
        </View>
        {isChecked && <ServerInput
          focusedColor="#7bb2ff"
          name="server"
          component={Input}
          placeholder={defaultServer}
        />}
        <Button color="black" onPress={handleSubmit}>Continue</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(MainForm);
