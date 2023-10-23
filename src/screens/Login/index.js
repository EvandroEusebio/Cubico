import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { login_style } from '../../styles/login_style';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {  useFonts, Poppins_700Bold,  Poppins_300Light, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import Button from '../../components/button/Button';



export default function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const {number, onChangeNumber } = useState('');
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
      <View style={login_style.containerImage}>
        <Image source={require('../../../assets/Ellipse1.png')}/>
      </View>
      <View style={login_style.containerForm}>
        <Text style={[login_style.title, {fontFamily: 'Poppins_700Bold'}]}>Login</Text>
        <View style={login_style.form}>
          <TextInput
          style={[login_style.input, {fontFamily: 'Poppins_400Regular'}]}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Numero de telefone"
          keyboardType="numeric"
          />
          <Icon name="phone" size={30} color="#adadad" />
        </View>

        <View style={login_style.form}>
          <TextInput
            style={[login_style.input, {fontFamily: 'Poppins_400Regular'}]}
            onChangeText={onChangeNumber}
            value={number}
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
          <Button name={'Logar'} bgColor={'#094559'} textColor={'#f3f3f3'} fontFamily={'Poppins_700Bold'}/>
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
