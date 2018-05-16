import styled from 'styled-components';

export const StyledSkip = styled.Text`
  margin-bottom: 75;
  margin-right: 8;
  color: ${({color}) => color || 'white'};
`;

export const SkipWrapper = styled.View`
  margin-top: ${({marginTop}) => marginTop || 0}
  flexDirection: row;
`;

export const SvgWrapper = styled.View`
  margin-top: 6;
`;
