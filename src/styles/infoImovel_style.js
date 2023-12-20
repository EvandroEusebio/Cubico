import { StyleSheet } from 'react-native';

import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER, SECUNDARY, TEXTCOLOR_02 } from './palette';


export const infoImovel_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bannerImage:{
    height: 260,
    resizeMode:'cover'
  },
  
  item:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:2,
    marginRight: 10
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerIcon:{
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: '#cfcfd1'
  },
  containerInfo:{
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 20
  },
  containerUserInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profileImage:{
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#595959'
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerUser:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  containerUserContact:{
    gap: 10,
  },
  btnContact:{
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: '#cfcfd1'
  },
  galeryImage:{
    width: 90,
    height: 70,
    borderRadius: 10,
    marginRight: 10
  },
  subTitle:{
    fontSize: 17,
    fontWeight: 'bold',

  },
  containerDescription:{
    gap: 6
  },
  text:{
    textAlign:  'justify',
    color: '#848484'
  },
  iconHeart:{
    position: 'absolute',
    top: 50,
    left: 310
  },
  userDatailDiv1:{
    flexDirection: 'row',
    gap: 10,
    alignItems:'center'
  },
  userDatail:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerContactBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    gap: 10
  },
  contactBtn:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#000',
    height:60,
    borderRadius: 10,
    gap: 10
  },
  map:{
    height: 250,
    borderRadius: 10,
  },
  containerMap:{
    gap: 10
  }
});
