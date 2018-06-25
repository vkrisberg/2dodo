import React, {PureComponent} from 'react';
import {Animated, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

import {Button, TextLabel} from '../../elements/index';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

const DURATION = 250;

export default class ModalQuestion extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    acceptLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    acceptButtonColor: PropTypes.string,
    cancelButtonColor: PropTypes.string,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    title: '',
    description: '',
    acceptLabel: '',
    cancelLabel: '',
    acceptButtonColor: colors[themeEnum.light].redLight,
    cancelButtonColor: colors[themeEnum.light].blackText,
  };

  state = {
    modalHeight: null,
    modalWidth: null,
    margin: new Animated.Value(-175),
    opacity: new Animated.Value(0),
  };

  componentDidUpdate() {
    Animated.timing(this.state.margin, {
      toValue: 10,
      duration: DURATION
    }).start();
  }

  componentWillUnmount() {
    this.state.margin.removeAllListeners();
  }

  onAccept = () => {
    const {onAccept} = this.props;
    Animated.timing(this.state.margin, {
      toValue: -this.state.modalHeight,
      duration: DURATION
    }).start(() => {
      onAccept && onAccept();
    });
  };

  onCancel = () => {
    const {onCancel} = this.props;
    Animated.timing(this.state.margin, {
      toValue: -this.state.modalHeight,
      duration: DURATION
    }).start(() => {
      onCancel && onCancel();
    });
  };

  /* Get modal height , set new margin value and add overlay opacity listener */
  onLayout = (e) => {
    const {width, height} = e.nativeEvent.layout;

    if (!this.state.modalHeight) {
      const scale = 1 / height;
      this.state.margin.setValue(-height);
      this.state.margin.addListener(
        ({value}) => {
          const opacity = (height + value) * scale;
          this.state.opacity.setValue(opacity);
        }
      );
      this.setState({
        modalHeight: height,
        modalWidth: width,
      });
    }
    else if (this.state.modalWidth !== width) {
      this.setState({
        modalWidth: width,
      });
    }
  };

  render() {
    let {title, description, acceptLabel, cancelLabel, acceptButtonColor, cancelButtonColor, theme} = this.props;
    const _styles = styles({theme, acceptButtonColor, cancelButtonColor});

    return (
      <View style={_styles.container}>
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <Animated.View style={[_styles.overlay, {opacity: this.state.opacity}]}></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View ref="modal"
                       style={[_styles.modalContent, {marginBottom: this.state.margin}]}
                       onLayout={this.onLayout}>

          <View style={_styles.textWrapper}>
            <TextLabel size={18} weight={weights.semiBold}>{title}</TextLabel>
            <TextLabel style={_styles.description} size={15} weight={weights.medium}>{description}</TextLabel>
          </View>
          <View style={_styles.buttonsWrapper}>
            <Button style={_styles.acceptButton}
                    textStyle={_styles.acceptButtonText}
                    onPress={this.onAccept}>{acceptLabel}</Button>
            <Button style={_styles.cancelButton}
                    textStyle={_styles.cancelButtonText}
                    onPress={this.onCancel}>{cancelLabel}</Button>
          </View>

        </Animated.View>
      </View>
    );
  }
}
