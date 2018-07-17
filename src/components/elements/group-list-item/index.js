import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Checkbox, AvatarIcon} from '../index';
import {themeEnum} from '../../../enums';
import styles from './styles';

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
    const isToday = moment(item.dateUpdate).format('DD.MM.YY') === moment().format('DD.MM.YY');
    const chosen = selectedItems[item.id];

    return (
      <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
        <View style={_styles.container}>
          {editMode && <View style={_styles.checkboxBlock}>
            <Checkbox input={{value: !!chosen, onChange: this.onCheckboxPress}}/>
          </View>
          }
          <View style={_styles.image}>
            <AvatarIcon theme={theme} source={item.avatar} label={item.name}/>
          </View>
          <View style={_styles.body}>
            <Text style={_styles.caption}>{item.name}</Text>
            {
              item.members && item.members.length > 0 &&
              <Text style={[_styles.defaultText, _styles.subCaption]} numberOfLines={1}>
                {item.members.map( (member) => `${member}  `)}
              </Text>
            }
            <Text numberOfLines={1} style={[_styles.defaultText, _styles.descriptions]}>{item.description}</Text>
          </View>
          {showRightBlock && <View style={_styles.information}>
            <Text style={_styles.text}>
              {isToday && moment(item.dateUpdate).format('HH:mm')}
              {!isToday && moment(item.dateUpdate).format('DD.MM.YY')}
            </Text>
            {item.unreadCount > 0 &&
            <View style={_styles.notReadenMessage}>
              <Text style={_styles.notReadenMessageText}>
                {item.unreadCount}
              </Text>
            </View>
            }
          </View>}
        </View>
      </TouchableOpacity>
    );
  }
}
