import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {Header, TitleContainer, StyledTitle} from '../styles';
import Wrapper from '../../../components/layouts/wrapper';
import {ArrowIcon} from '../../../components/icons';
import {SearchInput, Button} from '../../../components/elements';
import {contactActions} from '../../../store/actions';

class AddContacts extends Component {
  
  state = {
    value: null
  }

  goBack = () => this.props.navigation.goBack();

  onSearchChange = (value) => {
    return this.setState({value});
  }

  addContact = () => {
    return this.props.dispatch(contactActions.create(this.state.value));
  }

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
        <Button style={{marginTop: 30}} color="black" onPress={() => {}}>
          Add contact
        </Button>
      </Wrapper>
    );
  }
}

export default connect()(AddContacts);
