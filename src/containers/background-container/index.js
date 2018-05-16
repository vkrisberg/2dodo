import React, {PureComponent} from 'react';

import {Container, Background, Waves} from './styles';
import backgroundImage from './img/background.jpg';
import wavesImage from './img/waves.png';

export default class BackgroundContainer extends PureComponent{
  render() {
    const { children, image } = this.props;
    
    return (
      <Container>
        <Background source={image ? image : backgroundImage} />
        { children }
        <Waves source={wavesImage} />
      </Container>
    );
  }
}