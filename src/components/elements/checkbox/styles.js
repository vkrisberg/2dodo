import styled from 'styled-components';

export const Label = styled.Text`
  color: ${props => props.color || 'black'};
  margin-right: 60;
`;

export const CommonWrapper = styled.View`
  flex-direction: row;
`;
