import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 140,
    flexDirection: 'row'
  },

  track: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    width: 9,
    height: 9,
    borderRadius: 70
  },

  bar: {
    backgroundColor: 'white',
    width: 9,
    height: 9,
    position: 'absolute',
    left: 0,
    top: 0,
  },

  itemImage: {
    width: 130,
    height: 206,
    marginBottom: 40,
    marginTop: 80
  },

  towers: {
    position: 'absolute',
    width: 202,
    height: 134,
    marginTop: 150,
    left: '20%'
  },

  itemWrap: {
    alignItems: 'center'
  },

  itemTitle: {
    color: 'white'
  },

  itemText: {
    width: 236,
    textAlign: 'center',
    color: 'white'
  },
  
  skip: {
    marginBottom: 75,
    color: 'white'
  }
  
});