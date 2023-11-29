import React, {useState} from 'react'
import { View, Text, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { addImovel_style } from '../../styles/addImovel_style'
import { StatusBar } from 'expo-status-bar'
import { Dropdown } from 'react-native-element-dropdown'
import Button from '../../components/button/Button'

export default function AddImovel() {
    const {latitude, setLatitude} = useState('')
    const {longitude, setLongitude} = useState('')
    const [province, setProvince] = useState(null);
    const [county, setCounty] = useState(null);
    const [typeStatus, setTypeStatus] = useState(null);
    const {price, setPrice} = useState('')

    const typeStatusData = [
        { label: 'A venda', value: '1' },
        { label: 'Aluguer', value: '2' },
    ];

    const provinceData = [
        { label: 'Luanda', value: '1' },
        { label: 'Benguela', value: '2' },
        { label: 'Uíla', value: '3' },
        { label: 'Bié', value: '4' },
        { label: 'Huambo', value: '5' },
    ];

    
    const countyData = [
        { label: 'Talatona', value: '1' },
        { label: 'Belas', value: '2' },
        { label: 'Camama', value: '1' },
        { label: 'Kilamba', value: '2' },
    ];

    return (
        <ScrollView style={addImovel_style.container}>
            <View style={addImovel_style.header}>
                <Text  style={addImovel_style.headerTitle01}>Descreva o seu</Text>
                <Text style={addImovel_style.headerTitle02}>Imóvel</Text>
            </View>
            <View>
                <FlatList/>
            </View>
            <View style={addImovel_style.containerFormAddress}>
                <Text style={addImovel_style.subtitle}>Localização</Text>

                <Dropdown
                    style={addImovel_style.dropdown}
                    placeholderStyle={addImovel_style.placeholderStyle}
                    selectedTextStyle={addImovel_style.selectedTextStyle}
                    inputSearchStyle={addImovel_style.inputSearchStyle}
                    iconStyle={addImovel_style.iconStyle}
                    data={provinceData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione a Província"
                    value={province}
                    onChange={item => {
                    setProvince(item.value);
                    }}
                />

                <Dropdown
                    style={addImovel_style.dropdown}
                    placeholderStyle={addImovel_style.placeholderStyle}
                    selectedTextStyle={addImovel_style.selectedTextStyle}
                    inputSearchStyle={addImovel_style.inputSearchStyle}
                    iconStyle={addImovel_style.iconStyle}
                    data={countyData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o município"
                    value={county}
                    onChange={item => {
                    setCounty(item.value);
                    }}
                />

                <TextInput
                    style={addImovel_style.input}
                    onChangeText={setLatitude}
                    value={latitude}
                    placeholder="Insira a latitude"
                    keyboardType="numeric"
                />
                <TextInput
                    style={addImovel_style.input}
                    onChangeText={setLongitude}
                    value={longitude}
                    placeholder="Insira a longitude"
                    keyboardType="numeric"
                />
            </View>
            <View style={addImovel_style.containerFormInfo}>
                <Text style={addImovel_style.subtitle}>Informações Básicas</Text>
                <View style={addImovel_style.containerCounters}>
                    <Text  style={addImovel_style.containerCountersText}>Numero de Quartos</Text>
                    <View  style={addImovel_style.counter}>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>+</Text>
                        </TouchableOpacity>
                        <Text>0</Text>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={addImovel_style.containerCounters}>
                    <Text  style={addImovel_style.containerCountersText}>Numero de WC</Text>
                    <View  style={addImovel_style.counter}>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>+</Text>
                        </TouchableOpacity>
                        <Text>0</Text>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={addImovel_style.containerCounters}>
                    <Text  style={addImovel_style.containerCountersText}>Numero de Cosinhas</Text>
                    <View  style={addImovel_style.counter}>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>+</Text>
                        </TouchableOpacity>
                        <Text>0</Text>
                        <TouchableOpacity style={addImovel_style.counterBtn}>
                            <Text style={addImovel_style.counterBtnText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Dropdown
                    style={addImovel_style.dropdown}
                    placeholderStyle={addImovel_style.placeholderStyle}
                    selectedTextStyle={addImovel_style.selectedTextStyle}
                    inputSearchStyle={addImovel_style.inputSearchStyle}
                    iconStyle={addImovel_style.iconStyle}
                    data={typeStatusData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="qual o tipo de transação"
                    value={typeStatus}
                    onChange={item => {
                    setTypeStatus(item.value);
                    }}
                />

                <TextInput
                    style={addImovel_style.input}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Informe o preço"
                    keyboardType="numeric"
                />
                <Text style={addImovel_style.subtitle}>Adicione Imagens</Text>
                <View style={addImovel_style.containerPicture}>
                    <TouchableOpacity style={addImovel_style.picture}>
                        <Text style={addImovel_style.pictureText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={addImovel_style.picture}>
                        <Text style={addImovel_style.pictureText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={addImovel_style.picture}>
                        <Text style={addImovel_style.pictureText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={addImovel_style.picture}>
                        <Text style={addImovel_style.pictureText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Button name={'Hospedar'} bgColor={'#094559'} textColor={'#fff'}/>
            </View>
            
        </ScrollView>
    )
}
