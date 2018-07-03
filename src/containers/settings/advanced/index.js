import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {routeEnum} from '../../../enums';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

class AdvancedSettings extends Component {
  static propTypes = {
    account: PropTypes.object,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedSendAnalytics: true,
      checkedBackgroundSynchronization: true,
    };
  }

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
        rowStyles={item.rowStyles}
      />
    );
  };

  onNavigate = (route) => this.props.navigation.navigate(route);

  onSendAnalytics = () => {
    this.setState((prevState) => {
      return {
        checkedSendAnalytics: !prevState.checkedSendAnalytics,
      };
    });
  };

  onBackgroundSynchronization = () => {
    this.setState((prevState) => {
      return {
        checkedBackgroundSynchronization: !prevState.checkedBackgroundSynchronization,
      };
    });
  };

  onClearCash = () => alert('click on clear cash');

  onResetSettings = () => alert('click on reset settings');

  onAboutApp = () => alert('click on about app');

  render() {
    const {context} = this;
    const {
      checkedSendAnalytics,
      checkedBackgroundSynchronization
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      [
        {
          text: 'ConnectionStatus',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
        },
        {
          text: 'Cryptography',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
        },
        {
          text: 'BackupCopy',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
        },
        {
          text: 'ProxyConnection',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
        },
        {
          text: 'GoogleKeyNotifications',
          onPress: () => this.onNavigate(routeEnum.SoundSettings),
          navigate: true,
          border: false,
        },
      ],
      [
        {
          text: 'SendAnalytics',
          onPress: this.onSendAnalytics,
          checkbox: true,
          checkboxValue: checkedSendAnalytics,
        },
        {
          text: 'BackgroundSynchronization',
          onPress: this.onBackgroundSynchronization,
          checkbox: true,
          checkboxValue: checkedBackgroundSynchronization,
          border: false,
        },
      ],
      [
        {
          text: 'ClearCash',
          onPress: this.onClearCash,
          border: false,
          rowStyles: {paddingVertical: 11},
        },
        {
          text: 'ResetSettings',
          onPress: this.onResetSettings,
          border: false,
          rowStyles: {paddingVertical: 11},
        },
        {
          text: 'AboutApp',
          onPress: this.onAboutApp,
          border: false,
          rowStyles: {paddingVertical: 11},
        },
      ],
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('AdvancedSettings')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <SettingsList
              items={settingsData[0]}
              renderItem={this.renderSettingsItem}/>
            <View style={_styles.divider}/>
            <View style={_styles.subcaption}>
              <Text style={_styles.text}>{context.t('SoundsAndNotifications')}</Text>
            </View>
            <SettingsList
              items={settingsData[1]}
              renderItem={this.renderSettingsItem}/>
            <View style={[_styles.divider, {marginBottom: 16}]}/>
            <SettingsList
              items={settingsData[2]}
              renderItem={this.renderSettingsItem}/>
            <Text style={_styles.textSmall}>{`${context.t('Version')} ${'1.0'}`}</Text>
          </ScrollView>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(AdvancedSettings);
