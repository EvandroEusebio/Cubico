import { StyleSheet, Dimensions } from "react-native";

export const myImovels_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 10,
    gap: 5,
  },
  item: {
    paddingHorizontal: 16,
    paddingBottom: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  nameTypeProperties: {
    fontSize: 17,
  },
  title: {
    fontSize: 25,
  },
  containerItemPropertie: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfcfd1",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imgImovel: {
    height: 120,
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoImovels: {
    flexDirection: "row",
    gap: 10,
  },
  detailImovel: {
    justifyContent: "space-around",
  },
  containerPrice: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  outhers:{
    paddingRight: 10,
    alignItems:'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  closeBtn: {
    width:30,
    height: 30,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 1
  },
  textCloseBtn:{
    color: '#000'
  },
  tag:{
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    left: 10
  },
  tagText:{
    color: '#fff'
  },
  containerImovels:{
    flex: 1
  }
});
