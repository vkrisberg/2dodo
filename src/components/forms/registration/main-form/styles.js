import {StyleSheet } from 'react-native';
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

export const ServerInput = styled(Field)`
  margin-top: 10;
  margin-bottom: 30;
`;

export const NicknameView = styled.View`
  margin-bottom: 20px;
`;

export const Container = styled.View`
  align-items: center;
  padding-top: 100;
`;
