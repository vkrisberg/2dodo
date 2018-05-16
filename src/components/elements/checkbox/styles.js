import styled from 'styled-components';

export const Label = styled.Text`
  color: ${props => props.color || 'black'};
  padding-right: ${({paddingLeft}) => paddingLeft ? paddingLeft : 60};
`;

export const CommonWrapper = styled.View`
  flex-direction: row;
`;
