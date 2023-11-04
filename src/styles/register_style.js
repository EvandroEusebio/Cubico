import { StyleSheet } from 'react-native';
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from './palette';

export const register_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  containerImage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerForm:{
    flex: 2,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 50,
    paddingHorizontal: 40,
    borderTopRightRadius: 50,
    paddingTop: 20,
    gap: 20
  },
  title:{
    color: TEXTCOLOR,
    fontSize: 30
  },
  form:{
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    height: 60,
    marginVertical: 10
  },
  input:{
    flex: 1,
    height: 50,
  },
  containerSignUp:{
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  signUp:{
    color: '#094559'
  },
  info:{
    color: '#adadad',
    
  }
});
