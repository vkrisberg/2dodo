import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

import {accountActions} from '../../../store/actions';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, NavbarDots, Button, ButtonNavbar, SettingsListItem, AvatarIcon} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';
import shareIcon from '../../../images/icons/share/share.png';
import {routeEnum} from '../../../enums';
import {helpers} from '../../../utils';

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

  onEditProfile = () => this.props.navigation.navigate(routeEnum.ProfileSettings);

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
    const {user} = this.props.account;
    const fullName = helpers.getFullName(user);
    const {theme} = user;
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
              <TouchableOpacity onPress={this.onEditProfile}>
                <AvatarIcon theme={theme} source={user.avatar} label={fullName}/>
              </TouchableOpacity>
              <View style={_styles.userData}>
                <TouchableOpacity onPress={this.onEditProfile}>
                  <Text style={_styles.name}>{fullName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={_styles.usernameBlock} onPress={this.onEditProfile}>
                  <Text style={[_styles.defaultText, _styles.username]}>{helpers.getNickname(user.username)}</Text>
                  <Image source={arrowIcon}/>
                </TouchableOpacity>
                <View style={_styles.buttonsBlock}>
                  <Button
                    style={_styles.actionBtn}
                    onPress={this.onQrCode}
                    disabled>
                    <Text style={[_styles.defaultText, _styles.btnText]}>{context.t('ShowMyQrCode')}</Text>
                  </Button>
                  <Button
                    style={[_styles.actionBtn, _styles.shareBtn]}
                    onPress={this.onQrCode}
                    disabled>
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
