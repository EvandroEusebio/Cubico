import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar
} from "react-native";
import Search from "../../components/Search";
import { home_style } from "../../styles/home_style";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import API_URL from "../../../config/api";
import Swiper from "react-native-swiper";
import axios from "axios";
import Map from "../../components/Map";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setDataImovel } from "../../features/infoImovel/infoImovelSlice";

//import { SliderBox } from "react-native-image-slider-box";



const dataTypeProperties = [
  {
    id: 1,
    type: "Casas",
    icon: "house",
  },
  {
    id: 2,
    type: "Apartamentos",
    icon: "apartment",
  },
  {
    id: 3,
    type: "Terrenos",
    icon: "landscape",
  },
  {
    id: 4,
    type: "Quartos",
    icon: "single-bed",
  },
];

const TypeProperties = ({ type, icon }) => (
  <TouchableOpacity style={home_style.item} activeOpacity={false}>
    <View style={home_style.containerIcon}>
      <Icon2 name={icon} size={20} color="#000" />
    </View>
    <Text style={home_style.nameTypeProperties}>{type}</Text>
  </TouchableOpacity>
);

/*
/storage/profilePictures/1703253586.png
http://192.168.100.60:8000/storage/imovelPictures/01HJ8XQ7DSP0QSMKKVSJQ5K15X.jpg */
const Properties = ({ item, navigation, dispatch }) => (
  <View style={home_style.containerItemPropertie}>
    <Swiper
      style={{ height: 250 }}
      horizontal
      dotColor="#fff"
      activeDotColor="red"
    >
      {[item.image01, item.image02, item.image03, item.image04].map(
        (image, index) => (
          <TouchableOpacity
            key={index}
            
            activeOpacity={1}
            style={{marginRight: 10,}}
            onPress={() => {
              dispatch(setDataImovel(item))
              navigation.navigate('InfoImovel')
            }}
          >
            <Image
              source={{ uri: API_URL + "storage/" + image }}
              style={home_style.imageProperties}
            />
          </TouchableOpacity>
        )
      )}
    </Swiper>
    <View style={[home_style.containerInfo]}>
      <View>
        <Text>
          {item.province.name}, {item.county.name}
        </Text>
        <Text>{item.owner.name}</Text>
        <View style={home_style.details}>
          <Icon name="map-pin" size={13} color="#000" />

          <Icon name="shopping-bag" size={13} color="#000" />
          <Text>{item.status}</Text>
        </View>
      </View>
      <View style={home_style.details2}>
        <Text>{item.type_imovel.type}</Text>
        <View style={home_style.price}>
          <Text style={home_style.textPrice}>{item.price} KZ</Text>
        </View>
      </View>
    </View>
    <TouchableOpacity activeOpacity={0.7} style={home_style.favorites}>
      <Icon2 name="favorite" size={25} color="#fff" />
    </TouchableOpacity>
    <View
      style={[
        home_style.tag,
        {
          backgroundColor:
            item.type_transaction.type == "a venda" ? "green" : "red",
        },
      ]}
    >
      <Text style={home_style.textTag}>{item.type_transaction.type}</Text>
    </View>
  </View>
);

const ListEndLoader = ({ loading }) => {
  if (!loading) return null;
  return <ActivityIndicator style={{ padding: 10 }} size={25} color={"#000"} />;
};

export default function Home() {
  const [text, onChangeText] = useState("");
  const [imovels, setImovels] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(function () {
    getDataImovels();
  }, []);

  async function getDataImovels() {
    if (loading) return;

    setLoading(true);

    await axios
      .get(API_URL + `api/v1/imovel?page=${pagination}`)
      .then((response) => {
        if (response.data.imovel.data.length === 0) {
          return;
        } else {
          setImovels([...imovels, ...response.data.imovel.data]);
          setPagination(pagination + 1);
          console.log(response.data.imovel.data);
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados: " + error));

    setLoading(false);
  }

  return (
    <View style={home_style.container}>
      <View style={home_style.header}>
        <Text style={home_style.headerTitle}>CUBICO</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <TouchableOpacity style={home_style.containerIcon}>
            <Icon name="bell" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={home_style.containerIcon}
            onPress={() => setShowMap(!showMap)}
          >
            <Icon
              name={showMap ? "airplay" : "map-pin"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={home_style.containerFilter}>
        <View style={home_style.containerInput}>
          <Icon name="search" size={20} color="#000" />
          <TextInput
            style={home_style.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Pesquise o que deseja encontrar"
          />
        </View>
        <TouchableOpacity style={home_style.containerIcon}>
          <Icon name="sliders" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={dataTypeProperties}
          renderItem={({ item }) => (
            <TypeProperties type={item.type} icon={item.icon} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, height: 1, backgroundColor:'rgba(0, 0, 0, 0.1)'}}></View>
      {!showMap && (
        <>
          <FlatList
            data={imovels}
            renderItem={({ item }) => (
              <Properties item={item} navigation={navigation} dispatch={dispatch}/>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={!loading && getDataImovels}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<ListEndLoader loading={loading} />}
          />
        </>
      )}
      {showMap && <Map />}
      <StatusBar barStyle={"light-content"}/>
    </View>
  );
}
