import { StyleSheet, Dimensions } from "react-native";
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from "./palette";

const windowWidth = Dimensions.get("window").width;

export const map_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImageUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  markerIcon: {
    backgroundColor: "#000",
    borderRadius: 50,
  },
  containerImovelInfo: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    top: Platform.OS === 'ios' ? 215 : 260,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: windowWidth * 0.9,
    marginHorizontal: 18,
    // Shadow properties for iOS
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Shadow properties for Android
    elevashadowColor: '#000',tion: 3,
    // Padding is added to ensure the shadow is visible
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginRight: 10,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 140,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  textLocation: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  price:{
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 7,
    justifyContent:'center',
    alignItems:'center'
  },
  closeBtn:{
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 20,
    margin: 10,
    borderRadius: 50,
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
