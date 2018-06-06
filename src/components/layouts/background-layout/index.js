import React, {PureComponent} from 'react';

import {Background, Waves} from './styles';
import backgroundImage from './img/background.jpg';
import wavesImage from './img/waves.png';
import {Wrapper} from '../index';

export default class BackgroundContainer extends PureComponent {
  render() {
    const {children, image, barHidden} = this.props;

    return (
      <Wrapper barHidden={barHidden} scrolled={false}>
        <Background source={image ? image : backgroundImage}/>
        {children}
        <Waves source={wavesImage}/>
      </Wrapper>
    );
  }
}
