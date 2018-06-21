import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {GroupList} from '../../../components/lists';
import {SearchInput, Navbar, NavbarDots, ButtonAdd, GroupListItem, ButtonNavbar} from '../../../components/elements';

const list = [
  {
    name: 'Simpson\'s Family',
    properties: {
      avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Simpsons_FamilyPicture.png/220px-Simpsons_FamilyPicture.png',
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-06-21 21:30',
      unreadCount: 24
    },
  },
  {
    name: 'AIGO Big Group',
    properties: {
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-04-10 21:30',
    },
  }
];

class Groups extends Component {

  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      selected: {},
    };
  }

  searchGroups = () => {};

  onGroupPress = () => {};

  onGroupLongPress = () => {};

  onGroupCheckboxPress = () => {};

  onGroupsDelete = () => {};

  renderGroupItem = ({item}) => {
    const {account} = this.props;

    return (
      <GroupListItem item={item}
        theme={account.user.theme}
        context={this.context}
        editMode={this.state.editMode}
        selectedItems={this.state.selected}
        onPress={this.onGroupPress}
        onLongPress={this.onGroupLongPress}
        onCheckboxPress={this.onGroupCheckboxPress}/>
    );
  };

  renderNavbarButton = () => {
    const {editMode} = this.state;

    if (editMode) {
      return (
        <ButtonNavbar position="right" onPress={this.onGroupsDelete}>{this.context.t('Delete')}</ButtonNavbar>
      );
    }

    return <ButtonAdd onPress={this.onCreate}/>;
  };

  onEmptyBlock = () => alert('on click empty block');

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {theme} = account.user;

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Groups')}
            renderLeft={<NavbarDots/>}
            renderRight={this.renderNavbarButton()}/>
          <SearchInput placeholder={context.t('SearchInGroups')} onChange={this.searchGroups}/>
          <GroupList
            theme={theme}
            context={this.context}
            items={list}
            renderItem={this.renderGroupItem}
            onEmptyBlock={this.onEmptyBlock}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Groups);
