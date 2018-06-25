import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ModalQuestion} from '../../../components/modals';
import {contactActions} from '../../../store/actions';

class RequestProfileModal extends Component {

  static propTypes = {
    account: PropTypes.object,
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.contact.updatePubKey
      && this.props.contact.updatePubKey
      && this.props.contact.updatePubKey.publicKey) {
      this.sendProfile();
    }
  }

  sendProfile = () => {
    const contact = this.props.contact.updatePubKey;
    this.props.dispatch(contactActions.sendProfile([contact]));
    this.props.navigation.goBack();
  };

  onCancel = () => {
    this.props.navigation.goBack();
  };

  onAccept = () => {
    const username = this.props.contact.receiveRequestProfile;
    this.props.dispatch(contactActions.updatePublicKey(username));
  };

  render() {
    const {account, contact} = this.props;
    const {theme} = account.user;

    return (
      <ModalQuestion
        theme={theme}
        title={this.context.t('ProfileRequest')}
        description={this.context.t('ProfileRequestDescription', {username: contact.receiveRequestProfile})}
        acceptLabel={this.context.t('Accept')}
        cancelLabel={this.context.t('Cancel')}
        onAccept={this.onAccept}
        onCancel={this.onCancel}/>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(RequestProfileModal);
