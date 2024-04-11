import { StyleSheet } from 'react-native';
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from './palette';

export const register_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  containerForm:{
    gap: 20,
    
  },
  title:{
    color: TEXTCOLOR,
    fontSize: 30
  },
  form:{
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    height: 60,
    width: '87%'
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
    
  },
  img:{
    height: 100,
    width: 100
  }
});
