import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import Search from '../../components/Search'
import { home_style } from '../../styles/home_style'
import {  useFonts, Poppins_700Bold,  Poppins_300Light, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/Feather';


const dataCities = [
    {
      id: 1,
      nameCity: 'Luanda',
    },
    {
        id: 2,
        nameCity: 'Luanda',
    },
    {
        id: 3,
        nameCity: 'Luanda',
    },
    {
        id: 4,
        nameCity: 'Luanda',
    },
];

const dataTypeProperties = [
    {
      id: 1,
      type: 'Casas',
    },
    {
        id: 2,
        type: 'Apartamentos',
    },
    {
        id: 3,
        type: 'Terrenos',
    },
    {
        id: 4,
        type: 'Outhers',
    },
];

const dataProperties = [
    {
      id: 1,
      country: "Angola",
      province: "Luanda",
      owner: "Evandro Eusébio",
      distance: '2m',
      type: 'Casa',
      image: require('../../../assets/casa.jpg'),
      price: 2000
    },
    {
        id: 2,
        country: "Angola",
        province: "Benguela",
        owner: "Mario Coxe",
        distance: '5m',
        type: 'Terreno',
        image: require('../../../assets/terreno.jpg'),
        price: 2000
    },
    {
        id: 3,
        country: "Angola",
        province: "Huíla",
        owner: "Magallas production",
        distance: '3m',
        type: 'Apartamento',
        image: require('../../../assets/apartamento.jpg'),
        price: 2000
    },
    
];

const Cities = ({nameCity}) => (
    <TouchableOpacity style={home_style.item}>  
      <Text style={[home_style.nameCity]}>{nameCity}</Text>
    </TouchableOpacity>
);

const TypeProperties = ({type}) => (
    <TouchableOpacity style={home_style.item} activeOpacity={false}>  
      <Text style={home_style.nameTypeProperties}>{type}</Text>
    </TouchableOpacity>
);


const Properties = ({country, province, owner, distance, type, image, price}) => (
    <TouchableOpacity activeOpacity={1} style={home_style.containerItemPropertie}>  
      <Image
      style={home_style.imageProperties}
      source={image}
      />
      <View style={[home_style.containerInfo]}>
        <View>
            <Text>{country}, {province}</Text>
            <Text>{owner}</Text>
            <Text>{type}</Text>
            <Text>{price}</Text>
        </View>
        <View>
            <Text>{distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
);


export default function Home() {
    
    return (
        <View style={home_style.container}>
            <View>
                <FlatList
                    data={dataCities}
                    renderItem={({item}) => <Cities nameCity={item.nameCity} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            <View>
                <FlatList
                    data={dataTypeProperties}
                    renderItem={({item}) => <TypeProperties type={item.type} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={dataProperties}
                    renderItem={({item}) => <Properties type={item.type} country={item.country} price={item.price} distance={item.distance} image={item.image} province={item.province} owner={item.owner}/>}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
            <TouchableOpacity style={home_style.map} activeOpacity={0.3}>
                <Text style={home_style.textMap}>Mapa</Text>
                <Icon name="map" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
}
