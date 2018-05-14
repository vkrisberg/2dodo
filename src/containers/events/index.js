import React, { Component } from 'react';

import Carousel from '../../components/elements/carousel';
import slideEnum from './enums/slideEnum';
import BackgroundContainer from '../background-container';

export default class Events extends Component {
  render() {
    return (
      <BackgroundContainer>
        <Carousel data={slideEnum} />
      </BackgroundContainer>
    );
  }
}