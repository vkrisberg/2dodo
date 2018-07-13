import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

import {Checkbox} from '../index';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';

import avatarBgIcon from '../../../images/icons/circle/circle.png';

export default class GroupPublicListItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    theme: PropTypes.string,
    context: PropTypes.object,
    editMode: PropTypes.bool,
    selectedItems: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onCheckboxPress: PropTypes.func,
    showRightBlock: PropTypes.bool,
  };

  static defaultProps = {
    theme: themeEnum.light,
    editMode: false,
    selectedItems: {},
    onCheckboxPress: {},
    showRightBlock: true,
  };

  getInitials = (name) => {
    const nameArr = name.split(' ');
    let initials = [];
    nameArr.map((item, index) => {
      if (index < 2) initials.push(item[0].toUpperCase());
    });
    return initials.join('');
  };

  onPress = () => {
    this.props.onPress && this.props.onPress(this.props.item);
  };

  onLongPress = () => {
    this.props.onLongPress && this.props.onLongPress(this.props.item);
  };

  onCheckboxPress = () => {
    this.props.onCheckboxPress && this.props.onCheckboxPress(this.props.item);
  };


  render() {
    const {item, theme, context, editMode, selectedItems} = this.props;
    const _styles = styles(theme);
    const chosen = selectedItems[item.id];

    return (
      <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
        <View style={_styles.container}>
          {editMode && <View style={_styles.checkboxBlock}>
            <Checkbox input={{value: !!chosen, onChange: this.onCheckboxPress}}/>
          </View>
          }
          <View style={_styles.image}>
            <Image source={avatarBgIcon} style={_styles.avatarBg}/>
            {!!item.avatar && <Image source={{uri: item.avatar}} style={_styles.avatar}/>}
            {!item.avatar && item.name &&
            <Text style={_styles.avatarInitials}>{this.getInitials(item.name)}</Text>}
            {!item.name && !item.avatar && <AvatarIcon/>}
          </View>
          <View style={_styles.body}>
            <Text style={_styles.caption}>{item.name}</Text>
            <Text style={[_styles.defaultText, _styles.subCaption]}>{`${context.t('Members')}: ${item.members}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
