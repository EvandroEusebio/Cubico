import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Button from "../../components/button/Button";
import API_URL from "../../../config/api";
import { useEffect, useState } from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useDispatch, useSelector } from "react-redux";

import { editProfile_style } from "../../styles/editProfile_style";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function EditProfile() {
  const phone = useSelector((state) => state.auth.user.phone);
  const email = useSelector((state) => state.auth.user.email);
  const name = useSelector((state) => state.auth.user.name);
  const imageProfile = useSelector((state) => state.auth.user.imageProfile);
  const dispatch = useDispatch();

  const updateUserHandle = () => {
    dispatch(updateUser({ id, name, email, phone }));
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
    <View style={editProfile_style.container}>
      <View style={editProfile_style.circle}></View>
      <View style={editProfile_style.containerImage}>
        <Image
          source={{ uri: `${API_URL}${imageProfile}` }}
          style={editProfile_style.image}
        />
        <Text
          style={[editProfile_style.name, { fontFamily: "Poppins_700Bold" }]}
        >
          {name}
        </Text>
        <Text style={editProfile_style.phoneNumber}>+244 {phone}</Text>
      </View>

      <View style={editProfile_style.containerForm}>
        <View style={editProfile_style.form}>
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={name}
            editable={false}
          />
          <TouchableOpacity style={editProfile_style.edit}>
            <Ionicons name="create-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={editProfile_style.form}>
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={email}
            editable={false}
          />
          <TouchableOpacity style={editProfile_style.edit}>
            <Ionicons name="create-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={editProfile_style.form}>
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={phone}
            editable={false}
          />
          <TouchableOpacity style={editProfile_style.edit}>
            <Ionicons name="create-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View>
          <Button
            name={"Salvar"}
            bgColor={"#000"}
            textColor={"#f3f3f3"}
            fontFamily={"Poppins_700Bold"}
            onPress={() => loginHandle()}
          />
        </View>
      </View>
    </View>
  );
}
