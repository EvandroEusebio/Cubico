import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { register_style } from "../../styles/register_style";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authentication/authSlice";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";

const validationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  phone: yup
    .number()
    .required("Campo obrigatório")
    .positive("Deve ser um número positivo")
    .integer("Deve ser um número inteiro"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const loading = useSelector((state) => state.auth.isloading)
  console.warn(loading)

  const signUpHandle = (values) => {
    dispatch(register(values));
  };

  const [showPassword, setShowPassword] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, justifyContent: 'center', }}>
      <ScrollView
        style={register_style.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={register_style.img}
        />
        <Formik
          initialValues={{ name: "", email: "", phone: "", password: "" }}
          onSubmit={(values) => signUpHandle(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={register_style.containerForm}>
              <Text
                style={[
                  register_style.title,
                  { fontFamily: "Poppins_700Bold" },
                ]}
              >
                Cadastre-se
              </Text>

              <View style={register_style.form}>
                <TextInput
                  style={[
                    register_style.input,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="Nome do usuário"
                />
                <Icon name="user" size={30} color="#adadad" />
              </View>
              {touched.name && errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}

              <View style={register_style.form}>
                <TextInput
                  style={[
                    register_style.input,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Endereço de email"
                />
                <Icon name="mail" size={30} color="#adadad" />
              </View>
              {touched.email && errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}

              <View style={register_style.form}>
                <TextInput
                  style={[
                    register_style.input,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  placeholder="Numero de telefone"
                  keyboardType="default"
                />
                <Icon name="phone" size={30} color="#adadad" />
              </View>
              {touched.phone && errors.phone && (
                <Text style={{ color: "red" }}>{errors.phone}</Text>
              )}

              <View style={register_style.form}>
                <TextInput
                  style={[
                    register_style.input,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="senha"
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye-off"}
                    size={30}
                    color="#adadad"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}

              <View>
                <Button
                  name={"Registar"}
                  bgColor={"#000"}
                  textColor={"#f3f3f3"}
                  fontFamily={"Poppins_700Bold"}
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>

              <View style={register_style.containerSignUp}>
                <Text
                  style={[
                    register_style.info,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                >
                  Já tens uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigate.navigate("Login")}>
                  <Text
                    style={[
                      register_style.signUp,
                      { fontFamily: "Poppins_400Regular" },
                    ]}
                  >
                    Entrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <StatusBar  backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
}
