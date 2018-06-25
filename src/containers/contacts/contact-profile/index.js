import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {colors} from '../../../styles';
import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ArrowIcon} from '../../../components/icons';
import {Button, Profile} from '../../../components/elements';
import {ProfileForm} from '../../../components/forms';
import styles from './styles';

class ContactProfile extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  goBack = () => this.props.navigation.goBack();

  onEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  onAvatar = () => alert('click on avatar');

  onShowQrCode = () => alert('click on show QR-code');

  onWriteBtn = () => alert('click on write btn');

  onCallBtn = () => alert('click on call btn');

  onKeysBtn = () => alert('click on keys btn');

  onFilesBtn = () => alert('click on media files btn');

  onSettings = () => this.props.navigation.goBack();

  onShareBtn = () => alert('click on share btn');

  onNotifications = () => this.props.navigation.goBack();

  onBlockUser = () => alert('click on block user btn');

  onClearHistory = () => alert('click on clear history btn');

  onDelete = () => alert('click on delete btn');

  onRemoveBtn = () => alert('click on remove btn');

  onAddBtn = () => alert('click on add btn');

  onGroups = () => this.props.navigation.goBack();

  onSound = () => this.props.navigation.goBack();

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const {editMode} = this.state;
    const _styles = styles(theme);
    let user = this.props.navigation.getParam('data');

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
              <Button
                style={_styles.editBtn}
                color={colors[theme].blue}
                onPress={this.onEdit}>
                {editMode ? context.t('Done') : context.t('Edit')}
              </Button>
            </View>
          </View>
          <View style={[_styles.body, _styles.bodyProfile]}>
            {
              editMode ?
                <ProfileForm
                  theme={theme}
                  context={context}
                  user={user}
                  onAvatar={this.onAvatar}
                  onRemoveBtn={this.onRemoveBtn}
                  onAddBtn={this.onAddBtn}
                  onGroups={this.onGroups}
                  onNotifications={this.onNotifications}
                  onSound={this.onSound}
                  onDelete={this.onDelete}/> :
                <Profile
                  theme={theme}
                  context={context}
                  user={user}
                  onAvatar={this.onAvatar}
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
}))(ContactProfile);
