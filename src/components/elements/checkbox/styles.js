import styled from 'styled-components';

export const Label = styled.Text`
  color: ${props => props.color || 'black'};
  padding-right: ${({paddingLeft, label}) => paddingLeft ? paddingLeft :  label ? 60 : 0};
`;

export const CommonWrapper = styled.View`
  flex-direction: row;
`;
