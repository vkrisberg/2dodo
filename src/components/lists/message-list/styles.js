import {StyleSheet} from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled.View`
  flex: 1;
  flexDirection: column;
  padding: 15px;
  height: ${props => props.height};
`;
