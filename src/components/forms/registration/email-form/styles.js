import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, weights} from '../../../../styles';

export default (theme) => {
  return StyleSheet.create({
    container: {
      height: sizes.windowHeight,
      width: sizes.windowWidth,
      alignItems: 'center',
    },

    wrapper: {
      width: 280,
    },

    title: {
      marginTop: 95,
    },

    description: {
      marginTop: 10,
    },

    serverInput: {
      marginTop: 15,
      marginBottom: 0,
    },

    inputContainer: {
      marginTop: 25,
    },

    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
    },

    skipContainer: {
      position: 'absolute',
      bottom: 0,
    },

    phoneInput: {
      paddingLeft: 95,
      paddingRight: 20,
    },

    phonePrefixContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 40,
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    phonePrefixPipe: {
      marginLeft: 8,
      fontSize: 24,
      fontWeight: weights.light,
    },
  });
}

// import styled from 'styled-components';
// import {Field} from 'redux-form';
//
// export const Description = styled.Text`
//   align-self: center;
//   text-align: center;
//   margin: 0 26px;
//   width: 240;
// `;
//
// export const DescriptionWrapper = styled.View`
//   width: 100%;
//   margin-bottom: 26;
// `;
//
// export const Security = styled.Text`
//   color: #ced9e8;
//   position: absolute;
// `;
//
// export const StyledCheckbox = styled(Field)`
//   margin-left: 150;
//   flex-direction: row;
// `;
//
// export const SecurityContainer = styled.View`
//   margin-top: 10;
//   margin-bottom: 25;
// `;
//
// export const Container = styled.View`
//   align-items: center;
//   padding-top: 100;
// `;
//
// export const SkipWrapper = styled.View`
//   flexDirection: row
// `;
//
// export const SvgWrapper = styled.View`
//   margin-top: 6;
// `;
//
// export const Skip = styled.Text`
//   margin-bottom: 75;
//   margin-right: 8;
//   color: white;
// `;
