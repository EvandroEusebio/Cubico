import { StyleSheet, Dimensions } from "react-native";
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from "./palette";

const windowWidth = Dimensions.get("window").width;

export const markDataCalendar_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 30
  },
  timer:{
    padding: 10,
    backgroundColor: '#000',
    marginHorizontal: 30,
    borderRadius: 7,
    marginVertical: 10

  },
  title:{
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  containerTitle:{
    marginTop: -80
  },
  btnSubmit:{
    backgroundColor: "#000",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 13,
  },
  btnTitle:{
    color: '#fff'
  }
});
