import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {Input, Button} from '../../../components/elements';
import {Wrapper} from './styles';

export default class AddContact extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    firstName: '',
    secondName: '',
  }

  onChange(field) {
    return (value) => {
      this.setState({[field]: value});
    };
  }

  onSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  };

  render() {
    return (
      <Wrapper>
        <Input input={{onChange: this.onChange('username')}} placeholder={'test@api.2do.do'} focusedColor={'gray'}/>
        <Input input={{onChange: this.onChange('firstName')}} placeholder={'First name'} focusedColor={'gray'}/>
        <Input input={{onChange: this.onChange('secondName')}} placeholder={'Second name'} focusedColor={'gray'}/>
        <Button style={{marginTop: 15}} color="black" onPress={this.onSubmit}>
          Add contact
        </Button>
      </Wrapper>
    );
  }
}
