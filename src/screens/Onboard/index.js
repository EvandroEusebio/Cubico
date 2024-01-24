import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { onboard_style } from "./onboard_style";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

import Button from "../../components/button/Button";

const DATA = [
  {
    id: "1",
    img: require("../../../assets/img_onboard/on_hello.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "2",
    img: require("../../../assets/img_onboard/on_house.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "3",
    img: require("../../../assets/img_onboard/on_add_home.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "4",
    img: require("../../../assets/img_onboard/on_location.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "5",
    img: require("../../../assets/img_onboard/on_visit.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "6",
    img: require("../../../assets/img_onboard/on_login.png"),
    title: "Olá Seja bem Vindo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const Item = ({ title, img, description }) => {
  const {width} = useWindowDimensions()
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
    <View style={[onboard_style.item, {width}]}>
      <View>
        <Image source={img} style={onboard_style.itemImage} />
      </View>
      <View style={onboard_style.itemText}>
        <Text style={[onboard_style.title, {fontFamily: "Poppins_700Bold"}]}>{title}</Text>
        <Text style={[onboard_style.description, {fontFamily: "Poppins_400Regular"}]}>{description}</Text>
      </View>
    </View>
  );
};

export default function Onboard() {
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
    <SafeAreaView style={onboard_style.container}>
      <View style={onboard_style.containerLogo}>
        <Image
          source={require("../../../assets/im/logo.png")}
          style={onboard_style.logo}
        />
        <TouchableOpacity>
          <Text style={[onboard_style.btnText, {fontFamily: "Poppins_400Regular"}]}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[onboard_style.btnText, {fontFamily: "Poppins_400Regular"}]}>Registar</Text>
        </TouchableOpacity>
      </View>
      <View style={onboard_style.containerFlatlist}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              img={item.img}
              description={item.description}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          pagingEnabled
          bounces={false}
        />
      </View>

      <View style={onboard_style.btn}>
        <Button
          name={"Seguinte"}
          bgColor={"#000"}
          textColor={"#f3f3f3"}
          fontFamily={"Poppins_700Bold"}
          onPress={() => loginHandle()}
        />
      </View>
    </SafeAreaView>
  );
}
