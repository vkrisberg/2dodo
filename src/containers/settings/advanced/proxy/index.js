import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem} from '../../../../components/elements';
import {ProxyForm} from '../../../../components/forms';
import {SettingsList} from '../../../../components/lists';
import styles from './styles';

class Proxy extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedProxyChannelSecure: true,
      checkedProxyForCalls: false,
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
        rowStyle={item.rowStyle}
      />
    );
  };

  onProxyChannelSecure = () => {
    this.setState((prevState) => {
      return {
        checkedProxyChannelSecure: !prevState.checkedProxyChannelSecure,
      };
    });
  };

  onProxyForCalls = () => {
    this.setState((prevState) => {
      return {
        checkedProxyForCalls: !prevState.checkedProxyForCalls,
      };
    });
  };

  render() {
    const {context} = this;
    const {
      checkedProxyChannelSecure,
      checkedProxyForCalls
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      [
        {
          text: 'ProxyChannelSecure',
          onPress: this.onProxyChannelSecure,
          checkbox: true,
          checkboxValue: checkedProxyChannelSecure,
          border: false,
          rowStyle: {paddingVertical: 5}
        },
      ],
      [
        {
          text: 'ProxyForCalls',
          onPress: this.onProxyForCalls,
          checkbox: true,
          checkboxValue: checkedProxyForCalls,
          border: false,
          rowStyle: {paddingVertical: 5}
        },
      ],
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('ProxySettings')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <SettingsList
              items={settingsData[0]}
              style={{marginTop: 10}}
              renderItem={this.renderSettingsItem}/>
            <View style={_styles.formContainer}>
              <ProxyForm theme={theme} context={context}/>
            </View>
            <Text style={_styles.text}>{context.t('ProxyInfo')}</Text>
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
}))(Proxy);
