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

  waves: {
    position: 'absolute',
    height: 35,
    resizeMode: 'center',
    bottom: 0
  }
});
