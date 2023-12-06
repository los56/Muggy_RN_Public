import {StyleSheet, Text, View} from 'react-native';

const Counter = ({
  value,
  onIncrease,
  onDecrease,
}: {
  value: number;
  onIncrease: any;
  onDecrease: any;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText} onPress={onIncrease}>
        +
      </Text>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.valueText} onPress={onDecrease}>
        -
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  valueText: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
});

export default Counter;
