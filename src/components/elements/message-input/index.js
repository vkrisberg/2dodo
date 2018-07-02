import React, {PureComponent} from 'react';
import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import {Button, MessageQuote} from '../index';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_ARROW_UP from './img/arrow_up.png';
import IMG_CIRCLE_RED from './img/circle_red.png';
import IMG_CLIP from './img/clip.png';
import IMG_EMOJI from './img/emoji.png';
import IMG_MICROPHONE from './img/microphone.png';
import IMG_CHECK_BLUE from './img/check_blue.png';

const TYPING_TIMEOUT = 15000; // send typing status every 15 sec.

export default class MessageInput extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    disabled: PropTypes.bool,
    quote: PropTypes.object,
    onSubmit: PropTypes.func,
    onTyping: PropTypes.func,
    onPressQuote: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    disabled: false,
    quote: null,
    onPressQuote: () => {},
  };

  constructor(props) {
    super(props);

    this.typingTimeoutId = null;

    this.state = {
      text: '',
      recording: false,
    };
  }

  onChangeText = (text) => {
    this.setState({text});
    // send typing status
    if (!this.typingTimeoutId) {
      this.props.onTyping && this.props.onTyping();
      this.typingTimeoutId = setTimeout(() => {
        this.typingTimeoutId = null;
      }, TYPING_TIMEOUT);
    }
  };

  onSubmit = () => {
    const {text} = this.state;

    text && this.props.onSubmit && this.props.onSubmit(text);

    this.setState({text: ''});
  };

  renderLeftButton = (_styles) => {
    const {disabled} = this.props;

    return (
      <Button
        style={_styles.leftButton}
        disabled={disabled}>
        <View style={_styles.clipButton}>
          <Image source={IMG_CLIP}/>
        </View>
      </Button>
    );
  };

  renderRightButton = (_styles) => {
    const {disabled} = this.props;

    if (this.state.recording) {
      // audio recording
      return (
        <Button
          style={_styles.rightButton}
          disabled={disabled}>
          <View style={_styles.recordingButton}>
            <Image source={IMG_MICROPHONE}/>
          </View>
        </Button>
      );
    } else if (this.state.text) {
      // send a text
      return (
        <Button
          style={_styles.rightButton}
          disabled={disabled}
          onPress={this.onSubmit}>
          <View style={_styles.textButton}>
            <Image source={IMG_ARROW_UP}/>
          </View>
        </Button>
      );
    }

    // send an audio
    return (
      <Button
        style={_styles.rightButton}
        disabled={disabled}>
        <View style={_styles.microphoneButton}>
          <Image source={IMG_MICROPHONE}/>
        </View>
      </Button>
    );
  };

  renderInput = (_styles) => {
    const {theme, context} = this.props;
    const {text} = this.state;

    return (
      <TextInput
        style={_styles.input}
        underlineColorAndroid="transparent"
        value={text}
        placeholder={context.t('Message')}
        placeholderTextColor={colors[theme].messageTextSecond}
        selectionColor={colors[theme].blue}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmit}
      />
    );
  };

  render() {
    let {theme, quote, onPressQuote} = this.props;
    const _styles = styles({theme});

    return (
      <View>
        {
          quote &&
            <TouchableOpacity onPress={onPressQuote} style={_styles.quoteContainer}>
              <MessageQuote message={quote} theme={theme} style={_styles.quote}/>
            </TouchableOpacity>
        }
        <View style={_styles.container}>
          {this.renderLeftButton(_styles)}
          {this.renderInput(_styles)}
          {this.renderRightButton(_styles)}
        </View>
      </View>
    );
  }
}
