import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HorizontalLine from "./HorizontalLine";

const ToggleView = ({
  children,
  toggle,
  onPress,
  title
}: {
  children: any;
  toggle: any;
  onPress?: any;
  title: string;
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.handleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={{fontSize: 18}}>{toggle ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      <View style={styles.childContainer}>
        {toggle && children}
      </View>
      <HorizontalLine />
    </View>
  );
};

const styles = StyleSheet.create({
  handleContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  childContainer: {
    marginHorizontal: 12,
  },
});

export default ToggleView;
