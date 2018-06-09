import styled from 'styled-components';
import {fonts, weights, colors} from '../../../styles';

export const Container = styled.View`
  align-items: center;
  width: 280;
`;

export const SecurityContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 25;
`;

export const SecurityText = styled.Text`
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: ${weights.medium};
  color: ${colors.light.white};
  opacity: .6;
`;

export const SecurityLabel = styled.Text`
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: ${weights.medium};
  color: ${colors.light.white};
`;
