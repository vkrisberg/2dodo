import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, Image, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Avatar, Button} from '../../../components/elements';
import {themeEnum} from '../../../enums';
import styles from './styles';
import {colors} from '../../../styles';

import writeIcon from '../../../images/icons/write/write.png';
import callIcon from '../../../images/icons/call/call_transparent.png';
import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';

export default class Profile extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    user: PropTypes.object,
    onShowQrCode: PropTypes.func,
    onWriteBtn: PropTypes.func,
    onCallBtn: PropTypes.func,
    onKeysBtn: PropTypes.func,
    onFilesBtn: PropTypes.func,
    onSettings: PropTypes.func,
    onShareBtn: PropTypes.func,
    onNotifications: PropTypes.func,
    onBlockUser: PropTypes.func,
    onClearHistory: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    theme: themeEnum.light,
    onShowQrCode: () => {},
    onWriteBtn: () => {},
    onCallBtn: () => {},
    onKeysBtn: () => {},
    onFilesBtn: () => {},
    onShareBtn: () => {},
    onNotifications: () => {},
    onBlockUser: () => {},
    onClearHistory: () => {},
    onDelete: () => {},
    onSettings: () => {},
  };

  onDelete = (username) => {
    this.props.onDelete(username);
  };

  _renderUserInfoItem = (caption, text) => {
    const {theme} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.userInfoItem}>
        <Text style={[_styles.userInfoText, {color: colors[theme].grayInput}]}>{caption}</Text>
        {text && <View>
          {typeof text === 'object' ?
            Object.keys(text).map((item, index) =>
              <View key={index}>
                <Text style={[_styles.userInfoText, {color: colors[theme].grayBlue, marginBottom: index !== text.length ? 4 : 10,}]}>{text[item]}</Text>
              </View>
            ) :
            <Text style={[_styles.userInfoText, {color: colors[theme].grayBlue, fontSize: 15,}]}>{text}</Text>
          }
        </View>}
      </View>
    );
  };
  render() {
    const {theme, context, user, onShowQrCode, onWriteBtn, onCallBtn, onKeysBtn, onFilesBtn, onSettings, onShareBtn, onNotifications, onBlockUser, onClearHistory} = this.props;
    const _styles = styles(theme);

    return (
      <ScrollView style={_styles.wrapper}>
        <View style={_styles.container}>
          <View style={_styles.header}>
            <View style={_styles.userData}>
              <Avatar source={user.avatar} style={_styles.avatar}/>
              <View style={_styles.info}>
                <Text style={_styles.name}>
                  {user.firstName || user.secondName ?
                    `${user.firstName} ${user.secondName}` :
                    user.username
                  }
                </Text>
                <Text style={_styles.lastVisit}>{moment(user.dateUpdate).format('DD.MM.YY')}</Text>
                <Button
                  style={[_styles.actionBtn, {paddingVertical: 5, alignItems: 'flex-start'}]}
                  color={colors[theme].blue}
                  textStyle={{fontSize: 15,}}
                  onPress={onShowQrCode}>
                  {context.t('ShowQrCode')}
                </Button>
              </View>
            </View>
            <View style={_styles.actions}>
              <Button
                style={_styles.actionBtn}
                onPress={onWriteBtn}>
                <Image source={writeIcon} style={_styles.writeIcon}/>
              </Button>
              <Button
                style={_styles.actionBtn}
                onPress={onCallBtn}>
                <Image source={callIcon} style={_styles.callIcon}/>
              </Button>
            </View>
          </View>
          <View style={_styles.body}>
            <View>
              {this._renderUserInfoItem(context.t('UserName'), user.username)}
              {this._renderUserInfoItem(context.t('UserGroups'), user.groups)}
              {this._renderUserInfoItem(context.t('UserPhones'), user.phones)}
              {this._renderUserInfoItem(context.t('UserBio'), user.bio)}
            </View>
            <View style={_styles.divider}/>
            <View style={_styles.actionsBlock}>
              <Button
                style={_styles.operationBtn}
                onPress={onKeysBtn}>
                <Text style={_styles.operationText}>{context.t('UserKeys')}</Text>
              </Button>
              <Button
                style={_styles.operationBtn}
                onPress={onFilesBtn}>
                <Text style={_styles.operationText}>{context.t('MediaFiles')}</Text>
              </Button>
              <TouchableOpacity
                style={_styles.operationLink}
                onPress={onSettings}>
                <Text style={[_styles.operationText, _styles.textPaddings]}>
                  {context.t('SettingsContact')}
                </Text>
                <Image source={arrowIcon}/>
              </TouchableOpacity>
              <Button
                style={_styles.operationBtn}
                onPress={onShareBtn}>
                <Text style={_styles.operationText}>{context.t('Share')}</Text>
              </Button>
              <TouchableOpacity
                style={_styles.operationLink}
                onPress={onNotifications}>
                <Text style={[_styles.operationText, _styles.textPaddings]}>
                  {context.t('SettingsContact')}
                </Text>
                <View style={_styles.center}>
                  <Text style={[_styles.operationText, _styles.grayText]}>{context.t('Enabled')}</Text>
                  <Image source={arrowIcon}/>
                </View>
              </TouchableOpacity>
              <View style={_styles.dividerThin}/>
              <Button
                style={_styles.operationBtn}
                onPress={onBlockUser}>
                <Text style={_styles.operationText}>{context.t('UserBlock')}</Text>
              </Button>
              <Button
                style={_styles.operationBtn}
                onPress={onClearHistory}>
                <Text style={_styles.operationText}>{context.t('ClearHistory')}</Text>
              </Button>
              <Button
                style={_styles.operationBtn}
                onPress={() => this.onDelete(user.username)}>
                <Text style={[_styles.operationText, {color: colors[theme].redLight,}]}>{context.t('Delete')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
