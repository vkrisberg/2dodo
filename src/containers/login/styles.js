import {StyleSheet} from 'react-native';
import styled from 'styled-components';

import {colors, fonts} from '../../styles';
import {Link} from '../../components/elements';

export const StyledText = styled.Text`
  color: ${colors.white};
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: 600;
  text-align: center;
  margin-top: 20;
  margin-bottom: 30;
`;

export const StyledLink = styled(Link)`
  margin-top: 20;
  margin-bottom: 10;
  align-self: center;
`;

export const StyledRegistration = styled.View`
  flex-direction: row;
  align-self: center;
  margin-top: 25px;
`;

export const StyledKeysImport = styled.Text`
  color: #808694;
  font-weight: bold;
  margin-top: 45px;
  text-align: center;
`;

export const RegistrationLabel = styled.Text`
  margin-right: 10;
  color: #ced9e8;
`;

export const LoginStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    marginTop: 60,
  },

  link: {
    fontWeight: 'bold',
  },
});
