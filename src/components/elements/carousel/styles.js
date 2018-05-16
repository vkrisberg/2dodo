import styled from 'styled-components';
import {Animated} from 'react-native';

export const TowersImage = styled.Image`
  position: absolute;
  width: 202;
  height: 134;
  margin-top: 150;
  left: 20%;
`;

export const BarContainer = styled.View`
  position: absolute;
  zIndex: 2;
  bottom: 140;
  flex-direction: row;
`;

export const ItemImage = styled.Image`
  width: 130;
  height: 206;
  margin-bottom: 40;
  margin-top: 80;
`;

export const ItemTitle = {
  color: 'white'
};

export const ItemText = styled.Text`
  width: 236;
  text-align: center;
  color: white;
`;

export const Skip = styled.Text`
  margin-bottom: 75;
  margin-right: 8;
  color: white;
`;

export const ItemWrap = styled.View`
  align-items: center;
  width: ${props => props.width};
`;

export const Bar = Animated.createAnimatedComponent(styled.View`
  background-color: white;
  width: 9;
  height: 9;
  position: absolute;
  left: 0;
  top: 0;
`);

export const Track = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  width: 9;
  height: 9;
  border-radius: 70;
  margin-left: ${props => props.marginLeft}
`;

export const SkipWrapper = styled.View`
  flexDirection: row
`;

export const SvgWrapper = styled.View`
  margin-top: 6;
`;
