import { StyleSheet } from 'react-native';
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER, TEXTCOLOR_02 } from './palette';

export const addImovel_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: 40,
    
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header:{
    paddingLeft: 16,
    paddingVertical: 10
  },
  headerTitle01:{
    fontSize: 30,
    fontWeight: '600'

  },
  headerTitle02:{
    fontSize: 33,
    fontWeight: 'bold',
    color: PRIMARY
  },
  containerFormAddress:{
    paddingHorizontal: 16,
    gap: 20
  },
  subtitle:{
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  input:{
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  containerFormInfo:{
    paddingHorizontal: 16,
    gap: 20,
    marginTop: 16,
  },
  containerCounters:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  counterBtn:{
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50
  },
  counterBtnText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  containerPicture:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20
  },
  picture:{
    width: 150,
    height: 150,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'dashed'
  },
  pictureText:{
    color: PRIMARY,
    fontSize: 25,
  },
  categoryImovel:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10
  }

});
