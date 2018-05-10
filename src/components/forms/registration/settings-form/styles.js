import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  title: {
    paddingTop: 30
  },

  description: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 26,
    width: 280
  },

  descriptionWrapper: {
    width: '100%',
    marginBottom: 25
  },

  themeButton: {
    width: 130,
    height: 70,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    justifyContent: 'center'
  },

  themeButtonText: {
    alignSelf: 'center',
  },

  buttonWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 30
  },

  image: {
    width: 80,
    height: 80,
    backgroundColor: '#e4e4e4',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 70
  }
});