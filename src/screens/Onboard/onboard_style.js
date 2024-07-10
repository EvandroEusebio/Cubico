import { StyleSheet, useWindowDimensions, Platform } from "react-native";
//import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER, TEXTCOLOR_02 } from './palette';




export const onboard_style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    resizeMode: "contain",
    width: 300,
    height: 300,
    justifyContent: "center",
    
  },
  title:{
    textAlign: 'center',
    color: '#000',
    fontSize: 28,
  },
  description:{
    textAlign: 'center',
    color: '#000',
    maxWidth: '60%'
  },
  logo:{
    width:130,
    height: 50
  },
  containerLogo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 27 : "auto"

  },
  btnText:{
    color: '#848484'
  },
  btn:{
    paddingHorizontal: 10,
    justifyContent:'center',
    flex: 0.3
  },
  containerFlatlist:{
    flex:1
  },
  itemText:{
    alignItems: 'center',
    justifyContent:'center',
    gap: 10
  }
});
