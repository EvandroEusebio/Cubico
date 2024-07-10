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
import { useDispatch, useSelector } from "react-redux";
import { setDataImovel } from "../../features/infoImovel/infoImovelSlice";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const typeProperties = [
  {
    id: 1,
    type: "Solicitações",
  },
  /*
  {
    id: 2,
    type: "Aceites",
  },
  {
    id: 3,
    type: "Negados",
  },
  */
  {
    id: 4,
    type: "Meus pedidos",
  },
];

const ListEndLoader = ({ loading }) => {
  if (!loading) return null;
  return <ActivityIndicator style={{ padding: 10 }} size={25} color={"#000"} />;
};

export default function VisitAppointement() {
  const [selectedTypeImovelItemId, setSelectedTypeImovelItemId] = useState(0);
  const [imovels, setImovels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const id = useSelector((state) => state.auth.user.id);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const deleteImovel = async (id) => {
    await axios
      .delete(API_URL + `api/v1/imovel/delete/${id}`)
      .then((response) => {
        //console.warn(response.data.response);
        const filteredData = imovels.filter((item) => item.id !== id);
        setImovels(filteredData);
      })
      .catch((error) => console.error(error));
  };

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
    <View
      activeOpacity={0.7}
      style={myImovels_style.containerItemPropertie}
      onPress={() => {
        dispatch(setDataImovel(item));
        navigation.navigate("MyInfoImovel");
      }}
    >
      <View style={myImovels_style.infoImovels}>
        <Image
          source={{
            uri: API_URL + "storage/imovelPictures/" + item.imovel.image01,
          }}
          style={myImovels_style.imgImovel}
        />
        <View style={myImovels_style.detailImovel}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
                {item.customer_id === id && `dono: ${item.owner.name}`}
                {item.customer_id !== id && `cliente: ${item.customer.name}`}
              </Text>
              <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
                {item.imovel.type_imovel.type}
              </Text>
              <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
                local: {item.imovel.address} - {item.imovel.street}
              </Text>
              <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
                Data: {item.date}
              </Text>
              <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
                status: {item.status == 0 ? "negado" : "aceite"}
              </Text>
            </View>
            {item.customer_id != id && (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <TouchableOpacity
                  style={myImovels_style.closeBtn}
                  onPress={() => deleteImovel(item.id)}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={myImovels_style.closeBtn}
                  onPress={() => deleteImovel(item.id)}
                >
                  <MaterialCommunityIcons
                    name="window-close"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={[myImovels_style.containerPrice]}>
            <Text style={[{}, { fontFamily: "Poppins_500Medium" }]}>
              {item.customer_id === id && "solicitaste uma visita"}
              {item.customer_id !== id && "solicitou uma visita"}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          myImovels_style.tag,
          { backgroundColor: item.status == "Aluguer" ? "red" : "green" },
        ]}
      >
        <Text style={myImovels_style.tagText}>
          {item.imovel.type_transaction.type}
        </Text>
      </View>
    </View>
  );

  console.warn(error);
  async function getDataImovels() {
    setError(false);

    setLoading(true);

    if (selectedTypeImovelItemId === 4) {
      await axios
        .get(API_URL + `api/v1/show/user/mark/visits/${id}`)
        .then((response) => {
          if (response.data.userMarkVisit.length === 0) {
            setLoading(false);
            if (imovels.length === 0) {
              setError(true);
            }

            return;
          } else {
            setImovels(response.data.userMarkVisit);
            //setPagination(pagination + 1);
            //console.log(response.data.userMarkVisit);
            setError(false);
            setLoading(false);
          }
        })
        .catch((error) => console.error("Erro ao buscar os dados: " + error));
      return;
    }

    //console.warn(selectedTypeImovelItemId);
    if (selectedTypeImovelItemId === 1) {
      await axios
        .get(API_URL + `api/v1/user/show/MyRequestAppointments/${id}`)
        .then((response) => {
          if (response.data.myRequestAppointments.length === 0) {
            setLoading(false);
            if (imovels.length === 0) {
              setError(true);
            }

            return;
          } else {
            setImovels(response.data.myRequestAppointments);
            //setPagination(pagination + 1);
            //console.log(response.data.myRequestAppointments);
            setError(false);
            setLoading(false);
          }
        })
        .catch((error) => console.error("Erro ao buscar os dados: " + error));
      return;
    }

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
      <TouchableOpacity style={myImovels_style.addImovelBtn}>
        <Text style={myImovels_style.textAddImovelBtn}>+</Text>
      </TouchableOpacity>
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
      {error ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../../assets/not.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text>Nenhum imóvel encontrado!</Text>
        </View>
      ) : (
        <View style={myImovels_style.containerImovels}>
          <FlatList
            data={imovels}
            renderItem={({ item }) => (
              <Properties
                item={item}
                navigation={navigation}
                dispatch={dispatch}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={!loading && getDataImovels}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<ListEndLoader loading={loading} />}
          />
        </View>
      )}

      <View style={myImovels_style.span}></View>
    </View>
  );
}

/*
if (selectedTypeImovelItemId === null || selectedTypeImovelItemId === 0) {
      await axios
      .get(API_URL + `api/v1/show/user/mark/visits/2`)
      .then((response) => {
        if (response.data.myRequestAppointments.length === 0) {
          setLoading(false);
          if (imovels.length === 0) {
            setError(true);
          }

          return;
        } else {
          setImovels(response.data.myRequestAppointments);
          //setPagination(pagination + 1);
          console.log(response.data.myRequestAppointments);
          setError(false);
          setLoading(false);
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados: " + error));
      return;
    }
*/
