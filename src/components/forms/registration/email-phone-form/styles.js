
import styled from 'styled-components';
import {Field} from 'redux-form';

export const StyledTitle = {
  'padding-top': '100px'
};

export const Description = styled.Text`
  align-self: center;
  text-align: center;
  margin: 0 26px;
  width: 240;
`;

export const DescriptionWrapper = styled.View`
  width: 100%;
  margin-bottom: 26;
`;

export const Security = styled.Text`
  color: #ced9e8;
  position: absolute;
`;

export const StyledCheckbox = styled(Field)`
  margin-left: 150;
  flex-direction: row;
`;

export const SecurityContainer = styled.View`
  margin-top: 10;
  margin-bottom: 25;
`;

export const Container = styled.View`
  align-items: center;
`;

export const SkipWrapper = styled.View`
  flexDirection: row
`;

export const SvgWrapper = styled.View`
  margin-top: 6;
`;

export const Skip = styled.Text`
  margin-bottom: 75;
  margin-right: 8;
  color: white;
`;
