import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { profile_style } from "../../styles/profile_style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: 1,
    title: "Editar Perfil",
    icon: "person-outline",
    route: "MyImovels",
  },
  {
    id: 2,
    title: "Ver Fvoritos",
    icon: "heart-outline",
    route: "MyImovels",
  },
  {
    id: 3,
    title: "Meus Imóveis",
    icon: "home-outline",
    route: "MyImovels",
  },

  {
    id: 4,
    title: "Notificações",
    icon: "notifications-outline",
    route: "MyImovels",
  },
  {
    id: 5,
    title: "Nos contacte",
    icon: "megaphone-outline",
    route: "MyImovels",
  },
  {
    id: 6,
    title: "Termos & Privacidade",
    icon: "key-outline",
    route: "MyImovels",
  },
  {
    id: 7,
    title: "Sair",
    icon: "exit-outline",
    route: "MyImovels",
  },
];

const Item = ({ title, icon, navigation, route }) => (
  <TouchableOpacity
    style={profile_style.item}
    onPress={() => {
      navigation.navigate(route);
    }}
  >
    <View style={profile_style.containerItemLeft}>
      <Ionicons
        name={icon}
        size={25}
        color={title == "Sair" ? "red" : "#000"}
      />
      <Text
        style={[
          profile_style.itemText,
          { color: title == "Sair" ? "red" : "#000" },
        ]}
      >
        {title}
      </Text>
    </View>
    {title !== "Sair" && (
      <View style={profile_style.containerItemRigth}>
        <MaterialIcons name="chevron-right" size={25} color={"#000"} />
      </View>
    )}
  </TouchableOpacity>
);

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View style={profile_style.container}>
      <View style={profile_style.containerProfileDetails}>
        <View style={profile_style.Details}>
          <Image
            source={require("../../../assets/profile.jpg")}
            style={profile_style.imageProfile}
          />
          <Text style={profile_style.name}>Evandro</Text>
          <Text style={profile_style.PhoneNumber}>938390399</Text>
        </View>
        <View style={profile_style.containerResumeDetails}>
          <View style={profile_style.resumeDetails}>
            <Text style={profile_style.countDetails}>50</Text>
            <Text style={profile_style.textDetails}>Imóveis</Text>
          </View>
          <View style={profile_style.resumeDetails}>
            <Text style={profile_style.countDetails}>50</Text>
            <Text style={profile_style.textDetails}>Favoritos</Text>
          </View>
          <View style={profile_style.resumeDetails}>
            <Text style={profile_style.countDetails}>50</Text>
            <Text style={profile_style.textDetails}>Favoritos</Text>
          </View>
        </View>
      </View>

      <View style={profile_style.containerLinks}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              icon={item.icon}
              navigation={navigation}
              route={item.route}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
