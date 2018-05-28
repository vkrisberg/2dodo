import React, {Component} from 'react';
import {View} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import Button from '../../../elements/button';
import Input from '../../../elements/input';
import {
  Description,
  StyledTitle,
  DescriptionWrapper,
  NicknameView
} from './styles';
import Title from '../../../elements/title';

// import validate from '../validate';

class MainForm extends Component {

  static propTypes = {
    defaultServer: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  toggleServerInput = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    return (
      <View>
        <Title style={StyledTitle}>Registration</Title>
        <DescriptionWrapper>
          <Description>
            During registration, the application will create security key for recovery
          </Description>
        </DescriptionWrapper>
        <NicknameView>
          <Field
            name="nickname"
            focusedColor="#7bb2ff"
            component={Input}
            placeholder="Create login"
          />
        </NicknameView>
        <Button color="black" onPress={this.props.handleSubmit}>Continue</Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(MainForm);
