import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

class Safety extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedSetPin: false,
      checkedSynchronizeContact: false,
      checkedGeolocation: false,
      checkedShareGallery: true,
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

  onSetPin = () => {
    this.setState((prevState) => {
      return {
        checkedSetPin: !prevState.checkedSetPin,
      };
    });
  };

  onSynchronizeContact = () => {
    this.setState((prevState) => {
      return {
        checkedSynchronizeContact: !prevState.checkedSynchronizeContact,
      };
    });
  };

  onGeolocation = () => {
    this.setState((prevState) => {
      return {
        checkedGeolocation: !prevState.checkedGeolocation,
      };
    });
  };

  onShareGallery = () => {
    this.setState((prevState) => {
      return {
        checkedShareGallery: !prevState.checkedShareGallery,
      };
    });
  };

  render() {
    const {context} = this;
    const {
      checkedSetPin,
      checkedSynchronizeContact,
      checkedGeolocation,
      checkedShareGallery
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      {
        text: 'SetPin',
        onPress: this.onSetPin,
        checkbox: true,
        checkboxValue: checkedSetPin,
      },
      {
        text: 'SynchronizeContact',
        onPress: this.onSynchronizeContact,
        checkbox: true,
        checkboxValue: checkedSynchronizeContact,
      },
      {
        text: 'Geolocation',
        onPress: this.onGeolocation,
        checkbox: true,
        checkboxValue: checkedGeolocation,
      },
      {
        text: 'ShareGallery',
        onPress: this.onShareGallery,
        checkbox: true,
        checkboxValue: checkedShareGallery,
      },
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Safety')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <SettingsList
              items={settingsData}
              renderItem={this.renderSettingsItem}/>
            <Text style={_styles.text}>{context.t('SynchronizationAndGeolocation')}</Text>
          </ScrollView>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(Safety);
