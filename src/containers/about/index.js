import React, {Component} from 'react';
import {ScrollView, View, Image, Text, Linking} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainLayout, BackgroundLayout} from '../../components/layouts';
import {Navbar, ButtonBack, Button} from '../../components/elements';
import styles from './styles';

import logoIcon from './img/logo-icon.png';
import logoText from './img/logo-text.png';
import {colors} from "../../styles";

class About extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('AboutApp')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <View style={_styles.header}>
              <View style={_styles.logoContainer}>
                <Image source={logoIcon} style={_styles.logoIcon}/>
                <View>
                  <Image source={logoText} style={_styles.logoText}/>
                  <Text style={[_styles.defaultText, _styles.grayText]}>{`${context.t('AppVersion')} ${'1.01'}`}</Text>
                </View>
              </View>
              <Button
                color={colors.light.blueCornFlower}
                bgColor={colors.light.blueOpacity}
                onPress={() => Linking.openURL('http://www.2dodo.com')}
                style={_styles.buttonApp}>
                <Text style={[_styles.defaultText, _styles.blueText]}>www.2dodo.com</Text>
              </Button>
            </View>
            <View style={_styles.textContainer}>
              <Text style={_styles.caption}>{context.t('AboutApp')}</Text>
            </View>
            <View style={_styles.textContainer}>
              <Text style={_styles.defaultText}>{context.t('AboutAppFirstParagraph')}</Text>
            </View>
            <View style={_styles.textContainer}>
              <Text style={_styles.defaultText}>{context.t('AboutAppSecondParagraph')}</Text>
            </View>
          </ScrollView>
          <View style={_styles.bottomBlock}>
            <Button
              color={colors.light.blueCornFlower}
              onPress={() => Linking.openURL('http://www.2dodo.com')}
              style={_styles.buttonGitHub}>
              <Text style={[_styles.defaultText, _styles.blueText]}>{context.t('OpenSourceGitHub')}</Text>
            </Button>
          </View>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(About);
