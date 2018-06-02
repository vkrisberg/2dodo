import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button} from '../index';
import {Wrapper, StyledInput, ButtonStyles} from './styles';

export default class MessageInput extends Component {

  static propTypes = {
    onSubmitText: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  onChangeText = (text) => {
    this.setState({text});
  };

  onSubmitText = () => {
    const {text} = this.state;

    text && this.props.onSubmitText && this.props.onSubmitText(text);
    this.setState({text: ''});
  };

  render() {
    const {text} = this.state;

    return (
      <Wrapper>
        <StyledInput
          placeholder="Message"
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitText}
          value={text}/>
        <Button
          style={ButtonStyles.container}
          color={'#000000'}
          wrapperStyle={ButtonStyles.wrapper}
          textStyle={ButtonStyles.text}
          onPress={this.onSubmitText}>↑</Button>
      </Wrapper>
    );
  }
}
