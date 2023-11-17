import { StyleSheet } from 'react-native';

import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from './palette';



export const home_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: 40
  },
  item:{
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 13,
    paddingVertical: 15,
    borderRadius: 10
    
  },
  nameCity:{
    color: TEXTCOLOR,
    
  },
  nameTypeProperties:{
    color: TEXTCOLOR
  },
  containerItemPropertie:{
    margin:13,
  },
  imageProperties:{
    width: 'auto',
    height: 300,
    borderRadius: 20
  },
  containerInfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  map:{
    position: 'absolute',
    top: 670,
    left: '39%',
    flexDirection: 'row',
    backgroundColor: '#000',
    padding:10,
    gap: 10,
    borderRadius: 20
  },
  textMap:{
    color: 'white'
  }
});
