import { StyleSheet } from "react-native";
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from "./palette";

export const editProfile_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 30
    
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerForm: {
    gap: 30,
  },
  title: {
    color: TEXTCOLOR,
    fontSize: 30,
  },
  form: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    height: 60,
    width: "87%",
  },
  input: {
    flex: 1,
    height: 50,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  edit:{
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name:{
    fontSize: 23,
    letterSpacing: 1
  },
  phoneNumber:{
    fontSize: 16,
    letterSpacing: 1
  },
  circle:{
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
    position: 'absolute',
    top: 57
  }
});
