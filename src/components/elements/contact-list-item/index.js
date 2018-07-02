import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

import {Checkbox, AvatarIcon, TextLabel, ButtonsSwipe} from '../index';
import {themeEnum} from '../../../enums';
import styles from './styles';

import deleteBtn from '../../../images/icons/delete/delete.png';
import writeBtn from '../../../images/icons/write/write.png';
import callBtn from '../../../images/icons/call/call.png';
import {colors, weights} from '../../../styles';

export default class ContactListItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    context: PropTypes.object,
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onCheckboxPress: PropTypes.func,
    onPressDeleteBtn: PropTypes.func,
    onPressChatBtn: PropTypes.func,
    theme: PropTypes.string,
    checkboxVisibility: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    theme: themeEnum.light,
    checkboxVisibility: false,
    onPressDeleteBtn: () => {},
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

  onPressDeleteBtn = (username) => {
    this.props.onPressDeleteBtn(username);
    this.swipeContainer._close();
  };

  onPressChatBtn = () => {
    this.props.onPressChatBtn && this.props.onPressChatBtn(this.props.item);
    this.swipeContainer._close();
  };

  onPressCallBtn = () => {
    alert('press call btn');
    this.swipeContainer._close();
  };

  renderSwipeBtns = () => {
    return (
      <ButtonsSwipe
        firstBtnImage={deleteBtn}
        secondBtnImage={writeBtn}
        thirdBtnImage={callBtn}
        firstBtnHandler={() => this.onPressDeleteBtn(this.props.item.username)}
        secondBtnHandler={this.onPressChatBtn}
        thirdBtnHandler={this.onPressCallBtn}
      />
    );
  };

  render() {
    const {item, context, checked, theme, checkboxVisibility} = this.props;
    const _styles = styles(theme);
    const name = item.fullName || item.username;

    const swipeoutBtns = [
      {
        backgroundColor: 'transparent',
        component: this.renderSwipeBtns(),
      },
    ];

    return (
      <Swipeout right={swipeoutBtns} buttonWidth={140} autoClose={true} style={_styles.swipeOut} ref={ref => this.swipeContainer = ref}>
        <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress} style={{width: '100%'}}>
          <View style={_styles.wrapper}>
            {checkboxVisibility && <Checkbox
              style={_styles.chosen}
              input={{value: checked, onChange: this.onCheckboxPress}}/>}
            <View style={_styles.image}>
              <AvatarIcon theme={theme} source={item.avatar} label={name}/>
            </View>
            <View style={_styles.body}>
              <TextLabel style={_styles.name} size={16} weight={weights.semiBold} color={colors[theme].grayBlue}>
                {name}
              </TextLabel>
              <TextLabel style={_styles.status} size={13} weight={weights.medium} color={colors[theme].grayInput}>
                {item.isOnline ? context.t('online') : context.t('offline')}
              </TextLabel>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
