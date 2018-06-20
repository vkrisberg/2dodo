import {StyleSheet} from 'react-native';
import styled from 'styled-components';

import {colors, fonts, sizes, weights} from '../../styles';

export const StyledText = styled.Text`
  color: ${colors.light.white};
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: ${weights.medium};
  text-align: center;
  margin-top: 18;
  margin-bottom: 30;
`;

export const StyledRegistration = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${sizes.isIphone5 ? '0' : '65'};
`;

export const RegistrationLabel = styled.Text`
  color: ${colors.light.grayDarker};
  font-family: '${fonts.main}';
  font-size: 15;
  font-weight: ${weights.medium};
`;

export const LoginStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    marginTop: 60,
  },

  forgot: {
    marginTop: 15,
  },

  keysImportContainer: {
    width: 315,
    borderTopWidth: 1,
    borderColor: colors.light.loginBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  keysImportButton: {
    borderWidth: 0,
    height: 'auto',
    padding: 10,
    marginTop: sizes.isIphone5 ? 0 : 5,
  },
});
