import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

import {accountActions} from '../../../store/actions';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, NavbarDots, Avatar, Button, ButtonNavbar, SettingsListItem} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';
import shareIcon from '../../../images/icons/share/share.png';
import {routeEnum} from '../../../enums';

const user = {
  name: 'Lisa Simpson',
  properties: {
    username: '@sipsonlisa',
    avatar: 'http://i.imgur.com/4LClmI1.png',
    language: 'English',
  },
};

class Settings extends Component {

  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  logout = () => {
    this.props.dispatch(accountActions.logout());
  };

  renderNavbarButton = () => {
    return (
      <ButtonNavbar position="right" onPress={this.logout}>{this.context.t('Logout')}</ButtonNavbar>
    );
  };

  onAvatar = () => alert('click on avatar');

  onUserName = () => alert('click on username');

  onQrCode = () => alert('click on qr');

  renderSettingsItem = ({item}) => {
    return (
      <SettingsListItem
        theme={this.props.account.user.theme}
        context={this.context}
        text={item.text}
        onPress={item.onPress}
        checkbox={item.checkbox}
        checkboxValue={item.checkboxValue}
        navigate={item.navigate}
        navigateText={item.navigateText}
        border={item.border}
      />
    );
  };

  onNavigate = (route) => this.props.navigation.navigate(route);

  onLanguage = () => alert('click on language');

  onHelp = () => alert('click on help');

  onQuestions = () => alert('click on questions');

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = account.user;
    const _styles = styles(theme);
    const settingsData = [
      [
        {
          text: 'SoundsAndNotifications',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
        },
        {
          text: 'Appearance',
          onPress: () => this.onNavigate(routeEnum.AppearanceSettings),
          navigate: true,
        },
        {
          text: 'Language',
          onPress: this.onLanguage,
          navigate: true,
          navigateText: 'English',
        },
        {
          text: 'Security',
          onPress: () => this.onNavigate(routeEnum.SafetySettings),
          navigate: true,
          navigateText: 'Use code',
          border: false,
        },
      ],
      [
        {
          text: 'ExtendedSettings',
          onPress: () => this.onNavigate(routeEnum.AdvancedSettings),
          navigate: true,
        },
        {
          text: 'Help',
          onPress: this.onHelp,
          navigate: true,
        },
        {
          text: 'Questions',
          onPress: this.onQuestions,
          navigate: true,
        },
      ],
      [
        {
          text: this.props.account.deviceId,
          onPress: () => {},
          navigate: false,
        },
      ],
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar
            renderTitle={context.t('Settings')}
            renderLeft={<NavbarDots/>}
            renderRight={this.renderNavbarButton()}/>
          <ScrollView style={_styles.container}>
            <View style={_styles.header}>
              <Avatar source={user.properties.avatar} onPress={this.onAvatar}/>
              <View style={_styles.userData}>
                <Text style={_styles.name}>{user.name}</Text>
                <TouchableOpacity style={_styles.usernameBlock} onPress={this.onUserName}>
                  <Text style={[_styles.defaultText, _styles.username]}>{user.properties.username}</Text>
                  <Image source={arrowIcon}/>
                </TouchableOpacity>
                <View style={_styles.buttonsBlock}>
                  <Button
                    style={_styles.actionBtn}
                    onPress={this.onQrCode}>
                    <Text style={[_styles.defaultText, _styles.btnText]}>{context.t('ShowMyQrCode')}</Text>
                  </Button>
                  <Button
                    style={[_styles.actionBtn, _styles.shareBtn]}
                    onPress={this.onQrCode}>
                    <Image source={shareIcon} style={_styles.shareIcon}/>
                    <Text style={[_styles.defaultText, _styles.btnText]}>{context.t('Share')}</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={_styles.divider}/>
            <View style={_styles.content}>
              <SettingsList
                items={settingsData[0]}
                renderItem={this.renderSettingsItem}/>
            </View>
            <View style={_styles.divider}/>
            <View style={[_styles.content]}>
              <SettingsList
                items={settingsData[1]}
                renderItem={this.renderSettingsItem}/>
            </View>
            <View style={_styles.divider}/>
            <View style={[_styles.content, {marginBottom: 60}]}>
              <SettingsList
                items={settingsData[2]}
                renderItem={this.renderSettingsItem}/>
            </View>
          </ScrollView>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Settings);
