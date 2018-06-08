import styled from 'styled-components';
import {colors, fonts} from '../../../styles';

const getColor = ({focusedColor}) => focusedColor ? focusedColor : colors.white;

const inputFocused = (props) => ({
  'border-width': 2,
  'border-color': `${getColor(props)}`
});

export const StyledInput = styled.TextInput`
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: 600;
  height: 40;
  width: 100%;
  border-width: 1;
  border-radius: 20;
  border-color: #8bb3eb;
  margin-bottom: 15;
  color: ${props => props.textColor || colors.black};
  padding-horizontal: 20;
  ${props => props.focused && inputFocused(props)}
  ${props => props.style && props.style}
`;
