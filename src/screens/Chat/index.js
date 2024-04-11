import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import API_URL from "../../../config/api";
import { useSelector } from "react-redux";
import axios from "axios";
import MySocketApp from "../../utils/Socket"


const calcularDiferencaTempo = (dataComentario) => {
  const dataComentarioFormatada = new Date(dataComentario);
  const currentDate = new Date();
  const differenceMS = currentDate - dataComentarioFormatada;
  const differenceMinutes = Math.floor(differenceMS / (1000 * 60));
  const differenceTimes = Math.floor(differenceMinutes / 60);
  const differenceDays = Math.floor(differenceTimes / 24);
  const differenceMonth = Math.floor(differenceDays / 30);

  if (differenceMonth > 0) {
    return `${differenceMonth} meses atrás`;
  } else if (differenceDays > 0) {
    return `${differenceDays} dias atrás`;
  } else if (differenceTimes > 0) {
    return `${differenceTimes} horas atrás`;
  } else if (differenceMinutes > 0) {
    return `${differenceMinutes} minutos atrás`;
  } else {
    return "Agora mesmo";
  }
};

const Item = ({ item, navigation, latestMessage }) => (
  <TouchableOpacity
    style={chat_style.item}
    onPress={() => navigation.navigate("ChatTalk", {
      recenderId: item.recipient.id,
      recenderName:  item.recipient.name,
      recenderPhoto:  item.recipient.imageProfile
    })}
  >
    <Image source={require("../../../assets/pro.png")} style={chat_style.profileImg} />
    <View style={chat_style.containerImg}>
      <View style={chat_style.containerProfileName}>
        <Text style={chat_style.profileName}>{item.recipient.name}</Text>
        {
          latestMessage === null ? (
            <Text style={chat_style.message}>{item.message_content}</Text>
          ):(
            <Text style={chat_style.message}>{latestMessage.userId  === item.recipient.id ? latestMessage.message : item.message_content}</Text>
          )
        }
        
      </View>
      <View style={chat_style.status}>
        <Text style={chat_style.textChat}>{calcularDiferencaTempo(item.created_at)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Chat = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = useState("");
  const userId = useSelector((state) => state.auth.user.id);
  const [contactUser, setContactUser] = useState([]);
  const [latestMessage, setLatestMessage] = useState(null)


  
  useEffect(() => {
    getContacts();
  }, []);


  useEffect(() => {
    MySocketApp.on("getMessage", (data) => {
      //console.log(data)
      //console.warn(data.text)
      //console.warn(data.user._id)
      setLatestMessage({userId: data.user._id,  message: data.text})
    })

  }, [])

  //console.log(latestMessage)

  async function getContacts() {
    await axios
      .get(API_URL + `api/v1/get/message/contact/user/${userId}`)
      .then((response) => {
        console.log(response.data);
        setContactUser(response.data);
      })
      .catch((error) => console.error("Erro ao buscar os dados: " + error));
  }

  //console.log(contactUser)

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
          data={contactUser}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} latestMessage={latestMessage}/>
          )}
          showsVerticalScrollIndicator={false}
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
    marginVertical: 20,
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
  message: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  containerFlatList: {
    flex: 1,
  },
});
export default Chat;
