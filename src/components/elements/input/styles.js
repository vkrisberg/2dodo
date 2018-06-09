import styled from 'styled-components';
import {fonts, weights} from '../../../styles';

const inputFocused = (props) => ({
  'border-width': 2,
  'border-color': props.focusedColor,
});

export const StyledTextInput = styled.TextInput`
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: ${weights.medium};
  height: 40;
  width: 100%;
  border-width: 1;
  border-radius: 20;
  border-color: ${props => props.borderColor};
  margin-bottom: 15;
  color: ${props => props.textColor};
  padding-horizontal: 20;
  ${props => props.focused && inputFocused(props)}
  ${props => props.style && props.style}
`;
