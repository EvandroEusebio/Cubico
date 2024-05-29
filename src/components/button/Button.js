import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { button_style } from "../../styles/button_style";

export default function Button({
  name,
  onPress,
  bgColor,
  textColor,
  fontFamily,
  loading,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[button_style.button, { backgroundColor: bgColor }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text
          style={{ color: textColor, fontFamily: fontFamily, fontSize: 15 }}
        >
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
}
