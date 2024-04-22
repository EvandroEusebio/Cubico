import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Button from "../button/Button";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import API_URL from "../../../config/api";


const categoriesData = [
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

const dataWc = [
  {
    id: 1,
    total: "any",
  },
  {
    id: 2,
    total: 1,
  },
  {
    id: 3,
    total: 2,
  },
  {
    id: 4,
    total: 3,
  },

  {
    id: 5,
    total: 4,
  },

  {
    id: 6,
    total: 5,
  },
  {
    id: 7,
    total: "+6",
  },
];
export default function ContentButtonSheetFilter() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCounty, setDataCounty] = useState([]);

  const [selectedTotalWc, setSelectedTotalWc] = useState(1);
  const [selectedTotalWcItemId, setSelectedTotalWcItemId] = useState(1);

  const Item = ({ item, backgroundColor, onPress, textColor, iconColor }) => (
    <TouchableOpacity
      style={[styles.categoryImovel, { backgroundColor }]}
      onPress={() => {
        onPress();
        handlePressSelectedCategory(item.id);
        //fresh();
      }}
    >
      <Icon2 name={item.icon} size={20} color={iconColor} />
      <Text style={[styles.categoryImovelText, { color: textColor }]}>
        {item.type}
      </Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
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

  const ItemWc = ({ item, backgroundColor, onPress, textColor, iconColor }) => (
    <TouchableOpacity
      style={[styles.circleTotal, { backgroundColor }]}
      onPress={() => {
        onPress();
        handlePressSelectedCategory(item.total);
        //fresh();
      }}
    >
      <Text style={[styles.categoryImovelText, { color: textColor }]}>
        {item.total}
      </Text>
    </TouchableOpacity>
  );
  const renderTotalWcItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedTotalWcItemId ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.0)";
    const textColor = item.id === selectedTotalWcItemId ? "#fff" : "#000";
    const iconColor = item.id === selectedTotalWcItemId ? "#fff" : "#000";

    return (
      <ItemWc
        item={item}
        onPress={() => setSelectedTotalWcItemId(item.id)}
        textColor={textColor}
        iconColor={iconColor}
        backgroundColor={backgroundColor}
      />
    );
  };

  // get value of the Selected Category
  const handlePressSelectedCategory = (type) => {
    setSelectedTotalWc(type);
  };

  const handlePressSelectedTotalWc = (type) => {
    setSelectedTotalWc(type);
  };

  useEffect(() => {
    axios
      .get(API_URL + `api/v1/provincia`)
      .then((response) => {
        console.log(response.data)
        setDataProvince(response.data)})
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle01}>Filtre Aqui</Text>
      </View>
      <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={selectedItemId}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle01}>Quartos de banho</Text>
      </View>
      <FlatList
        data={dataWc}
        renderItem={renderTotalWcItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={selectedItemId}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle01}>Cosinhas</Text>
      </View>
      <FlatList
        data={dataWc}
        renderItem={renderTotalWcItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={selectedItemId}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle01}>Quartos</Text>
      </View>
      <FlatList
        data={dataWc}
        renderItem={renderTotalWcItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={selectedItemId}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataProvince}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecione a Província"
        //value={province}
        onChange={(item) => {
          setProvince(item.value);
          fetchCountyData(item.value);
        }}
      />

      <View style={{ marginHorizontal: 20 }}>
        <Button
          name={"Filtrar"}
          bgColor={"#000"}
          textColor={"#f3f3f3"}
          fontFamily={"Poppins_700Bold"}
          //onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  categoryImovel: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  headerTitle01: {
    fontSize: 25,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
  circleTotal: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    
  },
  dropdown: {
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)'
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
  header:{
    paddingLeft: 16,
    paddingVertical: 10
  },
  headerTitle01:{
    fontSize: 30,
    fontWeight: '600'

  },
  headerTitle02:{
    fontSize: 33,
    fontWeight: '900',
    color: "#000"
  },
  containerFormAddress:{
    paddingHorizontal: 16,
    gap: 20
  },
  subtitle:{
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  input:{
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  containerFormInfo:{
    paddingHorizontal: 16,
    gap: 20,
    marginTop: 16,
  },
  containerCounters:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  counterBtn:{
    backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50
  },
  counterBtnText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  containerPicture:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20
  },
  picture:{
    width: 150,
    height: 150,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'dashed'
  },
  pictureText:{
    color: "#000",
    fontSize: 25,
  },
  categoryImovel:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10
  }

});
