import React, { Component } from 'react';
import {Svg} from 'react-native-svg';

import MarkIcon from '../../../../../icons/mark-icon';
import {ThemeButtonContainer, ThemeButtonText} from './styles';
import { connect } from 'react-redux';

class ThemeButton extends Component {
  setTheme = () => {
    this.props.dispatch('CHANGE_THEME', this.props.theme || day);
  }

  render() {
    const {marginRight, night, markColor} = this.props;

    return (
      <ThemeButtonContainer night={night} marginRight={marginRight} onPress={() => {}}>
        <ThemeButtonText night={night}>Day</ThemeButtonText>
        <Svg width="22" height="22">
          <MarkIcon color={markColor} />
        </Svg>
      </ThemeButtonContainer>
    );
  }
}

export default connect()(ThemeButton);