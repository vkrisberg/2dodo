import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';

import {SearchIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import soundIcon from '../../../images/icons/sound/sound.png';
import callIcon from '../../../images/icons/call/call_transparent.png';
import settingsIcon from '../../../images/icons/settings/settings.png';

export default class Icon extends PureComponent {

  static propTypes = {
    type: PropTypes.oneOf(['Search', 'Settings', 'Sound', 'Call']),
    theme: PropTypes.string,
    context: PropTypes.object,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onPress: () => {},
  };

  render() {
    const {theme, type, context, onPress} = this.props;
    const _styles = styles(theme);

    return (
      <TouchableOpacity
        style={_styles.container}
        onPress={onPress}>
        {type === 'Search' && <View style={{marginTop: 3,}}><SearchIcon/></View>}
        {type === 'Settings' && <Image source={settingsIcon}/>}
        {type === 'Sound' && <Image source={soundIcon}/>}
        {type === 'Call' && <Image source={callIcon} tintColor={colors[theme].grayIcon} style={{width: 22, height: 22,}}/>}
        <Text style={_styles.text}>{context.t(type)}</Text>
      </TouchableOpacity>
    );
  }
}
