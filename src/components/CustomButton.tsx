import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {overwriteStyle} from "../utils/Muggy";

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  activeOpacity,
}: {
  title: string;
  onPress?: any;
  style?: any;
  textStyle?: any;
  activeOpacity?: any;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : 0.2}
      style={
        style ? overwriteStyle(styles.customButton, style) : styles.customButton
      }
      onPress={onPress}>
      <Text
        style={
          textStyle
            ? overwriteStyle(styles.customButtonText, textStyle)
            : styles.customButtonText
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: '100%',
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 12,
  },
  customButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;
