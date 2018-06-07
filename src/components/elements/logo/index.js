import React, {PureComponent} from 'react';

import {LogoContainer, LogoIcon, LogoTitleIcon} from './styles';
import logoIcon from './img/logo.png';
import logoTitleIcon from './img/title.png';

export default class Logo extends PureComponent {

  static defaultProps = {
    flex: true
  }

  render() {
    const {flex, style} = this.props;

    return (
      <LogoContainer isFlex={flex} style={style}>
        <LogoIcon source={logoIcon}/>
        <LogoTitleIcon source={logoTitleIcon}/>
      </LogoContainer>
    );
  }
}
