import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import {BackgroundLayout} from '../../components/layouts';
import Carousel from '../../components/elements/carousel';
import slideEnum from './enums/slideEnum';
import {storageEnum, routeEnum} from '../../enums';
import CONFIG from '../../config';

export default class Events extends Component {
  onSkip = () => {
    const {navigation} = this.props;
    AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`, 'true');
    navigation.replace(routeEnum.Login);
  };

  render() {
    return (
      <BackgroundLayout>
        <Carousel data={slideEnum} onSkip={this.onSkip}/>
      </BackgroundLayout>
    );
  }
}
