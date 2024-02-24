import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";


export default function Hosting() {
  const [message, setMessage] = useState("");
  const [m, setM] = useState("");
  const userId = useSelector((state) => state.auth.user.id);


  useEffect(() => {
    io.emit("addUser", userId)
    io.on("getUsers", (users) =>{
      console.log(`conectado : ${JSON.stringify(users)}`)
    })

  }, [userId])

  useEffect(() => {
    io.on("getMessage", (data) => {
      setMessage(data.text)
    })

  }, [])

  

  
  function sendMessage() {
    io.emit("sendMessage", {senderId: 3, receiverId: 9,  text: m })
  }

  return (
    <View>
      <TextInput
        value={m}
        onChangeText={setM}
        style={{
          borderWidth: 1,
          marginTop: 20,
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 20,
        }}
      />

      <TextInput
        value={message}
        style={{
          borderWidth: 1,
          marginTop: 20,
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 20,
          height: 300,
        }}
      />

      <TouchableOpacity
        onPress={() => sendMessage()}
        style={{
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginHorizontal: 20,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
