import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import ToggleView from '../components/ToggleView';
import {useState} from 'react';
import VerticalLine from '../components/VerticalLine';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import {Text as SkiaText} from '@shopify/react-native-skia';
import {getPointFromLength} from '../utils/Muggy';
import {testBeanData} from '../utils/TestData';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';

export type BeanInfoScreenProps = NativeStackScreenProps<
  StackParamList,
  'Bean'
>;

const BeanInfoView = ({navigation, route}: BeanInfoScreenProps) => {
  const [greenToggle, setGreenToggle] = useState(false);
  const [beanToggle, setBeanToggle] = useState(false);
  const [receiptToggle, setReceiptToggle] = useState(false);

  const beanData = testBeanData;

  const InfoItem = ({title, value}: {title: string; value: string}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{width: '30%', fontSize: 18, marginVertical: 4}}>
          {title}
        </Text>
        <VerticalLine />
        <Text style={{marginLeft: 4, marginVertical: 4}}>{value}</Text>
      </View>
    );
  };

  const path = Skia.Path.Make();
  const mid = {x: 128 / 2, y: 128 / 2};
  const len = [60, 40, 40, 50, 60, 50];
  let angle = 0;

  const sPoint = getPointFromLength(len[0], angle);
  path.moveTo(mid.x + sPoint.x, mid.y + sPoint.y);

  for (let i = 1; i < len.length; i++) {
    angle += (2 * 3.14) / len.length;
    const {x, y} = getPointFromLength(len[i], angle);
    path.lineTo(mid.x + x, mid.y + y);
  }
  path.lineTo(mid.x + sPoint.x, mid.y + sPoint.y);

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'원두 정보'} navigation={navigation} inCart={true} />
      <ScrollView contentContainerStyle={{}}>
        <View>
          <ToggleView
            toggle={greenToggle}
            onPress={() => setGreenToggle(!greenToggle)}
            title={'생두 정보'}>
            <InfoItem title={'원산지'} value={beanData.green.origin} />
            <InfoItem title={'수확 시기'} value={beanData.green.year} />
            <InfoItem title={'재배 지역'} value={beanData.green.local} />
            <InfoItem title={'농장 정보'} value={beanData.green.farm} />
            <InfoItem title={'품종'} value={beanData.green.variety} />
            <InfoItem title={'가공 방식'} value={beanData.green.method} />
            <InfoItem title={'등급'} value={beanData.green.grade} />
            <InfoItem title={'재배 고도'} value={beanData.green.altitude} />
            <InfoItem title={'수분'} value={beanData.green.water} />
            <InfoItem title={'밀도'} value={beanData.green.density} />
            <InfoItem title={'인증'} value={beanData.green.certification} />
          </ToggleView>
          <ToggleView
            toggle={beanToggle}
            onPress={() => setBeanToggle(!beanToggle)}
            title={'원두 정보'}>
            <InfoItem title={'로스터리'} value={beanData.roast.roastery} />
            <InfoItem title={'로스팅 날짜'} value={beanData.roast.date} />
            <InfoItem title={'로스팅 포인트'} value={beanData.roast.point} />
            <InfoItem title={'로스팅 시간'} value={beanData.roast.time} />
            <InfoItem title={'배출 온도'} value={beanData.roast.temp} />
            <InfoItem title={'커핑 노트'} value={beanData.roast.note} />
            <InfoItem title={'바디감'} value={beanData.roast.body} />
            {/*<View style={{flexDirection: 'row'}}>*/}
            {/*  <Text style={{width: '30%', fontSize: 18, marginVertical: 4}}>포인트</Text>*/}
            {/*  <VerticalLine />*/}
            {/*  <Canvas style={{width: 128, height: 128}}>*/}
            {/*    <Path path={path} color={'lightblue'} />*/}
            {/*    <SkiaText text={'Body'} x={45} y={10} />*/}
            {/*  </Canvas>*/}
            {/*</View>*/}
          </ToggleView>
          <ToggleView
            toggle={receiptToggle}
            onPress={() => setReceiptToggle(!receiptToggle)}
            title={'레시피 정보'}>
            <InfoItem title={'추출 방법'} value={beanData.receipt.method} />
            <InfoItem title={'원두량'} value={beanData.receipt.weight} />
            <InfoItem title={'추출 온도'} value={beanData.receipt.temp} />
            <InfoItem title={'추출 시간'} value={beanData.receipt.time} />
            <InfoItem title={'그라인더'} value={beanData.receipt.grinder} />
            <InfoItem
              title={'분쇄 단계'}
              value={beanData.receipt.grinderStep}
            />
          </ToggleView>
        </View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

export default BeanInfoView;
