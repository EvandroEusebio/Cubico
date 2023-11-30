import React, {useState} from 'react'
import { View, Text, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native'
import { addImovel_style } from '../../styles/addImovel_style'
import { StatusBar } from 'expo-status-bar'
import { Dropdown } from 'react-native-element-dropdown'
import Button from '../../components/button/Button'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';



export default function AddImovel() {
    const {latitude, setLatitude} = useState('')
    const {longitude, setLongitude} = useState('')
    const [province, setProvince] = useState(null);
    const [county, setCounty] = useState(null);
    const [typeStatus, setTypeStatus] = useState(null);
    const {price, setPrice} = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalArea, setTotalArea] = useState('')
    const [selectedItemId, setSelectedItemId] = useState();
    const [image01, setImage01] = useState(null);
    const [image02, setImage02] = useState(null);
    const [image03, setImage03] = useState(null);
    const [image04, setImage04] = useState(null);

    const Item = ({item, backgroundColor, onPress}) => (
        <TouchableOpacity style={[addImovel_style.categoryImovel, {backgroundColor}]} onPress={() => {onPress(); handlePressSelectedCategory(item.type)}}>
            <Icon2 name={item.icon} size={20} color="#000" />
          <Text style={addImovel_style.categoryImovelText}>{item.type}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedItemId ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.0)';
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedItemId(item.id)}
            backgroundColor={backgroundColor}
          />
        );
      }
    
    const handlePressSelectedCategory = (type) => {
        setSelectedCategory(type); 
      
    };    

    console.log(selectedCategory)

    const categoriesData = [
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
        { label: 'Camama', value: '3' },
        { label: 'Kilamba', value: '4' },
    ];

    const pickImage01 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage01(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };

      const pickImage02 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage02(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };

      const pickImage03 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage03(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };

      const pickImage04 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage04(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };

    return (
        <ScrollView style={addImovel_style.container} showsVerticalScrollIndicator={false}>
            <View style={addImovel_style.header}>
                <Text  style={addImovel_style.headerTitle01}>Descreva o seu</Text>
                <Text style={addImovel_style.headerTitle02}>Imóvel</Text>
            </View>
            <View>
                <FlatList
                    data={categoriesData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    extraData={selectedItemId}
                />
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

                <TextInput
                    style={addImovel_style.input}
                    onChangeText={setTotalArea}
                    value={totalArea}
                    placeholder="Informe a Area total em metros"
                    keyboardType="numeric"
                />

                <Text style={addImovel_style.subtitle}>Adicione Imagens</Text>
                <View style={addImovel_style.containerPicture}>
                    <TouchableOpacity style={addImovel_style.picture} onPress={pickImage01}>
                        {image01 != null ? <Image source={{ uri: image01 }} style={{ width: 150, height: 150 }}/>: <Text style={addImovel_style.pictureText}>+</Text>}
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={addImovel_style.picture} onPress={pickImage02}>
                        {image02 != null ? <Image source={{ uri: image02 }} style={{ width: 150, height: 150 }}/>: <Text style={addImovel_style.pictureText}>+</Text>}
                        
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={addImovel_style.picture} onPress={pickImage03}>
                        {image03 != null ? <Image source={{ uri: image03 }} style={{ width: 150, height: 150 }}/>: <Text style={addImovel_style.pictureText}>+</Text>}
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={addImovel_style.picture} onPress={pickImage04}>
                        {image04 != null ? <Image source={{ uri: image04 }} style={{ width: 150, height: 150 }}/>: <Text style={addImovel_style.pictureText}>+</Text>}
                        
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 40}}>
                    <Button name={'Hospedar'} bgColor={'#094559'} textColor={'#fff'}/>
                </View>
                
            </View>
            
        </ScrollView>
    )
}
