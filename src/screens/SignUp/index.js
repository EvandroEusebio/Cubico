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
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const signUpHandle = () =>{
    const uri =
    Platform.OS === "android"
      ? image
      : image.replace("file://", "");
    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    
    console.log(match?.[1]);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('imageProfile', {
      uri,
      type,
      name: 'profile.jpg',
    });
    console.log(formData._parts)
    dispatch(register(formData));
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  return (
    <View style={register_style.container}>
      <View style={register_style.containerImage}>
        <Image source={require('../../../assets/Ellipse1.png')}/>
      </View>
      <View style={register_style.containerForm}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={[register_style.title, {fontFamily: 'Poppins_700Bold'}]}>Login</Text>

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

            <TouchableOpacity style={register_style.form} onPress={pickImage}>
                <View>
                    <Text style={ {fontFamily: 'Poppins_400Regular', color:'#adadad'}}>Adicionar imagem de perfil</Text>
                    
                </View>
                <Icon name="plus" size={30} color="#094559" />
            </TouchableOpacity>
            

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
            <Button name={'Registar'} bgColor={'#094559'} textColor={'#f3f3f3'} fontFamily={'Poppins_700Bold'} onPress={()=> signUpHandle() }/>
            </View>

            <View style={register_style.containerSignUp}>
            <Text style={[register_style.info, {fontFamily: 'Poppins_400Regular'}]}>Não tens uma conta?</Text>
            <TouchableOpacity>
                <Text style={[register_style.signUp, {fontFamily: 'Poppins_400Regular'}]}>Registrar</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </View>

    </View>
  );
}
