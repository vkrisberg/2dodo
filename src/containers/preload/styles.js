import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },

  background: {
    position: 'absolute',
    resizeMode: 'cover'
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 20
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoTitle: {
    width: 122,
    height: 31
  },

  text: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 75,
    fontSize: 15,
    color: 'white'
  },

  waves: {
    position: 'absolute',
    height: 35,
    resizeMode: 'center',
    bottom: 0
  }
});