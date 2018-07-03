import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {accountActions} from '../../../store/actions';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, ButtonBack, SettingsListItem, ButtonTheme, Button} from '../../../components/elements';
import {SettingsList} from '../../../components/lists';
import styles from './styles';

class AppearanceSettings extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentFontSize: 15,
      checkedSendOnEnter: false,
      checkedNotShowPrint: false,
      checkedHideReadNotification: false,
      checkedSaveContent: true,
    };
  }

  onThemeChange(theme) {
    this.props.dispatch(accountActions.updateTheme(theme));
  }

  renderBtnsSize = (_styles, theme, btnsCount, startSize) => {
    let btnsArray = [];
    const {currentFontSize} = this.state;

    for (let i = 0; i < btnsCount; i++) {
      btnsArray.push(
        <Button
          style={[
            startSize + i === currentFontSize && _styles.btnSizeActive,
            _styles.btnSize
          ]}
          textStyle={{fontSize: startSize + i, color: startSize + i === currentFontSize ? colors[theme].white : colors[theme].black}}
          onPress={() => this.onBtnSize(startSize + i)}>
          Aa</Button>);
    }

    return btnsArray;
  };

  onBtnSize = (currentFontSize) => {
    this.setState({
      currentFontSize: currentFontSize,
    });
  };

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

  onSendOnEnter = () => {
    this.setState((prevState) => {
      return {
        checkedSendOnEnter: !prevState.checkedSendOnEnter,
      };
    });
  };

  onNotShowPrint = () => {
    this.setState((prevState) => {
      return {
        checkedNotShowPrint: !prevState.checkedNotShowPrint,
      };
    });
  };

  onHideReadNotification = () => {
    this.setState((prevState) => {
      return {
        checkedHideReadNotification: !prevState.checkedHideReadNotification,
      };
    });
  };

  onSaveContent = () => {
    this.setState((prevState) => {
      return {
        checkedSaveContent: !prevState.checkedSaveContent,
      };
    });
  };

  render() {
    const {context} = this;
    const {
      checkedSendOnEnter,
      checkedNotShowPrint,
      checkedHideReadNotification,
      checkedSaveContent
    } = this.state;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const settingsData = [
      {
        text: 'SendOnEnter',
        onPress: this.onSendOnEnter,
        checkbox: true,
        checkboxValue: checkedSendOnEnter,
      },
      {
        text: 'NotShowPrint',
        onPress: this.onNotShowPrint,
        checkbox: true,
        checkboxValue: checkedNotShowPrint,
      },
      {
        text: 'HideReadNotification',
        onPress: this.onHideReadNotification,
        checkbox: true,
        checkboxValue: checkedHideReadNotification,
      },
      {
        text: 'SaveContent',
        onPress: this.onSaveContent,
        checkbox: true,
        checkboxValue: checkedSaveContent,
      },
    ];

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Appearance')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <View paddingHorizontal={20}>
              <View style={_styles.subcaption}>
                <Text style={_styles.text}>{context.t('ColorScheme')}</Text>
              </View>
              <View style={_styles.btnsThemeContainer}>
                <ButtonTheme
                  context={context}
                  theme={theme}
                  style={_styles.btnLightTheme}
                  type={themeEnum.light}
                  onPress={() => this.onThemeChange(themeEnum.light)}/>
                <ButtonTheme
                  context={context}
                  theme={theme}
                  type={themeEnum.night}
                  onPress={() => this.onThemeChange(themeEnum.night)}/>
              </View>
              <View style={_styles.subcaption}>
                <Text style={_styles.text}>{context.t('FontSize')}</Text>
              </View>
              <View style={_styles.btnsFontContainer}>
                {this.renderBtnsSize(_styles, theme, 5, 13)}
              </View>
            </View>
            <SettingsList
              items={settingsData}
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
}))(AppearanceSettings);
