import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { infoImovel_style } from "../../styles/infoImovel_style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import M2 from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import API_URL from "../../../config/api";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SlicePointerPhrase from "../../utils/SlicePointerPhrase";
import * as Linking from 'expo-linking';

const make  = () =>{
  if(Platform.OS === "ios" || Platform.OS === "android"){
    Linking.openURL("tel:938390399")
  }else{
    Linking.openURL("telprompt: 938390399")
  }
}

const dataInfo = [
  {
    id: 1,
    type: "Quarto",
    icon: "bed",
    quantity: 5,
  },
  {
    id: 2,
    type: "WC",
    icon: "shower",
    quantity: 5,
  },
  {
    id: 3,
    type: "Cosinha",
    icon: "food",
    quantity: 5,
  },
  {
    id: 4,
    type: "metros",
    icon: "map-marker-distance",
    quantity: 5,
  },
];

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

const ShowImages = ({ item, showImage }) => (
  <View style={{ flexDirection: "row" }}>
    {[item.image01, item.image02, item.image03, item.image04].map(
      (image, index) => (
        <TouchableOpacity onPress={() => showImage(image)} key={index}>
          <Image
            key={index}
            source={{ uri: API_URL + "storage/imovelPictures/" + image }}
            style={infoImovel_style.galeryImage}
          />
        </TouchableOpacity>
      )
    )}
  </View>
);

