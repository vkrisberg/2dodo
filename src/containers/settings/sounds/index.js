import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

class SoundSettings extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedGlobalNotifications: true,
      checkedPreviewMessages: true,
      checkedGroupNotifications: true,
      checkedShowGroupMessages: true,
      checkedSoundInApplication: true,
      checkedVibration: true,
      checkedGlobalMessagePreview: true,
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
      />
    );
  };

  onGlobalNotifications = () => {
    this.setState((prevState) => {
      return {
        checkedGlobalNotifications: !prevState.checkedGlobalNotifications,
      };
    });
  };

  onPreviewMessages = () => {
    this.setState((prevState) => {
      return {
        checkedPreviewMessages: !prevState.checkedPreviewMessages,
      };
    });
  };

  onSoundMessage = () => alert('click on sound message');

  onGroupNotifications = () => {
    this.setState((prevState) => {
      return {
        checkedGroupNotifications: !prevState.checkedGroupNotifications,
      };
    });
  };

  onShowGroupMessages = () => {
    this.setState((prevState) => {
      return {
        checkedShowGroupMessages: !prevState.checkedShowGroupMessages,
      };
    });
  };

  onGroupSoundMessages = () => alert('click on group sound messages');

  onSoundInApplication = () => {
    this.setState((prevState) => {
      return {
        checkedSoundInApplication: !prevState.checkedSoundInApplication,
      };
    });
  };

  onVibration = () => {
    this.setState((prevState) => {
      return {
        checkedVibration: !prevState.checkedVibration,
      };
    });
  };

  onGlobalMessagePreview = () => {
    this.setState((prevState) => {
      return {
        checkedGlobalMessagePreview: !prevState.checkedGlobalMessagePreview,
      };
    });
  };

  onResetSettings = () => alert('click on reset');

  render() {
    const {context} = this;
    const {
      checkedGlobalNotifications,
      checkedPreviewMessages,
      checkedGroupNotifications,
      checkedShowGroupMessages,
      checkedSoundInApplication,
      checkedVibration,
      checkedGlobalMessagePreview
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      [
        {
          text: 'GlobalNotifications',
          onPress: this.onGlobalNotifications,
          checkbox: true,
          checkboxValue: checkedGlobalNotifications,
        },
        {
          text: 'PreviewMessages',
          onPress: this.onPreviewMessages,
          checkbox: true,
          checkboxValue: checkedPreviewMessages,
        },
        {
          text: 'SoundMessage',
          onPress: this.onSoundMessage,
          navigate: true,
          navigateText: 'Ping',
          border: false,
        },
      ],
      [
        {
          text: 'GroupNotifications',
          onPress: this.onGroupNotifications,
          checkbox: true,
          checkboxValue: checkedGroupNotifications,
        },
        {
          text: 'ShowGroupMessages',
          onPress: this.onShowGroupMessages,
          checkbox: true,
          checkboxValue: checkedShowGroupMessages,
        },
        {
          text: 'GroupSoundMessages',
          onPress: this.onGroupSoundMessages,
          navigate: true,
          navigateText: 'Ping',
        },
        {
          text: 'SoundInApplication',
          onPress: this.onSoundInApplication,
          checkbox: true,
          checkboxValue: checkedSoundInApplication,
        },
        {
          text: 'Vibration',
          onPress: this.onVibration,
          checkbox: true,
          checkboxValue: checkedVibration,
        },
        {
          text: 'GlobalMessagePreview',
          onPress: this.onGlobalMessagePreview,
          checkbox: true,
          checkboxValue: checkedGlobalMessagePreview,
          border: false,
        },
      ],
      [
        {
          text: 'ResetSettings',
          onPress: this.onResetSettings,
        },
      ],
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('SoundSettings')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <View style={_styles.subcaption}>
              <Text style={_styles.text}>{context.t('SoundsAndNotifications')}</Text>
            </View>
            <SettingsList
              items={settingsData[0]}
              renderItem={this.renderSettingsItem}/>
            <View style={_styles.divider}/>
            <SettingsList
              items={settingsData[1]}
              renderItem={this.renderSettingsItem}/>
            <View style={[_styles.divider, {marginBottom: 10}]}/>
            <SettingsList
              items={settingsData[2]}
              renderItem={this.renderSettingsItem}/>
          </ScrollView>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(SoundSettings);
