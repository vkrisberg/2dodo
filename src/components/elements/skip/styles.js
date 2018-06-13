import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {colors, fonts, weights} from '../../../styles';

export const SkipWrapper = styled.View`
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
  flexDirection: row;
  padding: 15px;
`;

export const StyledSkip = styled.Text`
  font-family: '${fonts.main}';
  font-weight: ${weights.medium};
  margin-right: 8;
  color: ${({color}) => color || colors.light.white};
`;

export const SvgWrapper = styled.View`
  margin-top: 6;
`;
