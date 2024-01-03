import React, { useState, } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { markDataCalendar_style } from "../../styles/markDataCalendar_style";
import axios from "axios";
import API_URL from "../../../config/api";
import { useSelector } from "react-redux";

export default function MarkDataCalendar() {
  const [selected, setSelected] = useState("");
  const [hours, setHours] = useState("");
  const infoImovel = useSelector((state) => state.infoImovel.imovelDetail);
  console.log(infoImovel);
  const id = useSelector((state) => state.auth.user.id);
  console.log(id)


  const hundleVisitRequest =  async () => {
    console.log(selected)
    const data = {
      'owner_id': infoImovel.owner_id,
      'customer_id': id,
      'imovel_id': infoImovel.id,
      'date': selected
    }
    await axios
      .post(API_URL + `api/v1/marcar/visita`, data)
      .then(function (response) {
        console.log(response.data)
        console.warn("Enviado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <View style={markDataCalendar_style.container}>
      <View style={markDataCalendar_style.containerTitle}>
        <Text style={markDataCalendar_style.title}>Selecione a data para a</Text>
        <Text style={markDataCalendar_style.title}>Visita</Text>
      </View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: "#fff", // Cor de fundo quando o dia é selecionado
            dotColor: "white", // Cor do ponto abaixo do dia selecionado
          },
        }}
        style={{
          width: 330,
          borderRadius: 20,
          padding: 10
        }}
        theme={{
          calendarBackground: "#000",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#fff",
          selectedDayTextColor: "#000",
          todayTextColor: "red",
          dayTextColor: "#fff",
          textDisabledColor: "#d9e1e8",
          dotColor: "#fff",
          selectedDotColor: "#ffffff",
          arrowColor: "#fff",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#fff",
          indicatorColor: "#fff",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textMonthFontWeight: "bold",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      
      <TouchableOpacity style={markDataCalendar_style.btnSubmit} onPress={hundleVisitRequest}>
        <Text style={markDataCalendar_style.btnTitle}>Enviar solicitação</Text>
      </TouchableOpacity>
    </View>
  );
}
