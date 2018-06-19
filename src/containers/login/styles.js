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
  margin-top: ${sizes.isIphone5 ? '0' : '70'};
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  keysImportButton: {
    backgroundColor: colors.light.whiteSmoke,
    borderColor: colors.light.whiteSmoke,
    width: 132,
    height: 37,
    marginTop: sizes.isIphone5 ? 0 : 10,
  },
});
