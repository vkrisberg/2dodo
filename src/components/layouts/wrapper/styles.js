import styled from 'styled-components';


const getViewStyles = () => ({
  alignItems: 'center',
  backgroundColor: 'white',
  flex: 1
});


export const Container = styled.View`
  ${getViewStyles()}
`;

export const ScrolledContainer = getViewStyles();