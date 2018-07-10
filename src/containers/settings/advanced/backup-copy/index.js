import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem} from '../../../../components/elements';
import {SettingsList} from '../../../../components/lists';
import styles from './styles';

class BackupCopy extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedManual: true,
      checkedScheduledBackup: false,
      checkedArchivePassword: false,
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

  onManual = () => {
    this.setState((prevState) => {
      return {
        checkedManual: !prevState.checkedManual,
      };
    });
  };

  onScheduledBackup = () => {
    this.setState((prevState) => {
      return {
        checkedScheduledBackup: !prevState.checkedScheduledBackup,
      };
    });
  };

  onArchivePassword = () => {
    this.setState((prevState) => {
      return {
        checkedArchivePassword: !prevState.checkedArchivePassword,
      };
    });
  };

  onLocationBackup = () => alert('click on location backup');

  render() {
    const {context} = this;
    const {
      checkedManual,
      checkedScheduledBackup,
      checkedArchivePassword,
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      {
        text: 'Manual',
        onPress: this.onManual,
        checkbox: true,
        checkboxValue: checkedManual,
      },
      {
        text: 'ScheduledBackup',
        onPress: this.onScheduledBackup,
        checkbox: true,
        checkboxValue: checkedScheduledBackup,
      },
      {
        text: 'ArchivePassword',
        onPress: this.onArchivePassword,
        checkbox: true,
        checkboxValue: checkedArchivePassword,
      },
      {
        text: 'LocationBackup',
        onPress: this.onLocationBackup,
        navigate: true,
        navigateText: 'iCloud',
      },
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('BackupCopy')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <SettingsList
              items={settingsData}
              renderItem={this.renderSettingsItem}/>
            <Text style={_styles.text}>{context.t('BackupCopyInfo')}</Text>
          </ScrollView>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(BackupCopy);
