import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { register_style } from '../../styles/register_style';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {  useFonts, Poppins_700Bold,  Poppins_300Light, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import Button from '../../components/button/Button';
import { useDispatch } from 'react-redux';
import { register } from '../../features/authentication/authSlice';
import * as ImagePicker from 'expo-image-picker';

export default function SignUp(){
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const signUpHandle = () =>{
    dispatch(register({name, email, password, phone}));
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
    <View style={register_style.container}>
      <View style={register_style.containerForm}>
            <Text style={[register_style.title, {fontFamily: 'Poppins_700Bold'}]}>Cadastre-se</Text>

            <View style={register_style.form}>
            <TextInput
            style={[register_style.input, {fontFamily: 'Poppins_400Regular'}]}
            onChangeText={setName}
            value={name}
            placeholder="Nome do usuário"
            />
            <Icon name="user" size={30} color="#adadad" />
            </View>

            <View style={register_style.form}>
            <TextInput
            style={[register_style.input, {fontFamily: 'Poppins_400Regular'}]}
            onChangeText={setEmail}
            value={email}
            placeholder="Endereço de email"
            />
            <Icon name="mail" size={30} color="#adadad" />
            </View>

            <View style={register_style.form}>
            <TextInput
            style={[register_style.input, {fontFamily: 'Poppins_400Regular'}]}
            onChangeText={setPhone}
            value={phone}
            placeholder="Numero de telefone"
            keyboardType="numeric"
            />
            <Icon name="phone" size={30} color="#adadad" />
            </View>

            <View style={register_style.form}>
            <TextInput
                style={[register_style.input, {fontFamily: 'Poppins_400Regular'}]}
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
            <Text style={[register_style.info, {fontFamily: 'Poppins_400Regular'}]}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <View>
            <Button name={'Registar'} bgColor={'#000'} textColor={'#f3f3f3'} fontFamily={'Poppins_700Bold'} onPress={()=> signUpHandle() }/>
            </View>

            <View style={register_style.containerSignUp}>
            <Text style={[register_style.info, {fontFamily: 'Poppins_400Regular'}]}>Não tens uma conta?</Text>
            <TouchableOpacity>
                <Text style={[register_style.signUp, {fontFamily: 'Poppins_400Regular'}]}>Registrar</Text>
            </TouchableOpacity>
            </View>
        </View>

    </View>
  );
}
