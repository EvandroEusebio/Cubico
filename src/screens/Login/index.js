import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { login_style } from '../../styles/login_style';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {  useFonts, Poppins_700Bold,  Poppins_300Light, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import Button from '../../components/button/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authentication/authSlice';

export default function Login(){
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginHandle = () =>{
    dispatch(login({password, phone}));
  }

  const [showPassword, setShowPassword] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={login_style.container}>
      <Image source={require('../../../assets/wave.png')} style={login_style.waveImage}/>
      <Image source={require('../../../assets/logo.png')} style={login_style.img}/>
      <View style={login_style.containerForm}>
        <Text style={[login_style.title, {fontFamily: 'Poppins_700Bold'}]}>Login</Text>
        <View style={login_style.form}>
          <TextInput
          style={[login_style.input, {fontFamily: 'Poppins_400Regular'}]}
          onChangeText={setPhone}
          value={phone}
          placeholder="Numero de telefone"
          keyboardType="default"
          />
          <Icon name="phone" size={30} color="#adadad" />
        </View>

        <View style={login_style.form}>
          <TextInput
            style={[login_style.input, {fontFamily: 'Poppins_400Regular'}]}
            onChangeText={setPassword}
            value={password}
            placeholder="senha"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={30} color="#adadad" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={[login_style.info, {fontFamily: 'Poppins_400Regular'}]}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <View>
          <Button name={'Logar'} bgColor={'#000'} textColor={'#f3f3f3'} fontFamily={'Poppins_700Bold'} onPress={()=> loginHandle() }/>
        </View>

        <View style={login_style.containerSignUp}>
          <Text style={[login_style.info, {fontFamily: 'Poppins_400Regular'}]}>Não tens uma conta?</Text>
          <TouchableOpacity>
            <Text style={[login_style.signUp, {fontFamily: 'Poppins_400Regular'}]}>Registrar</Text>
          </TouchableOpacity>
        </View>
        
      </View>

    </View>
  );
}
