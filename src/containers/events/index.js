import React, { Component } from 'react';

import Carousel from '../../components/elements/carousel';
import slideEnum from './enums/slideEnum';

export default class Events extends Component {
  render() {
    return (
      <Carousel data={slideEnum} />
    );
  }
}