import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image, TouchableHighlight, ScrollView} from 'react-native';

import {accountActions} from '../../../store/actions';
import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, NavbarDots, Avatar, Button, ButtonNavbar} from '../../../components/elements';
import styles from './styles';

import arrowIcon from '../../../images/icons/arrow-right/arrow_right.png';
import shareIcon from '../../../images/icons/share/share.png';

const settingsItems = [
  'SoundsAndNotifications',
  'Appearance',
  'Language',
  'Security',
];

const settingsItemsAdditional = [
  'ExtendedSettings',
  'Help',
  'Questions',
];

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

  onSettingsRow = () => alert('click on settings row');

  renderSettingsRow = (item, index, noLastBorder) => {
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <TouchableHighlight
        key={index}
        onPress={this.onSettingsRow}
        underlayColor={colors[theme].blueKrayolaDim}
        style={_styles.settingsRowContainer}>
        <View style={[_styles.settingsRow, noLastBorder === index && {borderBottomWidth: 0}]}>
          <Text style={[_styles.defaultText, _styles.blackText]}>{this.context.t(item)}</Text>
          <View style={_styles.settingsRowRight}>
            {item === 'Language' && <Text style={[_styles.defaultText, _styles.settingsText]}>{user.properties.language}</Text>}
            {item === 'Security' && <Text style={[_styles.defaultText, _styles.settingsText]}>{this.context.t('UseCode')}</Text>}
            <Image source={arrowIcon}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {context} = this;
    const {account} = this.props;

    const {theme} = account.user;
    const _styles = styles(theme);


    return (
      <MainLayout netOffline={!account.net.connected}>
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
              {settingsItems.map((item, index) => this.renderSettingsRow(item, index, settingsItems.length - 1))}
            </View>
            <View style={_styles.divider}/>
            <View style={[_styles.content, {marginBottom: 60}]}>
              {settingsItemsAdditional.map((item, index) => this.renderSettingsRow(item, index))}
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
