import Reactotron from 'reactotron-react-native'
import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {get, values} from 'lodash';
import PropTypes from 'prop-types';

import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ArrowIcon} from '../../../components/icons';
import {Button, Profile} from '../../../components/elements';
import {ProfileForm} from '../../../components/forms';
import {contactActions} from '../../../store/actions';
import styles from './styles';

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
  };

  constructor(props) {
    super(props);

    const contact = props.navigation.getParam('data');
    props.dispatch(contactActions.setCurrent(contact));
  }

  goBack = () => this.props.navigation.goBack();

  onDone = () => {
    const data = get(this.props.form, 'profile.values', {});
    data.phones = values(data.phones);
    data.groups = values(data.groups);
    this.props.dispatch(contactActions.update(data));

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

  onWriteBtn = () => alert('click on write btn');

  onCallBtn = () => alert('click on call btn');

  onKeysBtn = () => alert('click on keys btn');

  onFilesBtn = () => alert('click on media files btn');

  onSettings = () => alert('click on settings files btn');

  onShareBtn = () => alert('click on share btn');

  onNotifications = () => alert('click on notifications files btn');

  onBlockUser = () => alert('click on block user btn');

  onClearHistory = () => alert('click on clear history btn');

  onDelete = () => alert('click on delete btn');

  onRemoveBtn = () => alert('click on remove btn');

  onAddBtn = () => alert('click on add btn');

  onGroups = () => alert('click on groups files btn');

  onSound = () => alert('click on sounds files btn');

  render() {
    const {context} = this;
    const {account, contact} = this.props;
    const {theme} = account.user;
    const {editMode} = this.state;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={theme}>
          <View style={_styles.header}>
            <View style={_styles.titleContainer}>
              <TouchableOpacity onPress={this.goBack}>
                <ArrowIcon />
              </TouchableOpacity>
              <Text style={_styles.styledTitle}>
                {editMode ? context.t('EditUser') : context.t('ContactProfile')}
              </Text>
              {
                editMode ?
                  <Button
                    style={_styles.editBtn}
                    color={colors[theme].blue}
                    onPress={this.onDone}>
                    {context.t('Done')}
                  </Button> :
                  <Button
                    style={_styles.editBtn}
                    color={colors[theme].blue}
                    onPress={this.onEdit}>
                    {context.t('Edit')}
                  </Button>
              }
            </View>
          </View>
          <View style={[_styles.body, _styles.bodyProfile]}>
            {
              editMode ?
                contact.current.username && <ProfileForm
                  theme={theme}
                  context={context}
                  initialValues={contact.current}
                  onRemoveBtn={this.onRemoveBtn}
                  onAddBtn={this.onAddBtn}
                  onGroups={this.onGroups}
                  onNotifications={this.onNotifications}
                  onSound={this.onSound}
                  onDelete={this.onDelete}/> :
                contact.current.username && <Profile
                  theme={theme}
                  context={context}
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
            }
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
}))(ContactProfile);
