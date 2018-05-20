import styled from 'styled-components';

export const Tabs = styled.View`
  flex-direction: row;
  backgroundColor: white;
  position: absolute;
  bottom: 0;
`;

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 20;
`;

export const StyledText = styled.Text`
  font-size: ${props => props.fontSize}
  color: ${props => props.color};
  position: absolute;
  bottom: 10;
`;