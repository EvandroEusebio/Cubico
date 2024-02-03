import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const contactUsers = [
  {
    id: 1,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 2,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 3,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 4,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 5,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 6,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 7,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 8,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
  {
    id: 9,
    img: require("../../../assets/profile.jpg"),
    name: "Evandro Eusébio",
    status: "agora",
    message: "Ola, como vai você",
  },
];

const Item = ({ name, status, img, message }) => (
  <TouchableOpacity style={chat_style.item}>
    <Image source={img} style={chat_style.profileImg} />
    <View style={chat_style.containerImg}>
      <View style={chat_style.containerProfileName}>
        <Text style={chat_style.profileName}>{name}</Text>
        <Text style={chat_style.message}>{message}</Text>
      </View>
      <View style={chat_style.status}>
        <Text style={chat_style.textChat}>{status}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Chat = () => {
  const [text, onChangeText] = useState("");
  return (
    <SafeAreaView style={chat_style.container}>
      <View style={chat_style.containerInput}>
        <Icon name="search" size={25} color="#000" />
        <TextInput
          style={chat_style.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Pesquise o que deseja encontrar"
        />
      </View>

      <View style={chat_style.containerFlatList}>
        <FlatList
          data={contactUsers}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              status={item.status}
              img={item.img}
              message={item.message}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const chat_style = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 7,
    gap: 10,
    borderRadius: 50,
    borderColor: "#cfcfd1",
    marginHorizontal: 18,
    marginVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginVertical: 18,
    gap: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  containerImg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  containerProfileName: {
    marginBottom: 10,
  },
  message:{
    color: "rgba(0, 0, 0, 0.5)"
  },
  containerFlatList:{
    flex: 1
  }
});
export default Chat;
