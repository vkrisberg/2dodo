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
    if (!data.username) {
      this.goBack();
      return;
    }

    data.username = data.username.toLowerCase();
    data.nickname = data.username.split('@')[0];

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
        <KeyboardAvoidingView behavior="padding" enabled>
          <AddContactForm onSubmit={this.addContact}/>
        </KeyboardAvoidingView>
      </Wrapper>
    );
  }
}

export default connect()(AddContact);
