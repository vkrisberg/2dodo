import styled from 'styled-components';
import {Field} from 'redux-form';

export const Security = styled.Text`
  color: #ced9e8;
  position: absolute;
`;

export const StyledCheckbox = styled(Field)`
  margin-left: 150;
  flex-direction: row;
`;

export const Container = styled.View`
  align-items: center;
`;

export const SecurityContainer = styled.View`
  margin-top: 10;
  margin-bottom: 25;
`;
