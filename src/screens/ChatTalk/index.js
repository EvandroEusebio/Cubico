import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import {
  GiftedChat,
  Send,
  Composer,
  InputToolbar,
  MessageContainer,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import axios from "axios";
import API_URL from "../../../config/api";
import { useSelector } from "react-redux";
import MySocketApp from "../../utils/Socket"

const ChatTalk = () => {
  const route = useRoute();
  
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.user.id);
  const userName = useSelector((state) => state.auth.user.name);

  useEffect(() => {
    MySocketApp.emit("addUser", userId)
    MySocketApp.on("getUsers", (users) =>{
      console.log(`conectado : ${JSON.stringify(users)}`)
    })

  }, [userId])

  useEffect(() => {
    /*
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: route.params?.recenderName,
          avatar: require("../../../assets/profile.jpg"),
        },
      },
    ]);
    */

    getMessage();
  }, [userId]);

  async function getMessage() {
    await axios
      .get(API_URL + `api/v1/get/message/${userId}/${route.params?.recenderId}`)
      .then((response) => {
        console.log(response.data);
        //setMessages([...messages, ...response.data]);
        setMessages(response.data);
      })
      .catch((error) => console.error("Erro ao buscar os dados: " + error));
  }

  const onSend = useCallback((messages = []) => {
    //console.log(messages[0].user._id);
    //console.log(messages)

    const idNumero = parseInt(messages[0]._id, 36);
    console.log(idNumero)
    MySocketApp.emit("sendMessage", {senderId: userId, receiverId: route.params?.recenderId,  data: messages[0] })
    sendMessage({ message_content: messages[0].text,
      recipient_id: route.params?.recenderId, sender_id: messages[0].user._id });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  

  useEffect(() => {
    MySocketApp.on("getMessage", (data) => {
      console.log(data)
      setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, data)
    );
    })

  }, [])

  function sendMessage() {
    io.emit("sendMessage", {senderId: 3, receiverId: route.params?.recenderId,  text: m })
  }

  async function sendMessage(data) {
    try {
      const response = await axios.post(API_URL + `api/v1/send/message`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerProfileInfo}>
            <Image
              source={require("../../../assets/profile.jpg")}
              style={styles.profileImg}
            />
            <Text style={styles.nameHeaderProfile}>{route.params?.recenderName}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Icon name="phone" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 10 }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userId,
            name: userName,
          }}
          textInputStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
          placeholder="Escreva a mensagem"
          loadEarlier={true}
          renderAvatarOnTop
          alwaysShowSend
          renderSend={(props) => {
            return (
              <Send {...props}>
                <View style={styles.containerIconSend}>
                  <Icon name="arrow-up" size={25} color="#fff" />
                </View>
              </Send>
            );
          }}
          renderInputToolbar={(props) => {
            return (
              <InputToolbar {...props} containerStyle={styles.inputMessage} />
            );
          }}
        />
      </View>
      <StatusBar
        barStyle={Platform.OS === "android" ? "auto" : "dark-content"}
      />
    </SafeAreaView>
  );
};

export default ChatTalk;
