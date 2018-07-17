import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import PropTypes from 'prop-types';
import {get} from 'lodash';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {Loader, ButtonBack, ButtonNavbar, Navbar} from '../../../components/elements';
import {CreateGroup} from '../../../components/forms';
import {groupActions} from '../../../store/actions';
import {colors} from '../../../styles';
import {messageEnum, routeEnum} from '../../../enums';

class GroupCreate extends Component {

  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    form: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: 'groupChat',
    };
  }

  componentDidMount() {
    this.props.dispatch(groupActions.getPublicGroupList());
  }

  renderNavbarButton = (theme) => {
    const users = this.props.navigation.getParam('users');
    return (
      <ButtonNavbar position="right" onPress={() => this.onSubmit(users)} color={colors[theme].blueCornFlower}>{this.context.t('Start')}</ButtonNavbar>
    );
  };

  onCheckboxPress = (checkbox) => {
    this.setState({
      checked: checkbox,
    });
  };

  createGroup = (data) => {
    this.props.dispatch(groupActions.create(data));
    this.props.navigation.navigate(routeEnum.Groups);
  };

  onSubmit = (users) => {
    const data = get(this.props.form, 'createGroup.values', {});
    const errors = get(this.props.form, 'createGroup.syncErrors', false);

    if (errors) {
      this.props.dispatch(submit('createGroup'));
      return false;
    }

    const members = [];
    users.map( user => members.push(user.fullName || user.username));

    this.createGroup({
      link: data.groupName,
      type: messageEnum.groupChat,
      name: data.groupName,
      description: '',
      avatar: data.avatar,
      members: members,
    });
  };

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {theme} = account.user;
    const users = this.props.navigation.getParam('users');

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          {group.loading && <Loader/>}
          <Navbar
            renderTitle={context.t('CreateChat')}
            renderLeft={<ButtonBack/>}
            renderRight={this.renderNavbarButton(theme)}/>
          <DismissKeyboardLayout style={{width: '100%', flex: 1}}>
            <CreateGroup theme={theme} context={context} users={users} onSubmit={() => this.onSubmit(users)}/>
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  form: state.form,
  account: state.account,
  group: state.group,
}))(GroupCreate);
