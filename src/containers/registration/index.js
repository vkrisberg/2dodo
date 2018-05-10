import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MainForm from '../../components/forms/registration/main-form';
import EmailPhoneForm from '../../components/forms/registration/email-phone-form';
import SettingsForm from '../../components/forms/registration/settings-form';
import styles from './styles';
import routeEnum from '../../enums/route-enum';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 3
    };
  }

  nextPage = () => {
    return this.setState({ page: this.state.page + 1 });
  }

  previousPage = () => {
    return this.setState({ page: this.state.page - 1 });
  }

  handleSubmit = (data) => {
    console.log(data);

    return this.props.navigation.navigate(routeEnum.Login);
  }

  render() {
    const { page } = this.state;

    return(
      <View style={styles.container}>
        { page === 1 && <MainForm onSubmit={this.nextPage} /> }
        { page === 2 && <EmailPhoneForm previousPage={this.previousPage} onSubmit={this.nextPage} /> }
        { page === 3 && <SettingsForm previousPage={this.previousPage} onSubmit={this.handleSubmit} /> }
      </View>
    );
  }
}

export default Registration;