import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { infoImovel_style } from "../../styles/infoImovel_style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import M2 from "react-native-vector-icons/MaterialCommunityIcons";

const dataInfo = [
  {
    id: 1,
    type: "Quarto",
    icon: "bed",
    quantity: 5,
  },
  {
    id: 2,
    type: "WC",
    icon: "shower",
    quantity: 5,
  },
  {
    id: 3,
    type: "Cosinha",
    icon: "food",
    quantity: 5,
  },
  {
    id: 4,
    type: "metros",
    icon: "map-marker-distance",
    quantity: 5,
  },
];

const dataImage = [
  {
    id: 1,
    uri: require("../../../assets/apartamento.jpg"),
  },
  {
    id: 2,
    uri: require("../../../assets/apartamento.jpg"),
  },
  {
    id: 3,
    uri: require("../../../assets/apartamento.jpg"),
  },
  {
    id: 4,
    uri: require("../../../assets/apartamento.jpg"),
  },
];

const ShowImages = ({ uri }) => (
  <TouchableOpacity style={infoImovel_style.containerGaleryImage}>
    <Image source={uri} style={infoImovel_style.galeryImage} />
  </TouchableOpacity>
);

const Info = ({ type, icon, quantity }) => (
  <View style={infoImovel_style.item}>
    <View style={infoImovel_style.containerIcon}>
      <M2 name={icon} />
    </View>

    <Text>{quantity}</Text>
    <Text>{type}</Text>
  </View>
);

export default function InfoImovel() {
  return (
    <View style={infoImovel_style.container}>
      <View style={{ height: 260 }}>
        <Image
          source={require("../../../assets/apartamento.jpg")}
          style={infoImovel_style.bannerImage}
        />
      </View>
      <View style={infoImovel_style.containerInfo}>
        <View>
          <FlatList
            data={dataImage}
            renderItem={({ item }) => <ShowImages uri={item.uri} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={infoImovel_style.title}>Angola, Luanda, Apartamento</Text>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={dataInfo}
            renderItem={({ item }) => (
              <Info
                type={item.type}
                icon={item.icon}
                quantity={item.quantity}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={infoImovel_style.containerUser}>
          <View style={infoImovel_style.containerUserInfo}>
            <Image
              source={require("../../../assets/pro.png")}
              style={infoImovel_style.profileImage}
            />
            <View style={infoImovel_style.containerUserName}>
              <Text style={infoImovel_style.userName}>Evandro Eusébio</Text>
              <Text style={infoImovel_style.userEmail}>evandro@gmail.com</Text>
            </View>
          </View>
          <View style={infoImovel_style.containerUserContact}>
            <TouchableOpacity style={infoImovel_style.btnContact}>
              <MaterialIcons name="chat" size={15} color={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity style={infoImovel_style.btnContact}>
              <MaterialIcons name="phone" size={15} color={"#000"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
