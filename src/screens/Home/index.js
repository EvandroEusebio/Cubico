import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import Search from '../../components/Search'
import { home_style } from '../../styles/home_style'
import {  useFonts, Poppins_700Bold,  Poppins_300Light, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const dataTypeProperties = [
    {
      id: 1,
      type: 'Casas',
      icon: 'house'
    },
    {
        id: 2,
        type: 'Apartamentos',
        icon: 'apartment'
    },
    {
        id: 3,
        type: 'Terrenos',
        icon: 'landscape'
    },
    {
        id: 4,
        type: 'Quartos',
        icon: 'single-bed'
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
      price: 2000,
      status: 'A venda',
    },
    {
        id: 2,
        country: "Angola",
        province: "Benguela",
        owner: "Mario Coxe",
        distance: '5m',
        type: 'Terreno',
        image: require('../../../assets/terreno.jpg'),
        price: 2000,
        status: 'A venda'
    },
    {
        id: 3,
        country: "Angola",
        province: "Huíla",
        owner: "Magallas production",
        distance: '3m',
        type: 'Apartamento',
        image: require('../../../assets/apartamento.jpg'),
        price: 2000,
        status: 'Aluguer'
    },
    
];


const TypeProperties = ({type, icon}) => (
    <TouchableOpacity style={home_style.item} activeOpacity={false}>  
        <View style={home_style.containerIcon}>
            <Icon2 name={icon} size={20} color="#000" />
        </View>
      <Text style={home_style.nameTypeProperties}>{type}</Text>
    </TouchableOpacity>
);


const Properties = ({country, province, owner, distance, type, image, price, status}) => (
    <TouchableOpacity activeOpacity={1} style={home_style.containerItemPropertie}>  
      <Image
      style={home_style.imageProperties}
      source={image}
      />
      <View style={[home_style.containerInfo]}>
        <View>
            <Text>{country}, {province}</Text>
            <Text>{owner}</Text>
            <View style={home_style.details}>
                <Icon name="map-pin" size={13} color="#000" />
                <Text>{distance}</Text>

                <Icon name="shopping-bag" size={13} color="#000" />
                <Text>{status}</Text>
            </View>
        </View>
        <View style={home_style.details2}>
            <Text>{type}</Text>
            <View style={home_style.price}>
                <Text style={home_style.textPrice}>{price} KZ</Text>
            </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={home_style.favorites}>
        <Icon2 name="favorite" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={[home_style.tag, {backgroundColor: status == 'A venda' ? 'green' : 'red'}]}>
        <Text style={home_style.textTag}>{status}</Text>
      </View>
    </TouchableOpacity>
);


export default function Home() {
    const [text, onChangeText] = useState('');
    return (
        <View style={home_style.container}>
            <View style={home_style.header}>
                <Text style={home_style.headerTitle}>CUBICO</Text>
                <TouchableOpacity style={home_style.containerIcon}>
                    <Icon name="bell" size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={home_style.containerFilter}>
                <View style={home_style.containerInput}>
                    <Icon name="search" size={20} color="#000" />
                    <TextInput
                        style={home_style.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder='Pesquise o que deseja encontrar'
                    />
                </View>
                <TouchableOpacity style={home_style.containerIcon}>
                    <Icon name="sliders" size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={dataTypeProperties}
                    renderItem={({item}) => <TypeProperties type={item.type} icon={item.icon}/>}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={dataProperties}
                    renderItem={({item}) => <Properties type={item.type} country={item.country} price={item.price} distance={item.distance} image={item.image} province={item.province} owner={item.owner} status={item.status}/>}
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
