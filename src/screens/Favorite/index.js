import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import axios from "axios";
import API_URL from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { home_style } from "../../styles/home_style";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { setDataImovel } from "../../features/infoImovel/infoImovelSlice";

const Properties = ({ item, navigation, dispatch, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Verifica se o imóvel é favorito quando o componente é montado
    isPropertyFavorite();
  }, []);

  const isPropertyFavorite = async () => {
    try {
      const response = await fetch(
        API_URL + `api/v1/user/${userId}/favorite/${item.id}`
      );
      const data = await response.json();
      //console.warn(data.is_favorite);
      setIsFavorite(data.is_favorite);
    } catch (error) {
      console.error("Erro ao verificar favorito:", error.message);
      return false;
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch(
        API_URL + `api/v1/user/${userId}/favorite/${item.id}`,
        {
          method: isFavorite ? "DELETE" : "POST",
        }
      );
      const data = await response.json();
      console.warn(data);
      setIsFavorite(data.is_favorite);
    } catch (error) {
      console.error("Erro ao marcar favorito:", error.message);
    }
  };

  return (
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
              style={{ marginRight: 10 }}
              onPress={() => {
                dispatch(setDataImovel(item));
                navigation.navigate("InfoImovelStack");
              }}
            >
              <Image
                source={{ uri: API_URL + "storage/imovelPictures/" + image }}
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={home_style.favorites}
        onPress={() => toggleFavorite()}
      >
        <Icon2 name="favorite" size={25} color={isFavorite ? "red" : "#fff"} />
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
};

export default function Favorite() {
  const id = useSelector((state) => state.auth.user.id);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getUserFavorite();
    }, 2000);
  }, []);

  useEffect(() => {
    getUserFavorite();
    //console.warn(favorites)
  }, []);

  async function getUserFavorite() {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        API_URL + `api/v1/user/favorite/imovels/${id}`
      );
      //console.warn(response.data);
      setFavorites(response.data);
      setLoading(false);
      if (response.data.length === 0) {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
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
    <ScrollView
      style={style.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          margin: 10,
          color: "#000",
          fontFamily: "Poppins_700Bold",
          fontSize: 25,
        }}
      >
        Seus Favoritos
      </Text>
      {loading ? (
        <ActivityIndicator style={{ padding: 10 }} size={25} color={"#000"} />
      ) : (
        <View>
          {error ? (
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
              <Image source={require("../../../assets/not.png")} style={{width: 150, height: 150}}/>
              <Text>
                Nenhum imóvel favorito encontrado!
              </Text>
            </View>
          ) : (
            <FlatList
              data={favorites}
              renderItem={({ item }) => (
                <Properties
                  item={item}
                  navigation={navigation}
                  dispatch={dispatch}
                  userId={id}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              //onEndReached={!loading && getDataImovels}
              //onEndReachedThreshold={0.1}
              //ListFooterComponent={<ListEndLoader loading={loading} />}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
});
