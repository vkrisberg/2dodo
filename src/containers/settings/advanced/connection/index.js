import React, {Component} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {MainLayout, BackgroundLayout} from '../../../../components/layouts/index';
import {Navbar, ButtonBack, Button} from '../../../../components/elements/index';
import styles from './styles';

import connectionIcon from './img/connection.png';
import connectionIconGray from './img/connection_gray.png';

const connectionInfo = {
  location: 'Russia, Novosibirsk',
  ip: '168.190.120.69: 74770',
  device: 'iPhone 8 Gray 64 Gb',
  date: '2018-07-04T20:24:27.732Z',
  lastVisit: '48 minutes online',
};

const authorizationDevices = [
  {
    ip: '168.190.120.69: 74771',
    device: 'iPhone 7 Plus',
    date: '2018-07-01T20:24:27.732Z',
    lastVisit: '4 days ago',
  },
  {
    ip: '168.190.120.69: 74772',
    device: 'Macbook Pro 2016',
    date: '2018-07-01T20:24:27.732Z',
    lastVisit: '2 days ago',
  },
];

class Connection extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  renderConnectionItem = (data, grayIcon, borderBottom) => {
    const {context} = this;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);
    const date = moment(data.date);
    const isToday = date.format('DD.MM.YY') === moment().format('DD.MM.YY');

    return (
      <View style={_styles.connectionBlock} key={data.ip}>
        <Image source={grayIcon ? connectionIconGray : connectionIcon} style={_styles.connectionIcon}/>
        <View style={[_styles.connectionInfo, !borderBottom && {borderBottomWidth: 0}]}>
          {data.location && <Text style={[_styles.defaultText, _styles.semiBoldText]}>{data.location}</Text>}
          <Text style={_styles.defaultText}>
            {`${context.t('IpAddress')}: ${data.ip}`}
          </Text>
          <Text style={_styles.defaultText}>{data.device}</Text>
          {isToday && <Text style={_styles.defaultText}>{`${context.t('ConnectFrom')} ${date.hours()}:${date.minutes()}`}</Text>}
          <Text style={_styles.grayText}>{data.lastVisit}</Text>
        </View>
      </View>
    );
  };

  onConfigurate = () => alert('click on configurate');

  render() {
    const {context} = this;
    const {account} = this.props;
    const {theme} = this.props.account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={account.user.theme} paddingHorizontal={10}>
          <Navbar renderTitle={context.t('Connection')} renderLeft={<ButtonBack/>}/>
          <ScrollView style={_styles.container}>
            <Text style={[_styles.grayText, {marginTop: 10}]}>{context.t('ConnectionInformation')}</Text>
            {this.renderConnectionItem(connectionInfo, false, false)}
            <Text style={[_styles.grayText, _styles.topBorder]}>{context.t('AuthorizationDevices')}</Text>
            {authorizationDevices.map( item =>
              this.renderConnectionItem(item, true, true)
            )}
          </ScrollView>
          <View style={_styles.bottomBlock}>
            <Button
              style={_styles.button}
              textStyle={_styles.buttonText}
              onPress={this.onConfigurate}>
              {context.t('ConfiguringDevices')}
            </Button>
          </View>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
}))(Connection);
