import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { login_style } from "../../styles/login_style";
import { useState } from "react";
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
import { login } from "../../features/authentication/authSlice";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.auth.isloading)

  

  const loginHandle = (values) => {
    dispatch(login(values));
  };

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
    <SafeAreaView style={{flex: 1,marginTop: StatusBar.currentHeight || 0 }}>
      <View style={login_style.container}>
        <Image
          source={require("../../../assets/wave.png")}
          style={login_style.waveImage}
        />
        <Image
          source={require("../../../assets/logo.png")}
          style={login_style.img}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => loginHandle(values)}
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
            <View style={login_style.containerForm}>
              <Text
                style={[login_style.title, { fontFamily: "Poppins_700Bold" }]}
              >
                Login
              </Text>
              <View style={login_style.form}>
                <TextInput
                  style={[
                    login_style.input,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  placeholder="Numero de telefone"
                  keyboardType="numeric"
                />
                <Icon name="phone" size={30} color="#adadad" />
              </View>
              {touched.phone && errors.phone && (
                <Text style={{ color: "red" }}>{errors.phone}</Text>
              )}

              <View style={login_style.form}>
                <TextInput
                  style={[
                    login_style.input,
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
                  name={"Logar"}
                  bgColor={"#000"}
                  textColor={"#f3f3f3"}
                  fontFamily={"Poppins_700Bold"}
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>

              <View style={login_style.containerSignUp}>
                <Text
                  style={[
                    login_style.info,
                    { fontFamily: "Poppins_400Regular" },
                  ]}
                >
                  Não tens uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigate.navigate("SignUp")}>
                  <Text
                    style={[
                      login_style.signUp,
                      { fontFamily: "Poppins_400Regular" },
                    ]}
                  >
                    Registrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
}
