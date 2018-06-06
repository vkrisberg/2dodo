import React, {Component} from 'react';
import {TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';

import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, Button} from '../../../components/elements';
import {AddContact as AddContactForm} from '../../../components/forms';
import {contactActions} from '../../../store/actions';
import {Header, TitleContainer, StyledTitle} from '../styles';
import {MessageStyles} from '../../messages/styles';

class AddContact extends Component {

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (value) => {
    return this.setState({value});
  }

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
    return (
      <Wrapper scrolled>
        <Header>
          <TitleContainer width="70%">
            <TouchableOpacity onPress={this.goBack}>
              <ArrowIcon />
            </TouchableOpacity>
            <StyledTitle marginLeft={20}>
              Add contact
            </StyledTitle>
          </TitleContainer>
        </Header>
        <SearchInput placeholder="Search contacts for @nickname" onChange={this.onSearchChange}/>
        <AddContactForm onSubmit={this.addContact}/>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(AddContact);
