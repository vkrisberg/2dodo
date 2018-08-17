import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import PropTypes from 'prop-types';
import {get} from 'lodash';

import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Navbar, ButtonBack, ButtonNavbar, Loader} from '../../../components/elements';
import {ProfileUserForm} from '../../../components/forms';
import styles from './styles';
import {accountActions, groupActions} from '../../../store/actions';

class ProfileSettings extends Component {
  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    form: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.styles = styles(theme);
  }

  componentDidMount() {
    this.props.dispatch(groupActions.loadList());
  }

  renderNavbarButton = () => {
    const {account} = this.props;

    return (
      <ButtonNavbar
        position="right"
        onPress={this.onDone}
        color={colors[this.props.account.user.theme].blueCornFlower}
        disabled={!account.net.connected || account.loading || account.updating}>
        {this.context.t('Done')}
      </ButtonNavbar>
    );
  };

  onDone = () => {
    const data = get(this.props.form, 'profileUser.values', {});
    const errors = get(this.props.form, 'profileUser.syncErrors', false);

    if (errors) {
      this.props.dispatch(submit('profileUser'));
      return false;
    }

    const sendData = {
      firstName: data.firstName,
      secondName: data.secondName,
      phones: [data.phones['0']],
      nickname: data.nickname,
      bio: data.bio,
      avatar: data.avatar,
    };

    this.props.dispatch(accountActions.updateProfile(sendData))
      .then(() => {
        this.props.navigation.goBack();
      });
  };

  onExit = () => {
    this.props.dispatch(accountActions.logout());
  };

  onDelete = () => {
    const {context} = this;

    Alert.alert(
      context.t('DeleteAccount'),
      context.t('DeleteAccountConfirm'),
      [
        {text: context.t('Cancel')},
        {
          text: context.t('Delete'), onPress: () => {
            this.props.dispatch(accountActions.deleteAccount());
          }
        }
      ],
      {cancelable: false},
    );
  };

  onAddBtn = () => {
  };

  onGroups = () => this.props.navigation.goBack();

  onSound = () => this.props.navigation.goBack();

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {theme} = this.props.account.user;

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme}>
          {(account.updating || account.loading) && <Loader/>}
          <Navbar
            renderTitle={context.t('MyProfile')}
            renderLeft={<ButtonBack/>}
            renderRight={this.renderNavbarButton()}/>
          <View style={[this.styles.body, this.styles.bodyProfile]}>
            <ProfileUserForm
              theme={theme}
              context={context}
              initialValues={Object.assign({}, account.user, {group: group.list})}
              onSubmit={() => {
              }}
              onAddBtn={this.onAddBtn}
              onGroups={this.onGroups}
              onSound={this.onSound}
              onExit={this.onExit}
              onDelete={this.onDelete}/>
          </View>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  group: state.group,
  form: state.form,
}))(ProfileSettings);
