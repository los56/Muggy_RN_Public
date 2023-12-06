import {
  Dimensions,
  Image,
  LayoutAnimation,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/RootReducer';
import Constants from '../utils/Constants';
import {useEffect, useState} from 'react';

import MenuIcon from '../../assets/drawable/menu.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CafeData, StackParamList} from '../types';
import HorizontalLine from '../components/HorizontalLine';
import {testCafeData, testCafeListData} from '../utils/TestData';
import {meterToUsingKilo, sortToDistance, sortToString} from '../utils/Muggy';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export type MainScreenProps = NativeStackScreenProps<StackParamList, 'Main'>;

const MainView = ({navigation}: MainScreenProps) => {
  const userInfo = useSelector((state: RootState) => state.user);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [sortType, setSortType] = useState(0); //0: Name, 1: Distance

  const imageWidth = windowWidth * 0.2 * (3 / 4);

  const MenuItem = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [menuDegree, setMenuDegree] = useState(0);
    const menuTouched = () => {
      LayoutAnimation.spring();
      if (menuOpened) {
        setMenuOpened(false);
        setMenuDegree(0);
      } else {
        setMenuOpened(true);
        setMenuDegree(90);
      }
    };

    return (
      <TouchableOpacity
        style={[styles.menuToggle, {transform: [{rotate: `${menuDegree}deg`}]}]}
        onPress={menuTouched}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <MenuIcon color={'black'} />
        </View>
      </TouchableOpacity>
    );
  };

  const DrinkItem = ({name, cafe}: {name: string; cafe?: string}) => {
    const windowWidth = Dimensions.get('window').width;
    const [width, setWidth] = useState(1);

    useEffect(() => {
      setWidth(windowWidth / Constants.SCROLL_ITEM_SHOW_COUNT);
    }, []);

    return (
      <View style={[{width: width}, styles.drinkItemContainer]}>
        <Image
          style={styles.drinkImage}
          source={require('../../assets/drawable/img.png')}
        />
        <Text style={styles.drinkNameText}>{name}</Text>
      </View>
    );
  };

  const CafeItem = ({name, distance}: {name: string; distance: number}) => {
    const windowWidth = Dimensions.get('window').width;
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(windowWidth / Constants.SCROLL_ITEM_SHOW_COUNT);
    }, []);

    const onTouchEvent = () => {
      navigation.navigate('Cafe', {cafeId: 1});
    };

    return (
      <TouchableOpacity
        style={[{width: width}, styles.drinkItemContainer]}
        onPress={onTouchEvent}>
        <Image
          style={styles.drinkImage}
          source={require('../../assets/drawable/cafe.jpg')}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <Text style={{fontSize: 16}}>{name}</Text>
          <Text style={{height: '100%'}}>
            {distance >= 1000 ? `${distance / 1000}km` : `${distance}m`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CafeListItem = ({cafeData}: {cafeData: CafeData}) => {
    const onTouch = () => {
      navigation.navigate('Cafe', {cafeId: 1});
    };

    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: 4,
            marginHorizontal: 16,
          }}
          onPress={onTouch}>
          <Image
            style={{width: '20%', height: imageWidth, resizeMode: 'cover'}}
            source={cafeData.image}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{marginBottom: 4, marginLeft: 4}}>
              <Text style={{fontSize: 16}}>
                {cafeData.title}
              </Text>
              <Text style={{color: Constants.GRAY_COLOR}}>테스트</Text>
            </View>
            <Text>
              {!cafeData.distance ? '' : meterToUsingKilo(cafeData.distance)}
            </Text>
          </View>
        </TouchableOpacity>
        <HorizontalLine />
      </View>
    );
  };

  const SortSwitch = () => {
    const sortFlip = () => {
      if (sortType === 0) {
        setSortType(1);
      } else {
        setSortType(0);
      }
    };

    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 15,
          alignSelf: 'flex-end',
          marginRight: 8,
          padding: 8,
          backgroundColor: Constants.SUB_COLOR,
        }}
        onPress={() => {
          sortFlip();
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {sortType === 0 ? '이름순' : '거리순'}
        </Text>
      </TouchableOpacity>
    );
  };

  const CafeList = () => {
    const res = [];
    const target = testCafeListData.slice(0);
    target.sort(sortType === 0 ? sortToString : sortToDistance);

    let keyGen = 0;
    for (let i of target) {
      res.push(<CafeListItem cafeData={i} key={keyGen++} />);
    }

    return res;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[3]}>
        <View style={styles.upperContainer}>
          <Text style={styles.greetingText}>
            {`안녕하세요\n${userInfo.nickname}님!`}
          </Text>
          <MenuItem />
        </View>
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 8, marginVertical: 8}}>
            <View
              style={[{height: windowHeight / 3.5}, styles.scrollContainer]}>
              <View style={{margin: 8}}>
                <Text style={styles.suggestHeaderText}>
                  이런 메뉴는 어떠세요?
                </Text>
              </View>
              <ScrollView
                style={{height: '100%'}}
                contentContainerStyle={styles.drinkContentsContainer}
                horizontal>
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
                <DrinkItem name={'아메리카노'} />
              </ScrollView>
            </View>
          </View>
          <View style={{paddingHorizontal: 8, marginVertical: 8}}>
            <View
              style={[{height: windowHeight / 3.2}, styles.scrollContainer]}>
              <View style={{margin: 8}}>
                <Text style={styles.suggestHeaderText}>
                  이런 카페는 어떠세요?
                </Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.drinkContentsContainer}
                horizontal>
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={1500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
                <CafeItem name={'경상대 카페'} distance={500} />
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: Constants.GRAY_COLOR, height: 6}} />
        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              marginVertical: 4,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontSize: 20, alignSelf: 'center', fontWeight: 'bold'}}>가까운 카페</Text>
            </View>
            <SortSwitch />
          </View>
        </View>
        <View>{CafeList()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  greetingText: {
    fontSize: 32,
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Constants.GRAY_COLOR,
    backgroundColor: Constants.SUB_COLOR,
  },
  suggestHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drinkContentsContainer: {
    flexGrow: 1,
  },
  drinkItemContainer: {
    backgroundColor: 'white',
    marginRight: 16,
    alignItems: 'center',
    height: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Constants.GRAY_COLOR,
  },
  drinkImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '90%',
    margin: 8,
    borderRadius: 14,
  },
  drinkNameText: {
    fontSize: 18,
    marginBottom: 8,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 48,
    marginTop: 12,
  },
  menuToggle: {
    backgroundColor: Constants.SUB_COLOR,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainView;
