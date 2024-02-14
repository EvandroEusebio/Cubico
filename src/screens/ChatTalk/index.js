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


import { styles } from "./styles";

const ChatTalk = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Evandro",
          avatar: require("../../../assets/profile.jpg"),
        },
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <TouchableOpacity>
            <Icon name="chevron-left" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerProfileInfo}>
            <Image
              source={require("../../../assets/profile.jpg")}
              style={styles.profileImg}
            />
            <Text style={styles.nameHeaderProfile}>Evandro Eusébio</Text>
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
            _id: 1,
            name: "Evandro",
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
