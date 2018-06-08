import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {fonts} from '../../../styles';

export const SkipWrapper = styled.View`
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
  flexDirection: row;
  padding: 15px;
`;

export const StyledSkip = styled.Text`
  font-family: '${fonts.main}';
  font-weight: 600;
  margin-right: 8;
  color: ${({color}) => color || 'white'};
`;

export const SvgWrapper = styled.View`
  margin-top: 6;
`;

export const Styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FF0000',
  },
});
