import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
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
import { updateUser } from "../../features/authentication/authSlice";

export default function EditProfile() {
  const phoneRedux = useSelector((state) => state.auth.user.phone);
  const emailRedux = useSelector((state) => state.auth.user.email);
  const nameRedux = useSelector((state) => state.auth.user.name);
  const imageProfile = useSelector((state) => state.auth.user.imageProfile);
  const id = useSelector((state) => state.auth.user.id);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const [showEditedName, setShowEditedName] = useState(false);
  const [showEditedEmail, setShowEditedEmail] = useState(false);
  const [showEditedPhone, setShowEditedPhone] = useState(false);
  const dispatch = useDispatch();

  const updateUserHandle = (type) => {
    if(type == "name"){
      let name = editedName;
      dispatch(updateUser({ id, name}))
    }else if(type == "email"){
      let email = editedEmail;
      dispatch(updateUser({ id, email}))
    }else if(type == "phone"){
      let phone = editedPhone;
      dispatch(updateUser({ id, phone}))
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
        <Image
          source={{ uri: `${API_URL}${imageProfile}` }}
          style={editProfile_style.image}
        />
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
              value={editedName}
            />
            
            <TouchableOpacity>
              <Text style={editProfile_style.edit} onPress={() => updateUserHandle("name")}>Editar</Text>
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
