import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import {MainLayout, BackgroundLayout} from '../../components/layouts';
import {Navbar, NavbarDots, ButtonNavbar, NavbarFavorites} from '../../components/elements';
import {EmptyFavoritsIcon} from '../../components/icons';
import styles from './styles';
import {colors} from '../../styles';

class Favorites extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      category: 'Chats',
      title: 'NoMessagesInFavorites',
    };
  }

  renderNavbarButton = (theme) => {
    return (
      <ButtonNavbar position="right" onPress={this.onSearchFavorite} color={colors[theme].blueCornFlower}>{this.context.t('Search')}</ButtonNavbar>
    );
  };

  onSearchFavorite = () => alert('click on search');

  getFavorits = (_styles) => {
    const {title} = this.state;

    return (
      <View style={_styles.emptyFavoritesView}>
        <EmptyFavoritsIcon />
        <Text style={_styles.boldText}>{this.context.t(title)}</Text>
      </View>
    );
  };

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Favorites')}
            renderLeft={<NavbarDots/>}
            renderRight={this.renderNavbarButton(theme)}/>
          <NavbarFavorites />
          {this.getFavorits(_styles)}
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Favorites);

