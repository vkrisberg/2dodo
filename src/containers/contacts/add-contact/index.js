import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {Header, TitleContainer, StyledTitle} from '../styles';
import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, Button} from '../../../components/elements';
import {AddContact as AddContactForm} from '../../../components/forms';
import {contactActions} from '../../../store/actions';

class AddContact extends Component {

  state = {
    value: null
  }

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (value) => {
    return this.setState({value});
  }

  addContact = (data) => {
    data.username = data.username.toLowerCase();
    data.nickname = data.username.split('@')[0];

    this.props.dispatch(contactActions.create(data)).then(() => {
      this.props.navigation.goBack();
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

export default connect()(AddContact);
