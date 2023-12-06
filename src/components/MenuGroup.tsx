import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GroupData, MenuData } from "../types";
import HorizontalLine from "./HorizontalLine";
import { GroupGap } from "./GroupGap";

const Menu = ({data, navigation}: {data: MenuData; navigation: any}) => {
  const onTouchEvent = () => {
    navigation.navigate('Menu', {data: data});
  };

  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onTouchEvent}>
      <View style={{flex: 1}}>
        <Text style={styles.menuTitle}>{`${data.title}`}</Text>
        {data.description ? <Text>{`${data.description}`}</Text> : null}
        <Text>{`${data.price}원`}</Text>
      </View>
      <Image
        style={styles.menuImage}
        source={require('../../assets/drawable/img.png')}
      />
    </TouchableOpacity>
  );
};

const MenuGroup = ({data, navigation}: {data: GroupData, navigation: any}) => {
  const menus = () => {
    const res = [];
    for (let i = 0; i < data.menus.length; i++) {
      const current = data.menus[i];
      res.push(
        <View key={i} style={{marginHorizontal: 16}}>
          <Menu data={current} navigation={navigation} />
        </View>,
      );
      res.push(<HorizontalLine key={`hr${i}`} />);
    }
    res.push(<GroupGap key={`Gap`} />);
    return res;
  };

  return (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{data.title}</Text>
        {data.description ? <Text>{data.description}</Text> : null}
      </View>
      <View>{menus()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    borderRadius: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  groupTitle: {
    fontSize: 22,
  },
  groupHeader: {
    marginLeft: 16,
    marginVertical: 12,
  },
  menuImage: {
    width: '20%',
    height: '100%',
    resizeMode: 'stretch',
  },
  menuTitle: {
    fontSize: 18,
    marginBottom: 2,
  },
  menuDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 4,
  },
});

export default MenuGroup;
