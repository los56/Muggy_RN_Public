import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomSheet, {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/RootReducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import Constants from '../utils/Constants';

export type LoginScreenProps = NativeStackScreenProps<StackParamList, 'Login'>;

const LoginView = ({navigation}: LoginScreenProps) => {
  const [pos, setPos] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '40%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setPos(index);
  }, []);

  // Dispatch Userdata
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Muggy</Text>
        </View>
        <BottomSheet
          backgroundComponent={BottomSheetBackground}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{borderRadius: 16}}>
          <View style={styles.contentContainer}>
            {pos ? (
              <View style={styles.buttonContainer}>
                <Text style={styles.descText}>
                  아래의 버튼으로 로그인하세요!
                </Text>
                <CustomButton
                  title={'Muggy로 로그인'}
                  onPress={() => {
                    navigation.navigate('AppLogin');
                  }}
                />
                <CustomButton title={'Google로 로그인'} />
                <CustomButton title={'Kakao로 로그인'} />
              </View>
            ) : (
              <Text style={styles.descText}>위로 올려 로그인하세요!</Text>
            )}
          </View>
        </BottomSheet>
        <SafeAreaView />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  logoText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 84,
    fontFamily: 'FugazOne-Regular',
  },
  descText: {
    fontSize: 18,
    margin: 10,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
  },
});

const BottomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [Constants.MAIN_COLOR, '#F2E7D8'],
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default LoginView;
