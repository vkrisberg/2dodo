import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput} from '../../../components/elements';
import {contactActions} from '../../../store/actions';
import styles from '../styles';
import QrIcon from './img/qr.png';

class AddContact extends Component {
   static propTypes = {
     account: PropTypes.object,
   };

   static contextTypes = {
     t: PropTypes.func.isRequired,
   };

  goBack = () => this.props.navigation.goBack();

  goQrScanner = () => this.props.navigation.goBack();

  onSearchChange = (value) => {
    return this.setState({value});
  };

  addContact = (data) => {
    const {account} = this.props;

    if (!data.nickname) {
      this.goBack();
      return;
    }

    data.nickname = data.nickname.trim().toLowerCase();
    data.username = `${data.nickname}@${account.hostname}`;

    this.props.dispatch(contactActions.create(data)).then(() => {
      this.goBack();
    });
  };

  render() {
    const {context} = this;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <Wrapper scrolled>
        <View style={_styles.header}>
          <View style={_styles.titleContainer}>
            <TouchableOpacity onPress={this.goBack}>
              <ArrowIcon />
            </TouchableOpacity>
            <Text style={_styles.styledTitle}>
              {context.t('AddContact')}
            </Text>
          </View>
        </View>
        <View style={_styles.body}>
          <SearchInput placeholder={context.t('AddContactPlaceholder')} onChange={this.onSearchChange}/>
          <View style={_styles.content}>
            <TouchableWithoutFeedback onPress={this.goQrScanner}>
              <View style={_styles.infoBlock}>
                <Image source={QrIcon}/>
                <Text style={_styles.infoText}>{context.t('AddContactQrCode')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(AddContact);
