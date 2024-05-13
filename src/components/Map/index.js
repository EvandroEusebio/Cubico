import { useState, useEffect } from "react";
import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import API_URL from "../../../config/api";
import axios from "axios";
import * as Location from "expo-location";
import { map_style } from "../../styles/map_style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import polyline from "@mapbox/polyline";

const API_KEY = "5b3ce3597851110001cf62483466948fd64343e28aa9481e90aa8b14";

export default function Map() {
  const [dataImovel, setDataImovel] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [showDivImovelDetail, setShowDivImovelDetail] = useState(false);
  const [imovelData, setImovelData] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  console.log(showDivImovelDetail);

  useEffect(() => {
    getDataImovels();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);

    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  };

  const startNavigation = async (destin) => {
    if (currentLocation && destin) {
      try {
        // Faça uma solicitação ao OpenRouteService para obter a rota
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/driving-car`,
          {
            coordinates: [
              [currentLocation.longitude, currentLocation.latitude],
              [destin.longitude, destin.latitude],
            ],
            options: {
              avoid_features: ["ferries"],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        if (
          response.data &&
          response.data.routes &&
          response.data.routes.length > 0
        ) {
          const route = response.data.routes[0];

          if (route.geometry) {
            // Decodifique a polilinha para obter as coordenadas
            const decodedCoordinates = polyline.decode(route.geometry);

            // Converta as coordenadas para o formato esperado pelo react-native-maps
            const coordinates = decodedCoordinates.map((coord) => ({
              latitude: coord[0],
              longitude: coord[1],
            }));

            setRouteCoordinates(coordinates);
          } else {
            console.error(
              "A resposta não contém a geometria da rota esperada:",
              response
            );
          }
        } else {
          console.error(
            "Resposta da API do OpenRouteService não está no formato esperado:",
            response
          );
        }
      } catch (error) {
        console.error("Erro ao obter a rota:", error);
      }
    }
  };
  async function getDataImovels() {
    await axios
      .get(API_URL + `api/v1/imovel/withCoordenate/all`)
      .then((response) => {
        console.log(response.data.imovel);
        setImovelData(response.data.imovel);
      })
      .catch((error) =>
        console.error("Erro ao buscar os dados: " + error.message)
      );
  }

  console.log(imovelData);

  return (
    <View style={styles.container}>
      {imovelData.length !== 0 ? (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
              pinColor="black"
            >
              <Image
                source={require("../../../assets/profile.jpg")}
                style={map_style.locationImageUser}
              />
            </Marker>
          )}

          {imovelData.map((imovel, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: imovel.latitude,
                longitude: imovel.longitude,
              }}
              title={imovel.type_imovel.type}
              description={imovel.status}
              onPress={() => {
                setShowDivImovelDetail(true);
                setDataImovel(imovel);
                startNavigation({
                  latitude: imovel.latitude,
                  longitude: imovel.longitude,
                });
              }}
            >
              <View style={map_style.markerIcon}>
                {imovel.type_imovel.type === "Casa" && (
                  <MaterialIcons
                    name="home"
                    size={20}
                    color={"#fff"}
                    style={{ padding: 10 }}
                  />
                )}
                {imovel.type_imovel.type === "Apartamento" && (
                  <MaterialIcons
                    name="apartment"
                    size={20}
                    color={"#fff"}
                    style={{ padding: 10 }}
                  />
                )}
                {imovel.type_imovel.type === "Terreno" && (
                  <MaterialIcons
                    name="landscape"
                    size={20}
                    color={"#fff"}
                    style={{ padding: 10 }}
                  />
                )}
              </View>
            </Marker>
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#000"
              strokeWidth={5}
            />
          )}
        </MapView>
      ) : (
        <Text>Nenhum imóvel com coodernadas geográficas</Text>
      )}

      {showDivImovelDetail && dataImovel && (
        <TouchableOpacity
          style={map_style.containerImovelInfo}
          activeOpacity={0.5}
        >
          <TouchableOpacity
            style={map_style.closeBtn}
            onPress={() => {
              setShowDivImovelDetail(false);
            }}
          >
            <Ionicons name="close" size={20} color={"#fff"} />
          </TouchableOpacity>
          <Image
            source={{ uri: API_URL + "storage/imovelPictures/" + dataImovel.image01 }}
            style={map_style.image}
          />
          <View style={map_style.details}>
            <View style={{ justifyContent: "space-between" }}>
              <View>
                <Text style={map_style.textLocation}>
                  {dataImovel.province.name}
                </Text>
                <Text style={map_style.textLocation}>
                  {dataImovel.county.name}
                </Text>
                <Text style={{ color: "gray" }}>
                  Por {dataImovel.owner.name}
                </Text>
              </View>

              <View style={map_style.price}>
                <Text style={{ fontWeight: "bold" }}>kz {dataImovel.price}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

/*
 */
