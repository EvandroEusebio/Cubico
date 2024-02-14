import { StyleSheet } from "react-native";

import {
  PRIMARY,
  BG_COLOR,
  TEXTCOLOR,
  BORDER,
  SECUNDARY,
  TEXTCOLOR_02,
} from "./palette";

export const infoImovel_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerImage: {
    height: 260,
    resizeMode: "cover",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerIcon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: "#cfcfd1",
  },
  containerInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 20,
  },
  containerUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#595959",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerUserContact: {
    gap: 10,
  },
  btnContact: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: "#cfcfd1",
  },
  galeryImage: {
    width: 90,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  containerDescription: {
    gap: 6,
  },
  text: {
    textAlign: "justify",
    color: "#848484",
  },
  iconHeart: {
    position: "absolute",
    top: 50,
    left: 310,
  },
  userDatailDiv1: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userDatail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerContactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    height: 60,
    borderRadius: 10,
    gap: 10,
  },
  map: {
    height: 250,
    borderRadius: 10,
  },
  containerMap: {
    gap: 10,
  },
  btn: {
    backgroundColor: "#000",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 13,
    marginVertical: 20,
  },
  btnTitle: {
    color: "#fff",
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  userImageComentar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  containerComentar: {
    width: 250,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 10,
    borderWidth: 1,
    height: 250,
    padding: 10,
    justifyContent: "space-around",
    marginRight: 15,
    borderColor: "rgba(0,0,0,0.1)",
    gap: 10
  },
  containerUserComentar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  userTextComentar: {
    fontSize: 15,
    fontWeight: "bold",
  },
  countCommentar: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  textCommentar:{
    textAlign: "center",
    
    fontWeight: "500",
  },
  commentContainer:{
    flexDirection: 'row',
    alignItems:'flex-end',
    gap: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20

  },
  inputComment:{
    flex: 1,
    borderWidth: 1,
    height: 200,
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
    borderColor: "rgba(0,0,0,0.5)"
  },
  btnCommentarSend:{
    backgroundColor:'#000',
    width: 40,
    height: 40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,
    padding: 10
  },
  containerTitleCommentary:{
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 20
    
  },
  titleCommentary:{
    flex: 1
  },
  btnShowCommentar:{
    width: 40,
    height: 40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,
    padding: 10
  },
  textComment:{
    flex: 1,
  }
});
