import {StyleSheet} from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled.View`
  flexDirection: row;
  width: 100%;
`;

export const StyledInput = styled.TextInput`
  flex: 2;
  height: 64;
  border-color: #000000;
  border-radius: 32;
  border-width: 1;
  color: #000000;
  padding: 0 15px;
`;

export const ButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 64,
    width: 64,
  },

  wrapper: {
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 32,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,
  },

  text: {
    fontSize: 18,
    color: '#000000'
  },
});
