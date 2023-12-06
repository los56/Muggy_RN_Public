import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../utils/Constants';
import CustomHeader from '../components/CustomHeader';
import VerticalLine from '../components/VerticalLine';
import MenuGroup from "../components/MenuGroup";

import CallIcon from '../../assets/drawable/call.svg';
import FavoriteIcon from '../../assets/drawable/star.svg';
import ShareIcon from '../../assets/drawable/share.svg';
import LocationIcon from '../../assets/drawable/location.svg';
import ClockIcon from '../../assets/drawable/clock.svg';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CafeData, StackParamList} from '../types';
import {testCafeData, testGroupData} from '../utils/TestData';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {appendCafeCache} from '../reducers/cafeCacheSlice';
import {RootState} from '../reducers/RootReducer';
import {phoneNumberAddHyphen} from '../utils/Muggy';
import { GroupGap } from "../components/GroupGap";

export type CafeScreenProps = NativeStackScreenProps<StackParamList, 'Cafe'>;


const CafeView = ({navigation, route}: CafeScreenProps) => {
  const [ready, setReady] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const dispatch = useDispatch();
  const cafeInfo: CafeData = useSelector(
    (state: RootState) => state.cafeCache.caches[route.params.cafeId],
  );

  useEffect(() => {
    console.log(cafeInfo);
    if (!cafeInfo) {
      dispatch(appendCafeCache(testCafeData));
    }
    console.log(cafeInfo);
    setReady(true);
  }, []);

  const onCalling = () => {
    const phoneNumber: undefined | string = cafeInfo.phoneNumber;

    if (!phoneNumber) {
      return;
    }

    let phoneUri: string;
    if (Platform.OS !== 'android') {
      phoneUri = `telprompt:${phoneNumber}`;
    } else {
      phoneUri = `tel:${phoneNumber}`;
    }

    Linking.canOpenURL(phoneUri).then(sup => {
      if (!sup) {
        Alert.alert('기기가 지원하지 않습니다.');
      } else {
        return Linking.openURL(phoneUri);
      }
    });
  };

  const onLocation = async () => {
    await Linking.openURL(`https://map.naver.com/p/search/${cafeInfo.address}`);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: '경상대 카페',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (e: any) {}
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} />
      {ready && (
        <ScrollView contentContainerStyle={{width: '100%'}} bounces={false}>
          <Image
            style={[{height: windowHeight / 4}, styles.cafeImage]}
            source={require('../../assets/drawable/cafe.jpg')}
          />
          <View style={styles.toolbar}>
            <Text style={styles.cafeTitle}>경상대 카페</Text>
            <View style={styles.infoText}>
              <LocationIcon color={'black'} />
              <Text>{cafeInfo.address}</Text>
            </View>

            <View style={styles.infoText}>
              <CallIcon color={'black'} />
              <Text>
                {cafeInfo.phoneNumber &&
                  phoneNumberAddHyphen(cafeInfo.phoneNumber)}
              </Text>
            </View>

            <View style={styles.infoText}>
              <ClockIcon color={'black'} />
              <Text>오전 09:00 ~ 오후 06:00</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={onCalling}>
                <CallIcon color={'black'} width={40} height={40} />
                <Text>전화걸기</Text>
              </TouchableOpacity>

              <VerticalLine />

              <TouchableOpacity style={{alignItems: 'center'}} onPress={onLocation}>
                <LocationIcon color={'black'} width={40} height={40} />
                <Text>위치보기</Text>
              </TouchableOpacity>

              <VerticalLine />

              <TouchableOpacity style={{alignItems: 'center'}}>
                <FavoriteIcon color={'black'} width={40} height={40} />
                <Text>즐겨찾기</Text>
              </TouchableOpacity>

              <VerticalLine />

              <TouchableOpacity style={{alignItems: 'center'}} onPress={onShare}>
                <ShareIcon color={'black'} width={40} height={40} />
                <Text>공유하기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <GroupGap />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
            <MenuGroup data={testGroupData} navigation={navigation} />
          </View>
        </ScrollView>
      )}
      {/*Prevent overflow on iOS*/}
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  buttons: {
    borderRightWidth: 16,
    borderRightColor: Constants.GRAY_COLOR,
  },
  cafeImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  cafeTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  toolbar: {
    marginVertical: 8,
  },
});

export default CafeView;
