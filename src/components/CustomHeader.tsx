import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../../assets/drawable/back.svg';
import CartIcon from '../../assets/drawable/cart.svg';

const CustomHeader = ({
  title,
  inCart,
  navigation,
}: {
  title?: string;
  inCart?: boolean;
  navigation?: any;
}) => {
  const onCartTouch = () => {
    if (!navigation) {
      return;
    }
    navigation.navigate('Cart');
  };

  const onBackTouch = () => {
    if(navigation.getState().routes.length > 1)
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flexDirection: 'row', width: '100%'}}>
        <View
          style={{height: '100%', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onBackTouch}>
            <View >
              <BackIcon color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title ? title : '경상대 카페'}</Text>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              height: '100%',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 8,
            }}>
            {!inCart && (
              <TouchableOpacity onPress={onCartTouch}>
                <CartIcon color={'black'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 12,
    verticalAlign: 'middle',
  },
  title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
