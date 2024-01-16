import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { myImovels_style } from "./myImovels_style";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import axios from "axios";
import API_URL from "../../../config/api";

const typeProperties = [
  {
    id: 1,
    type: "Casas",
  },
  {
    id: 2,
    type: "Apartamentos",
  },
  {
    id: 3,
    type: "Terrenos",
  },
  {
    id: 4,
    type: "Quartos",
  },
];

const ListEndLoader = ({ loading }) => {
    if (!loading) return null;
    return (
      <ActivityIndicator style={{ padding: 10 }} size={25} color={"#000"} />
    );
  };

export default function MyImovels() {
  const [selectedTypeImovelItemId, setSelectedTypeImovelItemId] = useState(1);
  const [imovels, setImovels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    getDataImovels();
  }, [selectedTypeImovelItemId]);

  const TypeProperties = ({
    item,
    borderButtonColor,
    onPress,
    isBorderBottomWidth,
    textColor,
  }) => (
    <TouchableOpacity
      style={[
        myImovels_style.item,
        {
          borderBottomWidth: isBorderBottomWidth,
          borderBottomColor: borderButtonColor,
        },
      ]}
      activeOpacity={0.5}
      onPress={() => {
        setImovels([]);
        setPagination(1);
        onPress();
      }}
    >
      <Text
        style={[
          myImovels_style.nameTypeProperties,
          { fontFamily: "Poppins_500Medium", color: textColor },
        ]}
      >
        {item.type}
      </Text>
    </TouchableOpacity>
  );

  const renderItemTypeProperties = ({ item }) => {
    const borderButtonColor =
      item.id === selectedTypeImovelItemId ? "#000" : "#fff";
    const textColor = item.id === selectedTypeImovelItemId ? "#000" : "#595959";
    const isBorderBottomWidth = item.id === selectedTypeImovelItemId ? 1 : null;

    return (
      <TypeProperties
        item={item}
        textColor={textColor}
        onPress={() => setSelectedTypeImovelItemId(item.id)}
        backgroundColor={borderButtonColor}
        isBorderBottomWidth={isBorderBottomWidth}
      />
    );
  };

  const Properties = ({ item, navigation, dispatch }) => (
    <TouchableOpacity style={myImovels_style.containerItemPropertie}>
      <View style={myImovels_style.infoImovels}>
        <Image
          source={{ uri: API_URL + "storage/" + item.image01 }}
          style={myImovels_style.imgImovel}
        />
        <View style={myImovels_style.detailImovel}>
          <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
            {item.type_imovel.type}
          </Text>
          <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
            {item.province.name}, {item.county.name}
          </Text>
          <View style={[myImovels_style.containerPrice]}>
            <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
              {item.price}Kz
            </Text>
          </View>
        </View>
      </View>
      <View style={myImovels_style.outhers}>
        <TouchableOpacity style={myImovels_style.closeBtn}>
          <Text
            style={[
              myImovels_style.textCloseBtn,
              { fontFamily: "Poppins_700Bold" },
            ]}
          >
            X
          </Text>
        </TouchableOpacity>
        <View>
          <Text>10</Text>
        </View>
      </View>
      <View
        style={[
          myImovels_style.tag,
          { backgroundColor: item.status == "Aluguer" ? "red" : "green" },
        ]}
      >
        <Text style={myImovels_style.tagText}>
          {item.type_transaction.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  async function getDataImovels() {
    if (loading) return;

    setLoading(true);
    if (selectedTypeImovelItemId === null) {
      await axios
        .get(API_URL + `api/v1/imovel?page=${pagination}`)
        .then((response) => {
          if (response.data.imovel.data.length === 0) {
            return;
          } else {
            setImovels([...imovels, ...response.data.imovel.data]);
            //setPagination(pagination + 1);
            console.log(response.data.imovel.data);
          }
        })
        .catch((error) => console.error("Erro ao buscar os dados: " + error));
      return;
    }

    //console.warn(selectedTypeImovelItemId);

    await axios
      .get(API_URL + `api/v1/user/show/imovels/type/9/${selectedTypeImovelItemId}?page=${pagination}`)
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
    <View style={myImovels_style.container}>
      <View>
        <FlatList
          data={typeProperties}
          renderItem={renderItemTypeProperties}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={selectedTypeImovelItemId}
        />
      </View>
      <View style={myImovels_style.containerImovels}>
        <FlatList
          data={imovels}
          renderItem={({ item }) => (
            <Properties
              item={item}
              /*
              navigation={navigation}
              dispatch={dispatch}*/
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={!loading && getDataImovels}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ListEndLoader loading={loading} />}
        />
      </View>
      <View style={myImovels_style.span}></View>
    </View>
  );
}
