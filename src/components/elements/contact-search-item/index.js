import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Checkbox} from '../index';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ContactSearchItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onCheckboxPress: PropTypes.func,
    theme: PropTypes.string,
    checkboxVisibility: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    theme: themeEnum.light,
    checkboxVisibility: false,
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
    const {item, checked, theme, checkboxVisibility} = this.props;
    const _styles = styles(theme);

    return (
      <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress} style={{width: '100%'}}>
        <View style={_styles.wrapper}>
          {checkboxVisibility && <Checkbox
            style={_styles.chosen}
            input={{value: checked, onChange: this.onCheckboxPress}}/>}
          <View style={_styles.image}>
            <AvatarIcon/>
          </View>
          <View style={_styles.body}>
            <Text style={_styles.name}>
              {item.username}
            </Text>
            <Text>
              {moment(item.dateUpdate).format('DD.MM.YY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
