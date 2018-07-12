import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';

import {BackgroundLayout} from '../../components/layouts';
import {Carousel} from '../../components/elements';
import slideEnum from './enums/slideEnum';
import {storageEnum, routeEnum} from '../../enums';
import CONFIG from '../../config';

export default class Events extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  onSkip = () => {
    const {navigation} = this.props;
    AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`, 'true');
    navigation.replace(routeEnum.Login);
  };

  render() {
    return (
      <BackgroundLayout background="preload" barStyle="light-content">
        <Carousel items={slideEnum} onSkip={this.onSkip} context={this.context}/>
      </BackgroundLayout>
    );
  }
}
