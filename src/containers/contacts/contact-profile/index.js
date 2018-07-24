import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import {get, values} from 'lodash';
import PropTypes from 'prop-types';

import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {Profile, Navbar, ButtonBack, ButtonNavbar} from '../../../components/elements';
import {ProfileForm} from '../../../components/forms';
import {chatActions, contactActions} from '../../../store/actions';
import styles from './styles';
import {routeEnum} from '../../../enums';
import {chatMessage} from '../../../store/reducers';

class ContactProfile extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    form: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
    errors: false,
  };

  constructor(props) {
    super(props);

    const contact = props.navigation.getParam('data');
    props.dispatch(contactActions.setCurrent(contact));
  }

  renderNavbarButton = (_styles, theme) => {
    const {editMode, errors} = this.state;

    return (
      <ButtonNavbar
        position="right"
        color={colors[theme].blueCornFlower}
        disabled={!!errors}
        onPress={editMode ? this.onDone : this.onEdit}>
        {editMode ? this.context.t('Done') : this.context.t('Edit')}
      </ButtonNavbar>
    );
  };

  goBack = () => this.props.navigation.goBack();

  onDone = () => {
    const data = get(this.props.form, 'profile.values', {});
    const errors = get(this.props.form, 'profile.syncErrors', false);

    if (errors) {
      // submit form to show errors
      this.props.dispatch(submit('profile'));
      return false;
    }

    data.phones = [data.phones['0']];
    data.groups = values(data.groups);
    this.props.dispatch(contactActions.update(data)).then(() => {
      this.props.dispatch(chatActions.loadList());
      this.props.dispatch(chatActions.updateCurrentChat());
    });

    this.setState({
      editMode: false,
    });
  };

  onEdit = () => {
    this.setState({
      editMode: true,
    });
  };

  onShowQrCode = () => alert('click on show QR-code');

  createChat = (contacts) => {
    return this.props.dispatch(
      chatActions.create(contacts)
    );
  };

  onWriteBtn = () => {
    this.createChat([this.props.contact.current]).then((chat) => {
      this.props.navigation.replace(routeEnum.ChatMessage, {chat});
    });
  };

  onCallBtn = () => alert('click on call btn');

  onKeysBtn = () => alert('click on keys btn');

  onFilesBtn = () => alert('click on media files btn');

  onSettings = () => alert('click on settings files btn');

  onShareBtn = () => alert('click on share btn');

  onNotifications = () => alert('click on notifications files btn');

  onBlockUser = () => alert('click on block user btn');

  onClearHistory = () => alert('click on clear history btn');

  onDelete = (username) => {
    const {context} = this;

    Alert.alert(
      context.t('DeleteContact'),
      context.t('DeleteContactConfirm'),
      [
        {text: context.t('Cancel')},
        {
          text: context.t('Delete'), onPress: () => {
            if (this.state.editMode) {
              this.setState({
                editMode: false,
              });
            }
            this.props.dispatch(contactActions.delete(username)).then(() => {
              this.props.dispatch(chatActions.loadList());
            });
            this.goBack();
          }
        },
      ],
      {cancelable: false},
    );
  };

  onRemoveBtn = () => alert('click on remove btn');

  onAddBtn = () => alert('click on add btn');

  onGroups = () => alert('click on groups files btn');

  onSound = () => alert('click on sounds files btn');

  renderForm = () => {
    const {account, contact} = this.props;
    const {theme} = account.user;

    if (!contact.current.username) {
      return null;
    }

    if (this.state.editMode) {
      return (
        <ProfileForm
          theme={theme}
          context={this.context}
          initialValues={contact.current}
          onSubmit={() => {}}
          onRemoveBtn={this.onRemoveBtn}
          onAddBtn={this.onAddBtn}
          onGroups={this.onGroups}
          onNotifications={this.onNotifications}
          onSound={this.onSound}
          onDelete={this.onDelete}/>
      );
    }

    return (
      <Profile
        theme={theme}
        context={this.context}
        user={contact.current}
        onShowQrCode={this.onShowQrCode}
        onWriteBtn={this.onWriteBtn}
        onCallBtn={this.onCallBtn}
        onKeysBtn={this.onKeysBtn}
        onFilesBtn={this.onFilesBtn}
        onSettings={this.onSettings}
        onShareBtn={this.onShareBtn}
        onNotifications={this.onNotifications}
        onBlockUser={this.onBlockUser}
        onClearHistory={this.onClearHistory}
        onDelete={this.onDelete}/>
    );
  };

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = account.user;
    const {editMode} = this.state;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar
            style={_styles.navbar}
            renderTitle={editMode ? context.t('EditUser') : context.t('ContactProfile')}
            renderLeft={<ButtonBack/>}
            renderRight={() => this.renderNavbarButton(_styles, theme, context)}/>

          <View style={[_styles.body, _styles.bodyProfile]}>
            {this.renderForm()}
          </View>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
  form: state.form,
  chat: state.chat,
}))(ContactProfile);
