import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty, map} from 'lodash';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {GroupList} from '../../../components/lists';
import {SearchInput, Navbar, NavbarDots, ButtonAdd, GroupListItem, ButtonNavbar, Loader} from '../../../components/elements';
import {groupActions} from '../../../store/actions';
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
  }

  createGroup = (data) => {
    this.props.dispatch(groupActions.create(data));
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

  onGroupLongPress = (group) => {
    if (!this.state.editMode) {
      this.setState({
        selected: {[group.id]: group},
        editMode: true,
      });
    }
  };

  onGroupCheckboxPress = (group) => {
    if (this.state.editMode) {
      const selected = {...this.state.selected};

      if (!selected[group.id]) {
        selected[group.id] = group;
      } else {
        delete selected[group.id];
      }

      if (isEmpty(selected)) {
        this.setState({
          editMode: false,
          selected: {},
        });
        return;
      }

      this.setState({selected});
    }
  };

  deleteGroups = (ids) => {};

  onGroupsDelete = () => {
    const groupIds = map(this.state.selected, (item, key) => key);
    if (groupIds.length) {
      this.deleteGroups(groupIds).then(() => {
        this.setState({
          editMode: false,
          selected: {},
        });
      });
    }
  };

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
