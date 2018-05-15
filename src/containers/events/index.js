import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import Carousel from '../../components/elements/carousel';
import BackgroundContainer from '../background-container';
import slideEnum from './enums/slideEnum';
import {storageEnum, routeEnum} from '../../enums';
import CONFIG from '../../config';

export default class Events extends Component {
  onSkip = () => {
    const {navigation} = this.props;
    AsyncStorage.setItem(`${CONFIG.storagePrefix}:${storageEnum.skipEvents}`, 'true');
    navigation.navigate(routeEnum.Login);
  }

  render() {
    return (
      <BackgroundContainer>
        <Carousel data={slideEnum} onSkip={this.onSkip}/>
      </BackgroundContainer>
    );
  }
}
