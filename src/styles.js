import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('window');

export default {
  input: {
    // height: 40,
    borderColor: '#000',
    borderWidth: 0.5,
    marginBottom: 16,
    paddingHorizontal: 8,
    // backgroundColor: '#fff',
    width: width * 0.7,
    alignSelf: 'center',
    // borderRadius: 12,
    paddingLeft: 12,
  },
  btnView: {
    backgroundColor: '#8E44AD',
    padding: 14,
    elevation: 4,
    borderRadius: 12,
    width: width * 0.7,
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  activeTab: {
    fontSize: 18,
    borderBottomColor: '#666666',
    textAlign: 'center',
    padding: 10,
    width: width * 0.4,
    color: '#fff',
    height: 45,
    backgroundColor: '#8E44AD',
    fontFamily: 'KoHo-Bold',
    borderRadius: 10,
  },

  tabstyle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    width: width * 0.4,
    height: 45,
    padding: 10,
    color: '#fff',
    fontFamily: 'KoHo-Light',
    backgroundColor: '#D7BDE2',
    borderRadius: 10,
  },
  sideHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#707B7C',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212F3D',
  },
};
