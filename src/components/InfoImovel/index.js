import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { infoImovel_style } from "../../styles/infoImovel_style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import M2 from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import API_URL from "../../../config/api";
import { useNavigation } from '@react-navigation/native';

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
];

const ShowImages = ({ item }) => (
  <View style={{flexDirection: 'row'}}>
    {[
      item.image01,
      item.image02,
      item.image03,
      item.image04,
    ].map((image, index) => (
      <TouchableOpacity >
        <Image
        key={index}
          source={{ uri: API_URL + "storage/" + image }}
          style={infoImovel_style.galeryImage}
        />
      </TouchableOpacity>
    ))}
  </View>
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
  const infoImovel = useSelector((state) => state.infoImovel.imovelDetail);
  const [data, setData] = useState([infoImovel])
  const navigation = useNavigation();
  console.log(infoImovel);
  return (
    <ScrollView
      style={infoImovel_style.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 260 }}>
        <Image
          source={{ uri: API_URL + "storage/" + infoImovel.image01 }}
          style={infoImovel_style.bannerImage}
        />
        <TouchableOpacity style={infoImovel_style.iconHeart}>
          <M2 name="heart" size={35} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
      </View>
      <View style={infoImovel_style.containerInfo}>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ShowImages item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={infoImovel_style.title}>{infoImovel.type_imovel.type} Kz {infoImovel.price}/mês</Text>
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
              <Text style={infoImovel_style.userName}>{infoImovel.owner.name}</Text>
              <Text style={infoImovel_style.userEmail}>Proprietário</Text>
            </View>
          </View>
        </View>

        <View style={infoImovel_style.containerUserContact}>
          <View style={infoImovel_style.userDatail}>
            <View style={infoImovel_style.userDatailDiv1}>
              <MaterialIcons name="alternate-email" size={20} />
              <Text>Email ......................................</Text>
            </View>
            <Text>{infoImovel.owner.email}</Text>
          </View>
          <View style={infoImovel_style.userDatail}>
            <View style={infoImovel_style.userDatailDiv1}>
              <MaterialIcons name="phone" size={20} />
              <Text>
                Telefone ..............................................
              </Text>
            </View>
            <Text>{infoImovel.owner.phone}</Text>
          </View>
          <View style={infoImovel_style.containerContactBtn}>
            <TouchableOpacity
              style={[infoImovel_style.contactBtn, { flex: 2 }]}
            >
              <MaterialIcons name="chat" size={20} color={"#fff"} />
              <Text style={{ color: "#fff" }}>Mensagem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[infoImovel_style.contactBtn, { flex: 1 }]}
            >
              <MaterialIcons name="phone" size={20} color={"#fff"} />
              <Text style={{ color: "#fff" }}>Ligar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={infoImovel_style.containerDescription}>
          <Text style={infoImovel_style.subTitle}>Descrição</Text>
          <Text style={infoImovel_style.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the.
          </Text>
        </View>
        <View style={infoImovel_style.containerMap}>
          <Text style={infoImovel_style.subTitle}>Localização</Text>
          <MapView
            style={infoImovel_style.map}
            initialRegion={{
              latitude: infoImovel.latitude,
              longitude: infoImovel.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            <Marker
              coordinate={{ latitude: infoImovel.latitude, longitude: infoImovel.longitude }}
              title="Seu Marcador"
              description="Descrição do seu marcador aqui"
            />
          </MapView>
        </View>
        <TouchableOpacity style={infoImovel_style.btn} onPress={() => navigation.navigate("VisitAppointment")}>
          <Text style={infoImovel_style.btnTitle}>
            Marcar Visita
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
