import styled from 'styled-components';

const getColor = ({focusedColor}) => focusedColor ? focusedColor : 'white';

const inputFocused = (props) => ({
  'border-width': 2,
  'border-color': `${getColor(props)}`
});

export const StyledInput = styled.TextInput`
  width: 300;
  height: 45;
  border-color: #ced9e8;
  border-width: 1;
  margin-bottom: 15;
  color: ${props => props.textColor || 'black'};
  padding: 15px;
  border-radius: 40;
  ${props => props.focused && inputFocused(props)}
  ${props => props.style && props.style}
`;
