import { StyleSheet } from 'react-native';

import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER, SECUNDARY, TEXTCOLOR_02 } from './palette';



export const home_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: 40
  },
  item:{
    paddingHorizontal: 16,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  nameCity:{
    color: TEXTCOLOR,
    
  },
  nameTypeProperties:{
    color: TEXTCOLOR,
    fontWeight: 'bold'
  },
  containerItemPropertie:{
    margin:13,
    
  },
  imageProperties:{
    width: 'auto',
    height: 230,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0,  0, 0.1)',
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
  },
  header:{
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  headerTitle:{
    color: "#000",
    fontSize: 25,
    fontWeight: '900',
  },
  containerIcon:{
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: '#cfcfd1'
  },
  containerFilter:{
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 10
  },
  containerInput:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    padding: 7,
    gap: 10,
    borderRadius: 50,
    borderColor: '#cfcfd1'
  },
  details:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 4
  },
  details2:{
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  favorites:{
    position: 'absolute',
    left: 290,
    top: 20
  },
  tag:{
    position: 'absolute',
    left:20,
    padding: 7,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10
  },
  textTag:{
    color: 'white'
  },
  price:{
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 13
  },
  textPrice:{
    fontWeight: 'bold'
  },
});
