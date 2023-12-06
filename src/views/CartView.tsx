import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/RootReducer';

import DeleteIcon from '../../assets/drawable/delete.svg';
import CloseIcon from '../../assets/drawable/close.svg';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import HorizontalLine from '../components/HorizontalLine';
import {GroupGap} from '../components/GroupGap';
import {useEffect, useState} from 'react';
import Counter from '../components/Counter';
import {max, min} from '../utils/Muggy';
import { setAmount, clearCart, setInList } from "../reducers/cartSlice";
import CustomButton from '../components/CustomButton';

export type CartScreenProps = NativeStackScreenProps<StackParamList, 'Cart'>;

const CartView = ({navigation}: CartScreenProps) => {
  const cartData = useSelector((state: RootState) => state.cart);
  const cafeCacheData = useSelector((state: RootState) => state.cafeCache);
  const dispatch = useDispatch();

  const onClear = () => {
    Alert.alert('장바구니 비우기', '장바구니를 비울까요?', [
      {
        text: '네',
        onPress: () => {
          dispatch(clearCart(null));
        },
      },
      {text: '아니요'},
    ]);
  };

  const EmptyView = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
        <Text style={styles.emptyText}>
          장바구니가 비어있어요.{'\n'}메뉴를 담아보세요!
        </Text>
      </View>
    );
  };

  const MenuListView = () => {
    const currentCafe = cafeCacheData.caches[cartData.cafeId];

    const MenuItem = ({menuId}: {menuId: string}) => {
      const menuData = useSelector(
        (state: RootState) => state.cart.inList[parseInt(menuId)],
      );
      const [count, setCount] = useState(menuData.amount);

      useEffect(() => {
        dispatch(setAmount({menuId: menuId, amount: count}));
      }, [count, menuId]);

      const inc = () => {
        setCount(max(count + 1, 99));
      };

      const dec = () => {
        setCount(min(count - 1, 1));
      };

      const removeItem = () => {
        Alert.alert('메뉴 지우기', '메뉴를 삭제할까요?', [
          {
            text: '네',
            onPress: () => {
              const removedInList = {...cartData.inList};
              delete removedInList[menuId];
              if (Object.keys(removedInList).length < 1) {
                dispatch(clearCart(null));
              } else {
                dispatch(setInList(removedInList));
              }
            },
          },
          {text: '아니요'},
        ]);
      };

      return (
        <View style={styles.menuContainer}>
          <View>
            <Image
              source={menuData.menuData.image}
              style={{width: 100, height: 100}}
            />
          </View>
          <View
            style={{marginLeft: 8, flex: 1, justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.menuTitleText}>
                {menuData.menuData.title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  removeItem();
                }}>
                <CloseIcon color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              <Counter value={count} onIncrease={inc} onDecrease={dec} />
            </View>
          </View>
        </View>
      );
    };

    const Items = () => {
      const res = [];
      let keyGen = 0;
      for (let i of Object.keys(cartData.inList)) {
        res.push(<MenuItem menuId={i} key={keyGen++} />);
      }

      return res;
    };

    return (
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.cartContainer}>
          <View style={styles.cartUpperContainer}>
            <Text style={styles.titleText}>{currentCafe.title}</Text>
            <DeleteIcon color={'black'} onPress={onClear} />
          </View>
          <HorizontalLine />
          <View>{Items()}</View>
        </View>
        <GroupGap />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'장바구니'} inCart={true} navigation={navigation} />
      {cartData.cafeId != -1 ? (
        <View style={{flex: 1}}>
          <MenuListView />
          <View style={{marginHorizontal: 8}}>
            <CustomButton
              title={'주문하기'}
              onPress={() => {
                console.log(cartData);
              }}
            />
          </View>
        </View>
      ) : (
        <EmptyView />
      )}
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {},
  cartContainer: {
    margin: 8,
  },
  cartUpperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 16,
  },
  emptyText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
  },
  titleText: {
    fontSize: 22,
  },
  menuContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  menuTitleText: {
    fontSize: 20,
  },
});

export default CartView;