const Commentar = ({ item }) => {
  return (
    <View style={infoImovel_style.containerComentar}>
      <View>
        <Text>{calcularDiferencaTempo(item.created_at)}</Text>
      </View>
      <ScrollView style={infoImovel_style.textComment}>
        <Text numberOfLines={7}>{item.comment}</Text>
      </ScrollView>
      <View style={infoImovel_style.containerUserComentar}>
        <Image
          source={
            item.user.imageProfile == null
              ? require("../../../assets/pro.png")
              : { uri: API_URL + "storage/" + item.user.imageProfile }
          }
          style={infoImovel_style.userImageComentar}
        />
        <View>
          <Text style={infoImovel_style.userTextComentar}>
            {item.user.name}
          </Text>
          <Text>{item.user.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const Info = ({ type, icon, quantity }) => (
  <View style={infoImovel_style.item}>
    <View style={infoImovel_style.containerIcon}>
      <M2 name={icon} />
    </View>

    <Text>{quantity}</Text>
    <Text>{type}</Text>
  </View>
);

export default function InfoImovel() {
  const infoImovel = useSelector((state) => state.infoImovel.imovelDetail);
  const ownerId = useSelector((state) => state.auth.user.id);
  const [data, setData] = useState([infoImovel]);
  const navigation = useNavigation();
  const [dataImovelCommentar, setDataImovelCommentar] = useState([]);
  const [showContainerComment, setShowContainerComment] = useState(false);
  const [myComment, setMyComment] = useState("");
  const [totalCommentImovel, setTotalCommentImovel] = useState(0);
  const [showImageBanner, setShowImageBanner] = useState(infoImovel.image01);
  console.log(infoImovel);
  const [isFavorite, setIsFavorite] = useState(false);
  function change(image) {
    setShowImageBanner(image);
  }

  const total = [
    { id: 1, type: "Quarto", icon: "bed", quantity: infoImovel.total_bedrooms },
    { id: 2, type: "Wc", icon: "shower", quantity: infoImovel.total_wc },
    {
      id: 3,
      type: "Cosinha",
      icon: "food",
      quantity: infoImovel.total_kitchen,
    },
    {
      id: 4,
      type: "metros",
      icon: "map-marker-distance",
      quantity: 5,
    },
  ];

  function navigateChatRoom() {
    navigation.navigate("ChatTalk", {
      recenderId: infoImovel.owner.id || "",
      recenderName: infoImovel.owner.name || "",
      recenderPhoto: infoImovel.owner.imageProfile || "",
    });
  }

  async function postComment(comment, user_id, imovel_id) {
    try {
      let data = {
        user_id: user_id,
        imovel_id: imovel_id,
        comment: comment,
      };
      const response = await axios.post(
        API_URL + "api/v1/enviar/comentario",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      getDataImovelCommentar();
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Erro 422 - Solicitação inválida:", error.response.data);
      } else {
        // Outro tipo de erro
        console.error("Erro:", error);
      }
    }
  }

  async function getDataImovelCommentar() {
    await axios
      .get(API_URL + `api/v1/imovel/comentarios/${infoImovel.id}`)
      .then((response) => {
        //console.log(response.data.commentsImovel.data);
        setDataImovelCommentar(response.data.commentsImovel.data);
        setTotalCommentImovel(response.data.totalCommentsImovel);
        /*
        if (response.data.imovel.data.length === 0) {
          return;
        } else {
          setImovels([...imovels, ...response.data.imovel.data]);
          setPagination(pagination + 1);
          console.log(response.data.imovel.data);
        }*/
      })
      .catch((error) => console.error("Erro ao buscar os dados: " + error));
  }

  useEffect(() => {
    getDataImovelCommentar();
  }, []);

  

  useEffect(() => {
    // Verifica se o imóvel é favorito quando o componente é montado
    isPropertyFavorite();
  }, []);

  const isPropertyFavorite = async () => {
    try {
      const response = await fetch(
        API_URL + `api/v1/user/${ownerId}/favorite/${infoImovel.id}`
      );
      const data = await response.json();
      //console.warn(data.is_favorite);
      setIsFavorite(data.is_favorite);
    } catch (error) {
      console.error("Erro ao verificar favorito:", error.message);
      return false;
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch(API_URL + `api/v1/user/${ownerId}/favorite/${infoImovel.id}`
      , {
        method: isFavorite ? 'DELETE' : 'POST',
      });
      const data = await response.json();
      console.warn(data)
      setIsFavorite(data.is_favorite);
    } catch (error) {
      console.error('Erro ao marcar favorito:', error.message);
    }
  };

  function hasRendTimeImovel(rendTime) {
    if (rendTime === "0") {
      return;
    } else if (rendTime === "1") {
      return "/mês";
    } else if (rendTime === "2") {
      return "/anual";
    }
  }

  return (
    <ScrollView
      style={infoImovel_style.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 260 }}>
        <Image
          source={{
            uri: API_URL + "storage/imovelPictures/" + showImageBanner,
          }}
          style={infoImovel_style.bannerImage}
        />
        <TouchableOpacity style={infoImovel_style.iconHeart} onPress={() => toggleFavorite()}>
          <M2 name="heart" size={35} color={isFavorite ? "red" : "rgba(0, 0, 0, 0.5)"} />
        </TouchableOpacity>
      </View>
      <View style={infoImovel_style.containerInfo}>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ShowImages item={item} showImage={setShowImageBanner} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={infoImovel_style.title}>
          {infoImovel.type_imovel.type} Kz {infoImovel.price}
          {hasRendTimeImovel(infoImovel.rent_time)}
        </Text>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={total}
            renderItem={({ item }) => (
              <Info
                type={item.type}
                icon={item.icon}
                quantity={item.quantity}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={infoImovel_style.containerUser}>
          <View style={infoImovel_style.containerUserInfo}>
            <Image
              source={require("../../../assets/pro.png")}
              style={infoImovel_style.profileImage}
            />
            <View style={infoImovel_style.containerUserName}>
              <Text style={infoImovel_style.userName}>
                {infoImovel.owner.name}
              </Text>
              <Text style={infoImovel_style.userEmail}>Proprietário</Text>
            </View>
          </View>
        </View>

        <View style={infoImovel_style.containerUserContact}>
          <View style={infoImovel_style.userDatail}>
            <View style={infoImovel_style.userDatailDiv1}>
              <MaterialIcons name="alternate-email" size={20} />
              <Text>Email ......................................</Text>
            </View>
            <Text>{SlicePointerPhrase(infoImovel.owner.email, 10)}</Text>
          </View>
          <View style={infoImovel_style.userDatail}>
            <View style={infoImovel_style.userDatailDiv1}>
              <MaterialIcons name="phone" size={20} />
              <Text>
                Telefone ..............................................
              </Text>
            </View>
            <Text>{infoImovel.owner.phone}</Text>
          </View>
          <View style={infoImovel_style.containerContactBtn}>
            <TouchableOpacity
              style={[infoImovel_style.contactBtn, { flex: 2 }]}
              onPress={() => navigateChatRoom()}
            >
              <MaterialIcons name="chat" size={20} color={"#fff"} />
              <Text style={{ color: "#fff" }}>Mensagem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[infoImovel_style.contactBtn, { flex: 1 }]}
              onPress={() => make()}
            >
              <MaterialIcons name="phone" size={20} color={"#fff"} />
              <Text style={{ color: "#fff" }}>Ligar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={infoImovel_style.containerDescription}>
          <Text style={infoImovel_style.subTitle}>Descrição</Text>
          <Text style={infoImovel_style.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the.
          </Text>
        </View>
        <View style={infoImovel_style.containerMap}>
          <Text style={infoImovel_style.subTitle}>Localização</Text>
          {(infoImovel.latitude !== null ||
            infoImovel.longitude !== null) && (
              <MapView
                style={infoImovel_style.map}
                initialRegion={{
                  latitude: infoImovel.latitude,
                  longitude: infoImovel.longitude,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: infoImovel.latitude,
                    longitude: infoImovel.longitude,
                  }}
                  title="Seu Marcador"
                  description="Descrição do seu marcador aqui"
                />
              </MapView>
            )}
        </View>

        <View style={infoImovel_style.containerComm}>
          <View style={infoImovel_style.containerTitleCommentary}>
            <View style={infoImovel_style.titleCommentary}>
              <Text style={infoImovel_style.countCommentar}>
                {totalCommentImovel}
              </Text>
              <Text style={infoImovel_style.textCommentar}>Comentários</Text>
            </View>

            <TouchableOpacity
              style={infoImovel_style.btnShowCommentar}
              onPress={() => setShowContainerComment(!showContainerComment)}
            >
              <Ionicons
                name={showContainerComment ? "chevron-up" : "chevron-down"}
                size={20}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>

          {showContainerComment && (
            <View style={infoImovel_style.commentContainer}>
              <TextInput
                placeholder="Comente aqui"
                style={infoImovel_style.inputComment}
                textAlignVertical="top"
                multiline={true}
                numberoflines={4}
                keyboardType="default"
                onChangeText={setMyComment}
                autoScroll={true}
              />
              <TouchableOpacity
                style={infoImovel_style.btnCommentarSend}
                onPress={() => postComment(myComment, ownerId, infoImovel.id)}
              >
                <Ionicons name="navigate" size={20} color={"#fff"} />
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={dataImovelCommentar}
            renderItem={({ item }) => <Commentar item={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {ownerId !== infoImovel.owner_id && (
          <TouchableOpacity
            style={infoImovel_style.btn}
            onPress={() =>
              navigation.navigate("VisitAppointment", {
                province_id: null,
                county_id: null,
                showCounty: false,
                image01: null,
                image02: null,
                image03: null,
                image04: null,
                status: false,
              })
            }
          >
            <Text style={infoImovel_style.btnTitle}>Marcar Visita</Text>
          </TouchableOpacity>
        )}
        {ownerId === infoImovel.owner_id && (
          <TouchableOpacity
            style={infoImovel_style.btn}
            onPress={() =>
              navigation.navigate("UpdateMyImovel", {
                province_id: infoImovel.province_id,
                county_id: infoImovel.county_id,
                showCounty: true,
                image01:
                  API_URL + "storage/imovelPictures/" + infoImovel.image01,
                image02:
                  API_URL + "storage/imovelPictures/" + infoImovel.image02,
                image03:
                  API_URL + "storage/imovelPictures/" + infoImovel.image03,
                image04:
                  API_URL + "storage/imovelPictures/" + infoImovel.image04,
                status: true,
                price: infoImovel.price.toString(),
                totalArea: infoImovel.area_total.toString(),
                latitude: infoImovel.latitude.toString(),
                longitude: infoImovel.longitude.toString(),
                type_imovel_id: infoImovel.type_imovel_id,
                total_wc: infoImovel.total_wc,
                total_bedrooms: infoImovel.total_bedrooms,
                transaction_type_id: infoImovel.transaction_type_id,
                title: "Edite o seu Imovel",
                text: infoImovel.type_imovel.type,
              })
            }
          >
            <Text style={infoImovel_style.btnTitle}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
