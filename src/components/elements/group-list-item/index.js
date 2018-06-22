import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Checkbox} from '../index';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';

import avatarBgIcon from '../../../images/icons/circle/circle.png';

export default class GroupListItem extends Component {

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
    const {item, theme, editMode, selectedItems, showRightBlock} = this.props;
    const _styles = styles(theme);
    const isToday = moment(item.properties.dateUpdate).format('DD.MM.YY') === moment().format('DD.MM.YY');
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
            {!!item.properties.avatar && <Image source={{uri: item.properties.avatar}} style={_styles.avatar}/>}
            {!item.properties.avatar && item.name &&
            <Text style={_styles.avatarInitials}>{this.getInitials(item.name)}</Text>}
            {!item.name && !item.properties.avatar && <AvatarIcon/>}
          </View>
          <View style={_styles.body}>
            <Text style={_styles.caption}>{item.name}</Text>
            <Text style={[_styles.defaultText, _styles.subCaption]}>{item.properties.user}</Text>
            <Text numberOfLines={1} style={[_styles.defaultText, _styles.descriptions]}>{item.properties.quote}</Text>
          </View>
          {showRightBlock && <View style={_styles.information}>
            <Text style={_styles.text}>
              {isToday && moment(item.properties.dateUpdate).format('HH:mm')}
              {!isToday && moment(item.properties.dateUpdate).format('DD.MM.YY')}
            </Text>
            {item.properties.unreadCount > 0 &&
            <View style={_styles.notReadenMessage}>
              <Text style={_styles.notReadenMessageText}>
                {item.properties.unreadCount}
              </Text>
            </View>
            }
          </View>}
        </View>
      </TouchableOpacity>
    );
  }
}
