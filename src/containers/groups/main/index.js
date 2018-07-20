import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {GroupList} from '../../../components/lists';
import {SearchInput, Navbar, NavbarDots, ButtonAdd, GroupListItem, ButtonNavbar, Loader} from '../../../components/elements';
import {groupActions, groupMessageActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';

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

  componentDidMount() {
    this.props.dispatch(groupActions.loadList());
    // this.createGroup({
    //   link: 'ramil_test_group',
    //   type: messageEnum.groupChat,
    //   name: 'Test Group',
    //   description: 'Test group for tests',
    //   avatar: '',
    //   members: [],
    // });
    //
    // this.sendGroupMessage({
    //   groupId: 'd2071caea70c42b69a0da77fee2a83ab',
    //   link: 'ramil_test_group',
    //   data: 'Hello! This is test message!',
    // });
  }

  createGroup = (data) => {
    this.props.dispatch(groupActions.create(data));
  };

  sendGroupMessage = (data) => {
    this.props.dispatch(groupMessageActions.send(data));
  };

  loadGroupList = (filter, sort, descending) => {
    return this.props.dispatch(groupActions.loadList(filter, sort, descending));
  };

  searchGroups = (text) => {
    const filter = `name CONTAINS[c] '${text}' OR description CONTAINS[c] '${text}'`;
    return this.loadGroupList(filter);
  };

  onSearchChange = (text) => {
    this.searchGroups(text);
  };

  onAddGroup = () => this.props.navigation.navigate(routeEnum.GroupAdd);

  onGroupPress = (group) => {
    this.props.navigation.navigate(routeEnum.GroupMessage, {group});
  };

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

    return <ButtonAdd onPress={this.onAddGroup}/>;
  };

  onEmptyBlock = () => alert('on click empty block');

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {theme} = account.user;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          {group.loading && <Loader/>}
          <Navbar renderTitle={context.t('Groups')}
            renderLeft={<NavbarDots/>}
            renderRight={this.renderNavbarButton()}/>
          <SearchInput placeholder={context.t('SearchInGroups')} onChange={this.onSearchChange}/>
          <GroupList
            theme={theme}
            context={this.context}
            items={group.list}
            renderItem={this.renderGroupItem}
            onEmptyBlock={this.onEmptyBlock}/>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  group: state.group,
  groupMessage: state.groupMessage,
}))(Groups);
