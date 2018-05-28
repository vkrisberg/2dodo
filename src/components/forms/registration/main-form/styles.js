import { StyleSheet } from 'react-native';
import styled from 'styled-components';

import {Field} from 'redux-form';

export const Description = styled.Text`
  text-align: center;
  margin: 0 26px;
  width: 240px;
`;

export const DescriptionWrapper = styled.View`
  width: 100%;
  margin-bottom: 26px;
`;

export const StyledTitle = {
  'padding-top': '100px',
  'font-weight': 'bold',
  'font-size': '16px',
  'color': 'black'
};

export const ServerInput = styled(Field)`
  margin-top: 10;
  margin-bottom: 30;
`;

export const NicknameView = styled.View`
  margin-bottom: 20px;
`;
