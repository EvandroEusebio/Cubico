import { StyleSheet } from 'react-native';
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from './palette';

export const login_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center'
  },
  containerImage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerForm:{
    
    gap: 20
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
  },
  signUp:{
    color: '#094559'
  },
  info:{
    color: '#adadad'
  },
  waveImage:{
    width: 400,
    height: 350,
    position: 'absolute',
    right: -10,
    top: 550
  }
});
