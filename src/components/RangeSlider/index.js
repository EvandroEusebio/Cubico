import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function RangeNumber({ onChange}) {
    const [value, setValue] = useState({ values: [0, 800000] });
    const multiSliderValuesChange = (values) => {
        setValue({
            values,
        });
    };
    
    return (
        <View style={styles.container}>
            <MultiSlider
                values={[value.values[0], value.values[1]]}
                sliderLength={Dimensions.get('window').width * 0.83}
                selectedStyle={{ backgroundColor: "#000" }}
                // containerStyle={{
                //     justifyContent: 'center',
                //     alignItems: 'center'
                // }}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                    height: 30,
                    width: 30,
                    borderWidth: 7,
                    borderRadius: 50,
                    backgroundColor: "#000",
                    borderColor: "#fff",
                }}
                trackStyle={{
                    height: 10,
                }}
                unselectedStyle={{
                    borderRadius: 10
                }}
                min={0}
                markerOffsetY={5}
                max={800000}
                step={100}

            />
            <View style={styles.rangeText}>
                <Text style={styles.textColor}>{value.values[0]} K</Text>
                <Text style={styles.text}> - </Text>
                <Text style={styles.textColor}>{value.values[1]} K</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,

    },
    title: {
        fontSize: 16,
        
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        marginHorizontal: 10,
        marginTop: 10
    },
    rangeText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20
    },
    textColor: {
        color: '#DBDBDB',
        fontSize: 20
    }
});