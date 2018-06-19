import React, {PureComponent} from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import RegistrationLoginForm from './login-form';
import RegistrationEmailForm from './email-form';
import RegistrationSettingsForm from './settings-form';
import {phonePrefixEnum} from '../../../enums';
import {sizes} from '../../../styles';

export default class RegistrationForm extends PureComponent {

  static propTypes = {
    context: PropTypes.object,
    account: PropTypes.object,
    onRegister: PropTypes.func,
    onSettings: PropTypes.func,
    onAvatar: PropTypes.func,
    onTheme: PropTypes.func,
  };

  state = {
    page: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.scrollView.scrollTo({
        x: this.state.page * sizes.windowWidth,
        y: 0,
        animated: true,
      });
    }
  }

  previousPage = () => {
    this.setState({page: this.state.page - 1});
  };

  nextPage = () => {
    this.setState({page: this.state.page + 1});
  };

  onScrollStart = (event) => {
    this.startX = event.nativeEvent.locationX;
  };

  onScrollEnd = (event) => {
    const direction = event.nativeEvent.locationX > this.startX ? 'back' : 'forward';

    if (this.state.page > 0 && direction === 'back') {
      this.previousPage();
    }
  };

  onRegister = (data) => {
    if (this.props.onRegister) {
      this.props.onRegister(data).then((result) => {
        result && this.nextPage();
      });
    }
  };

  render() {
    const {context, account, onSettings, onAvatar, onTheme} = this.props;
    const {theme} = account.user;
    const server = `http${account.isSecure ? 's' : ''}://${account.hostname}`;

    return (
      <View onStartShouldSetResponder={() => true}
            onResponderGrant={this.onScrollStart}
            onResponderRelease={this.onScrollEnd}>
        <ScrollView
          ref={ref => this.scrollView = ref}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={0}>

          <RegistrationLoginForm theme={theme}
                                 context={context}
                                 defaultServer={server}
                                 initialValues={{page: 0}}
                                 onSubmit={this.nextPage}/>
          <RegistrationEmailForm theme={theme}
                                 context={context}
                                 initialValues={{phonePrefix: phonePrefixEnum.rus}}
                                 onSubmit={this.onRegister}/>
          <RegistrationSettingsForm theme={theme}
                                    context={context}
                                    user={account.user}
                                    initialValues={account.user}
                                    onAvatar={onAvatar}
                                    onTheme={onTheme}
                                    onSubmit={onSettings}/>

        </ScrollView>
      </View>
    );
  }
}
