import styled from 'styled-components';
import {fonts} from '../../../styles';

const getColor = ({color}) => color || 'white';

export const Container = styled.View`
  align-items: center;
  ${props => props.style && props.style}
`;

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-color: ${props => getColor(props)};
  border-width: 3;
  background-color: transparent;
  width: 200;
  height: 40;
  border-radius: 20;
  ${props => props.wrapperStyle && props.wrapperStyle}
`;

export const ButtonText = styled.Text`
  color: ${props => getColor(props)};
  font-family: '${fonts.main}';
  font-size: 16;
  font-weight: 600;
  ${props => props.textStyle && props.textStyle}
`;
