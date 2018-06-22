import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import {Navbar, ButtonBack, ButtonNavbar, TextLabel} from '../index';
import {Icon} from '../../../components/elements';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import {colors, weights} from '../../../styles';
import styles from './styles';

import IMG_MENU_DOTS from './img/menu_dots.png';

export default class NavbarChat extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string,
    theme: PropTypes.string,
    context: PropTypes.object,
    onAvatarPress: PropTypes.func,
    onMenuPress: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    description: '',
    avatar: null,
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPanel: true,
    };
  }

  onAvatarPress = () => {
    this.props.onAvatarPress && this.props.onAvatarPress();
  };

  onMenuPress = () => {
    this.props.onMenuPress && this.props.onMenuPress();
  };

  onSearchIcon = () => {};

  onSettings = () => {};

  onSound = () => {};

  onCall = () => {};

  renderTitle = (_styles) => {
    const {theme, title, description} = this.props;
    return (
      <View style={_styles.container}>
        <View style={_styles.titleContainer}>
          <TextLabel theme={theme}
                     color={colors[theme].navbarTitle}
                     weight={weights.bold}
                     size={18}>{title}</TextLabel>
          <TextLabel theme={theme}
                     color={colors[theme].navbarDescription}
                     weight={weights.medium}
                     size={13}>{description}</TextLabel>
        </View>
        <TouchableOpacity style={_styles.menuContainer} onPress={this.onMenuPress}>
          <Image style={_styles.menuDots} source={IMG_MENU_DOTS} tintColor={this.state.showPanel && colors[theme].blue}/>
        </TouchableOpacity>
      </View>
    );
  };

  renderAvatar = (_styles) => {
    const {theme, avatar} = this.props;

    return (
      <ButtonNavbar theme={theme} position="right" onPress={this.onAvatarPress}>
        {avatar && <Image style={_styles.avatar} source={{uri: `data:image/jpeg;base64,${avatar}`}}/>}
        {!avatar && <AvatarIcon/>}
      </ButtonNavbar>
    );
  };

  renderPanel = (_styles, theme) => {
    const {context} = this.props;

    return (
      <View style={_styles.iconsBlock}>
        <Icon type={'Search'} theme={theme} context={context} onPress={this.onSearchIcon}/>
        <Icon type={'Settings'} theme={theme} context={context} onPress={this.onSettings}/>
        <Icon type={'Sound'} theme={theme} context={context} onPress={this.onSound}/>
        <Icon type={'Call'} theme={theme} context={context} onPress={this.onCall}/>
      </View>
    );
  };

  render() {
    let {theme} = this.props;
    const {showPanel} = this.state;
    const _styles = styles({theme});

    return (
      <View>
        <Navbar theme={theme}
          renderTitle={this.renderTitle(_styles)}
          renderLeft={<ButtonBack/>}
          renderRight={this.renderAvatar(_styles)}/>
        {showPanel && this.renderPanel(_styles, theme)}
      </View>
    );
  }
}
