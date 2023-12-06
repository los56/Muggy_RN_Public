import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "../utils/Constants";
import CustomHeader from "../components/CustomHeader";
import { useState } from "react";
import Counter from "../components/Counter";

import NextIcon from "../../assets/drawable/next.svg";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/RootReducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { addMenu, setCart, setInList } from "../reducers/cartSlice";
import Snackbar from "react-native-snackbar";
import { testMenuData } from "../utils/TestData";
import HorizontalLine from "../components/HorizontalLine";
import { max, min } from "../utils/Muggy";

export type MenuScreenProps = NativeStackScreenProps<StackParamList, 'Menu'>;

const MenuView = ({navigation, route}: MenuScreenProps) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const menuData = (route.params.data) ? route.params.data : testMenuData;
  const cartInfo = useSelector((state: RootState) => state.cart);

  const onTouchEvent = () => {
    if (!menuData) {
      console.log('menuData 없음');
      return;
    }
    const addNew = () => {
      dispatch(
        setCart({
          cafeId: menuData.cafeId,
          inList: {
            [menuData.id]: {
              amount: count,
              menuData: menuData,
            },
          },
        }),
      );
    };

    if (cartInfo.cafeId === menuData?.cafeId) {
      if (cartInfo.inList.hasOwnProperty(menuData.id)) {
        let newCount = cartInfo.inList[menuData.id].amount + count;
        let isOverflow: boolean = false;
        if (newCount > 99) {
          newCount = 99;
          isOverflow = true;
        }

        dispatch(
          setInList({
            ...cartInfo.inList,
            [menuData.id]: {
              amount: newCount,
              menuData: cartInfo.inList[menuData.id].menuData,
            },
          }),
        );

        if (isOverflow) {
          Snackbar.show({
            text: '최대 99잔까지 담을 수 있어서 99잔으로 설정됐어요.',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: `이미 담겨있어서 ${count}개 만큼 추가했어요!`,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } else {
        dispatch(
          setInList({
            ...cartInfo.inList,
            [menuData.id]: {
              amount: count,
              menuData: menuData,
            },
          }),
        );
        Snackbar.show({
          text: `메뉴를 ${count}개 만큼 담았어요.`,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else if (cartInfo.cafeId === -1) {
      addNew();
      Snackbar.show({
        text: `메뉴를 ${count}개 만큼 담았어요.`,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      Alert.alert(
        '장바구니',
        '장바구니에 다른 카페의 메뉴가 담겨있어요.\n메뉴를 장바구니에 담으면 장바구니에 있던 메뉴가 삭제되는데 괜찮을까요?',
        [
          {
            text: '네',
            onPress: addNew,
          },
          {
            text: '아니요',
          },
        ],
      );
    }
    console.log(cartInfo);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'아메리카노'} navigation={navigation} />
      <Image style={styles.menuImage} source={menuData.image} />
      <Text style={styles.titleText}>{menuData.title}</Text>
      <Text style={styles.descriptionText}>{menuData.description}</Text>
      <View style={{alignSelf: 'flex-end', marginHorizontal: 8}}>
        <Counter
          value={count}
          onIncrease={() => setCount(max(count + 1, 99))}
          onDecrease={() => setCount(min(count - 1, 1))}
        />
      </View>
      <View style={styles.cartButtonContainer} onTouchEnd={onTouchEvent}>
        <CustomButton
          title={'카트에 담기'}
          style={styles.cartButton}
          textStyle={styles.cartButtonText}
        />
      </View>
      <HorizontalLine />
      <TouchableOpacity style={styles.beanInfoContainer} onPress={() => navigation.navigate('Bean')}>
        <Text style={styles.beanInfoText}>원두 정보</Text>
        <NextIcon color={'black'} />
      </TouchableOpacity>
      <HorizontalLine />
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuImage: {
    resizeMode: 'cover',
    height: '40%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 12,
    marginLeft: 24,
  },
  descriptionText: {
    textAlign: 'left',
    marginLeft: 24,
    marginTop: 4,
  },
  cartButtonContainer: {
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Constants.SUB_COLOR,
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  beanInfoContainer: {
    backgroundColor: Constants.SUB_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
  },
  beanInfoText: {
    fontSize: 20,
  },
});

export default MenuView;
