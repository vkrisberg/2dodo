import styled from 'styled-components';

export const StyledTitle = {
  'padding-top': '80px'
};

export const Description = styled.Text`
  align-self: center;
  text-align: center;
  margin: 0 26px;
  width: 280;
  margin-bottom: ${props => props.marginBottom || 0}
`;

export const DescriptionWrapper = styled.View`
  width: 100;
  margin-bottom: 25;
`;

export const ButtonWrapper = styled.View`
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 30;
`;

export const StyledImage = styled.View`
  width: 70;
  height: 70;
  background-color: #e4e4e4;
  margin-bottom: 15;
  border-radius: 70;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  align-items: center;
`;
