import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import API_URL from "../../../config/api";


import axios from "axios";

const typeStatusData = [
  { id: "1", label: "a venda", value: 1 },
  { id: "2", label: "aluguer", value: 2 },
];

const categoriesData = [
  {
    id: 0,
    type: "Qualquer",
    icon: "house",
  },
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

const counter = [
  {
    id: 0,
    number: "any",
  },
  {
    id: 1,
    number: "1",
  },
  {
    id: 2,
    number: "2",
  },
  {
    id: 3,
    number: "3",
  },
  {
    id: 4,
    number: "4",
  },
  {
    id: 5,
    number: "5",
  },
];

const ItemBadroom = ({ item, backgroundColor, onPress, textColor }) => (
  <TouchableOpacity
    style={[
      {
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 10,
      },
      { backgroundColor },
    ]}
    onPress={() => {
      onPress();
      //handlePressSelectedCategory(item.id);
    }}
  >
    <Text style={{ color: textColor }}>
      {item.number === "5" ? "+" + item.number : item.number}
    </Text>
  </TouchableOpacity>
);
const renderItemBadroom = ({
  item,
  selectedItemBadroomId,
  setSelectedItemBadroomId,
}) => {
  const backgroundColor =
    item.id === selectedItemBadroomId ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.0)";
  const textColor = item.id === selectedItemBadroomId ? "#fff" : "#000";

  return (
    <ItemBadroom
      item={item}
      onPress={() => setSelectedItemBadroomId(item.id)}
      textColor={textColor}
      backgroundColor={backgroundColor}
    />
  );
};

const Item = ({ item, backgroundColor, onPress, textColor, iconColor }) => (
  <TouchableOpacity
    style={[style.categoryImovel, { backgroundColor }]}
    onPress={() => {
      onPress();
      //handlePressSelectedCategory(item.id);
    }}
  >
    {item.id !== 0 && <Icon2 name={item.icon} size={20} color={iconColor} />}
    <Text style={{ color: textColor }}>{item.type}</Text>
  </TouchableOpacity>
);
const renderItem = ({ item, selectedItemId, setSelectedItemId }) => {
  const backgroundColor =
    item.id === selectedItemId ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.0)";
  const textColor = item.id === selectedItemId ? "#fff" : "#000";
  const iconColor = item.id === selectedItemId ? "#fff" : "#000";

  return (
    <Item
      item={item}
      onPress={() => setSelectedItemId(item.id)}
      textColor={textColor}
      iconColor={iconColor}
      backgroundColor={backgroundColor}
    />
  );
};

export default function Filter() {
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [selectedItemBadroomId, setSelectedItemBadroomId] = useState(0);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCounty, setDataCounty] = useState([]);
  const [province, setProvince] = useState(null);
  const [county, setCounty] = useState(null);
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");

  useEffect(() => {
    axios
      .get(API_URL + `api/v1/provincia`)
      .then((response) => setDataProvince(response.data))
      .catch((error) => {
        console.error("Erro ao recuperar os dados do usuário:", error);
      });
  }, []);

  const fetchCountyData = async (id) => {
    await axios
      .get(API_URL + `api/v1/provincia/localidade/${id}`)
      .then((response) => {
        setDataCounty(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  };

  const formatedProvinceData = dataProvince.map((opcao) => ({
    label: opcao.name,
    value: opcao.id, // Valor é a opção em minúsculas sem espaços
  }));

  const formatedCountyData = dataCounty.map((opcao) => ({
    label: opcao.name,
    value: opcao.id, // Valor é a opção em minúsculas sem espaços
  }));

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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: "#d8d6d6",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 25,
            fontFamily: "Poppins_500Medium",
          }}
        >
          Filtros
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Icon name="refresh-ccw" size={23} color="#d8d6d6" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="x-circle" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            borderBottomWidth: 1,
            borderColor: "#d8d6d6",
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Tipo de imóvel
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Filtre por Casa, apartamento, ou por varios outros tipos de
              Imóveis
            </Text>
          </View>
          <FlatList
            data={categoriesData}
            renderItem={({ item }) =>
              renderItem({ item, selectedItemId, setSelectedItemId })
            }
            keyExtractor={(item) => item.id.toString()} // Alterei para toString() para garantir que o id seja uma string
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            borderBottomWidth: 1,
            borderColor: "#d8d6d6",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Localização
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Filtre por Casa, apartamento, ou por varios outros tipos de
              Imóveis
            </Text>
          </View>
          <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            iconStyle={style.iconStyle}
            data={formatedProvinceData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione a Província"
            value={province}
            onChange={(item) => {
              setProvince(item.value);
              fetchCountyData(item.value);
            }}
          />
          {province !== null && (
            <Dropdown
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              data={formatedCountyData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Selecione o município"
              value={county}
              onChange={(item) => {
                setCounty(item.value);
              }}
            />
          )}
          <TextInput
            style={style.input}
            onChangeText={setAddress}
            placeholder="Insira o Endereço"
            keyboardType="default"
            value={address}
          />
          <TextInput
            style={style.input}
            onChangeText={setStreet}
            value={street}
            placeholder="Insira a Rua"
            keyboardType="default"
          />
        </View>

        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            borderBottomWidth: 1,
            borderColor: "#d8d6d6",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Tipo de transação
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Filtre por Casa, apartamento, ou por varios outros tipos de
              Imóveis
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {typeStatusData.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: "#000",
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            borderBottomWidth: 1,
            borderColor: "#d8d6d6",
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Quartos & Cosinhas
            </Text>
          </View>
          <View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Quartos
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 12,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Filtre por Casa, apartamento, ou por varios outros tipos de
                Imóveis
              </Text>
            </View>
            <FlatList
              data={counter}
              renderItem={({ item }) =>
                renderItemBadroom({
                  item,
                  selectedItemBadroomId,
                  setSelectedItemBadroomId,
                })
              }
              keyExtractor={(item) => item.id.toString()} // Alterei para toString() para garantir que o id seja uma string
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            gap: 10,
            borderBottomWidth: 1,
            borderColor: "#d8d6d6",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Tipo de transação
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Filtre por Casa, apartamento, ou por varios outros tipos de
              Imóveis
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Ola</Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={"black"} />
    </SafeAreaView>
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
  categoryImovel: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.4)",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
