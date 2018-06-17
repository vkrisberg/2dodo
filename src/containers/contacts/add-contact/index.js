import React, {Component} from 'react';
import {TouchableOpacity, KeyboardAvoidingView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, Button} from '../../../components/elements';
import {AddContactForm} from '../../../components/forms';
import {contactActions} from '../../../store/actions';
import styles from '../styles';

class AddContact extends Component {
   static propTypes = {
     account: PropTypes.object,
   };

   static contextTypes = {
     t: PropTypes.func.isRequired,
   };

  goBack = () => this.props.navigation.goBack();

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
        </View>
        <AddContactForm onSubmit={this.addContact}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(AddContact);
