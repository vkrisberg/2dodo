import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Checkbox} from '../index';
import {AvatarIcon} from '../../icons';
import {themeEnum} from '../../../enums';
import styles from './styles';

import deleteBtn from '../../../images/icons/delete/delete.png';
import writeBtn from '../../../images/icons/write/write.png';
import callBtn from '../../../images/icons/call/call.png';

class ContactListItem extends Component {

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

  onPressDeleteBtn = () => {
    alert('press delete btn');
  };

  onPressWriteBtn = () => {
    alert('press write btn');
  };

  onPressCallBtn = () => {
    alert('press call btn');
  };

  render() {
    const {item, checked, theme, checkboxVisibility} = this.props;
    const _styles = styles(theme);

    const swipeoutBtns = [
      {
        backgroundColor: 'transparent',
        underlayColor: 'blue',
        onPress: this.onPressDeleteBtn,
        component: <View style={_styles.btnContainer}><Image source={deleteBtn}/></View>,
      },
      {
        backgroundColor: 'transparent',
        onPress: this.onPressWriteBtn,
        component: <View style={_styles.btnContainer}><Image source={writeBtn}/></View>,
      },
      {
        backgroundColor: 'transparent',
        onPress: this.onPressCallBtn,
        component: <View style={_styles.btnContainer}><Image source={callBtn}/></View>,
      },
    ];

    return (
      <Swipeout right={swipeoutBtns} buttonWidth={50} style={_styles.swipeOut}>
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
      </Swipeout>
    );
  }
}

export default connect()(ContactListItem);
