import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import axios from "axios";
import { updateUser, updateImageProfile } from "../../features/authentication/authSlice";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Video from "../../components/Move";


export default function EditProfile() {
  const phoneRedux = useSelector((state) => state.auth.user.phone);
  const emailRedux = useSelector((state) => state.auth.user.email);
  const nameRedux = useSelector((state) => state.auth.user.name);
  const imageProfile = useSelector((state) => state.auth.user.imageProfile);
  const id = useSelector((state) => state.auth.user.id);
  const navigation = useNavigation();

  console.log(imageProfile);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const [showEditedName, setShowEditedName] = useState(false);
  const [showEditedEmail, setShowEditedEmail] = useState(false);
  const [showEditedPhone, setShowEditedPhone] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const updateUserHandle = (type) => {
    if (type == "name") {
      let name = editedName;
      dispatch(updateUser({ id, name }));
    } else if (type == "email") {
      let email = editedEmail;
      dispatch(updateUser({ id, email }));
    } else if (type == "phone") {
      let phone = editedPhone;
      dispatch(updateUser({ id, phone }));
    }
  };

  async function changeImage() {
    const uri = image;
    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();

    formData.append("id", id);

    formData.append("imageProfile", {
      uri: uri,
      type: type,
      name: "imovel.jpg",
    });

    dispatch(updateImageProfile(formData));


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
      const originalWidth = result.assets[0].width;
      const originalHeight = result.assets[0].height;

      // Define as dimensões máximas desejadas
      const maxWidth = 800;
      const maxHeight = 600;

      // Calcula as novas dimensões mantendo a proporção original
      const aspectRatio = originalWidth / originalHeight;
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      // Redimensiona a imagem
      const resizedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: newWidth, height: newHeight } }],
        { compress: 0.7, format: SaveFormat.JPEG }
      );

      setImage(resizedImage.uri);
      changeImage();
      console.log(resizedImage);
    }
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
    <ScrollView contentContainerStyle={editProfile_style.container}>
      <View style={editProfile_style.containerImage}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              imageProfile === "null"
                ? require("../../../assets/pro.png")
                : { uri: API_URL + "storage/profilePictures/" + imageProfile }
            }
            style={editProfile_style.image}
          />
        </TouchableOpacity>

        <Text
          style={[editProfile_style.name, { fontFamily: "Poppins_700Bold" }]}
        >
          {nameRedux}
        </Text>
        <Text style={editProfile_style.phoneNumber}>+244 {phoneRedux}</Text>
      </View>

      <View style={editProfile_style.containerForm}>
        <TouchableOpacity
          style={[
            editProfile_style.form,
            { borderRadius: showEditedName ? null : 12 },
          ]}
          onPress={() => setShowEditedName(!showEditedName)}
        >
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={nameRedux}
            editable={false}
          />
          <View>
            <Ionicons name="create-outline" size={30} color="#000" />
          </View>
        </TouchableOpacity>

        {showEditedName && (
          <View style={editProfile_style.formEdit}>
            <TextInput
              style={[
                editProfile_style.inputEdit,
                { fontFamily: "Poppins_400Regular" },
              ]}
              onChangeText={setEditedName}
            />

            <TouchableOpacity>
              <Text
                style={editProfile_style.edit}
                onPress={() => updateUserHandle("name")}
              >
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[
            editProfile_style.form,
            { borderRadius: showEditedEmail ? null : 12 },
          ]}
          onPress={() => setShowEditedEmail(!showEditedEmail)}
        >
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={emailRedux}
            editable={false}
          />
          <View>
            <Ionicons name="create-outline" size={30} color="#000" />
          </View>
        </TouchableOpacity>

        {showEditedEmail && (
          <View style={editProfile_style.formEdit}>
            <TextInput
              style={[
                editProfile_style.inputEdit,
                { fontFamily: "Poppins_400Regular" },
              ]}
              onChangeText={setEditedEmail}
              value={editedEmail}
            />
            <TouchableOpacity onPress={() => updateUserHandle("email")}>
              <Text style={editProfile_style.edit}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[
            editProfile_style.form,
            { borderRadius: showEditedPhone ? null : 12 },
          ]}
          onPress={() => setShowEditedPhone(!showEditedPhone)}
        >
          <TextInput
            style={[
              editProfile_style.input,
              { fontFamily: "Poppins_400Regular" },
            ]}
            value={phoneRedux}
            editable={false}
          />
          <View>
            <Ionicons name="create-outline" size={30} color="#000" />
          </View>
        </TouchableOpacity>

        {showEditedPhone && (
          <View style={editProfile_style.formEdit}>
            <TextInput
              style={[
                editProfile_style.inputEdit,
                { fontFamily: "Poppins_400Regular" },
              ]}
              onChangeText={setEditedPhone}
              value={editedPhone}
            />
            <TouchableOpacity onPress={() => updateUserHandle("phone")}>
              <Text style={editProfile_style.edit}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
    </ScrollView>
  );
}
