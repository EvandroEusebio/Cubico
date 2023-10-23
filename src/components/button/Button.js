import {Text, TouchableOpacity} from 'react-native';
import { button_style } from '../../styles/button_style';


export default function Button({name, onPress, bgColor, textColor, fontFamily}){
    return (
      <TouchableOpacity onPress={onPress} style={[button_style.button, {backgroundColor: bgColor} ]}>
        <Text style={{color: textColor, fontFamily: fontFamily, fontSize: 15}}>{name}</Text>
      </TouchableOpacity>
    );
};
  