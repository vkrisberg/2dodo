import {Animated, StyleSheet} from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ItemImage = styled.Image`
  margin-top: ${props => props.isSmall ? '100' : '160'};
`;

export const TitleText = styled.Text`
  font-size: 18;
  font-weight: 800;
  margin-top: 30;
  text-align: center;
  color: white;
`;

export const ItemText = styled.Text`
  font-size: 15;
  font-weight: 600;
  margin-top: 12;
  text-align: center;
  color: white;
  padding-horizontal: 50;
  line-height: 18;
`;

export const ItemWrap = styled.View`
  align-items: center;
  width: ${props => props.width};
`;

export const BarContainer = styled.View`
  position: absolute;
  zIndex: 2;
  bottom: ${props => props.isSmall ? '110' : '140'};
  flex-direction: row;
`;

export const Track = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  width: 7;
  height: 7;
  border-radius: 14;
  margin-left: ${props => props.marginLeft}
`;

export const Bar = Animated.createAnimatedComponent(styled.View`
  background-color: white;
  opacity: ${props => props.isActive ? '1' : '0.3'};
  width: 7;
  height: 7;
  position: absolute;
  left: 0;
  top: 0;
`);
