import React, {Component} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../../components/layouts/index';
import {Navbar, ButtonBack, SettingsListItem} from '../../../../components/elements';
import {SettingsList} from '../../../../components/lists';
import styles from './styles';

import keyIcon from '../../../../images/icons/key-status/key-status.png';

class Cryptography extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  renderSettingsItem = ({item}) => {
    return (
      <SettingsListItem
        theme={this.props.account.user.theme}
        context={this.context}
        text={item.text}
        onPress={item.onPress}
        border={item.border}
        rowStyle={item.rowStyle}
        textStyle={item.textStyle}
      />
    );
  };

  onExportKeys = () => alert('click on export keys');

  onImportKeys = () => alert('click on import keys');

  onKeysInfo = () => alert('click on keys info');

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      [
        {
          text: 'ExportKeys',
          onPress: this.onExportKeys,
          border: false,
          rowStyle: {paddingVertical: 11},
        },
        {
          text: 'ImportKeys',
          onPress: this.onImportKeys,
          border: false,
          rowStyle: {paddingVertical: 11},
        },
      ],
      [
        {
          text: 'KeysInfo',
          onPress: this.onKeysInfo,
          border: false,
          rowStyle: {paddingVertical: 11},
          textStyle: _styles.blueText,
        },
      ],
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Cryptography')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <View style={_styles.topBlock}>
              <View style={[_styles.infoContainer, {marginTop: 15}]}>
                <Text style={[_styles.grayText, _styles.defaultMarginBottom]}>{context.t('IdDevice')}</Text>
                <Text style={_styles.defaultText}>{account.deviceId}</Text>
              </View>
              <View style={_styles.infoContainer}>
                <Text style={[_styles.grayText, _styles.defaultMarginBottom]}>{context.t('KeyDevice')}</Text>
                <View style={_styles.keyBlock}>
                  <Text style={[_styles.defaultText, _styles.blueText, _styles.limitWidth]} numberOfLines={1}>{account.keys.publicKey}</Text>
                  <Image source={keyIcon} style={_styles.keyIcon}/>
                </View>
              </View>
            </View>
            <View style={_styles.divider}/>
            <SettingsList
              items={settingsData[0]}
              styles={{marginVertical: 10}}
              renderItem={this.renderSettingsItem}/>
            <Text style={[_styles.grayText, _styles.description]}>{context.t('SecurityKeys')}</Text>
            <SettingsList
              items={settingsData[1]}
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
}))(Cryptography);
