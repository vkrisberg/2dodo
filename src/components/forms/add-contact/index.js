import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';

import {Input, Button} from '../../../components/elements';
import {ScrollContainer} from './styles';

export default class AddContact extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    nickname: '',
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
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollContainer alwaysBounceVertical={false}>
          <Input input={{onChange: this.onChange('nickname')}} placeholder={'nickname'} focusedColor={'gray'}
                 autoCapitalize={'none'}
                 autoCorrect={false}/>
          <Input input={{onChange: this.onChange('firstName')}} placeholder={'First name'} focusedColor={'gray'}/>
          <Input input={{onChange: this.onChange('secondName')}} placeholder={'Second name'} focusedColor={'gray'}/>
          <Button style={{marginTop: 15}} color="black" onPress={this.onSubmit}>
            Add contact
          </Button>
        </ScrollContainer>
      </KeyboardAvoidingView>
    );
  }
}
