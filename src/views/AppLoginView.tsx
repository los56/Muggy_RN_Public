import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Constants from '../utils/Constants';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import {setNickname, setUsername} from '../reducers/userSlice';
import {useAppDispatch} from '../hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import CustomHeader from "../components/CustomHeader";

export type AppLoginScreenProps = NativeStackScreenProps<
  StackParamList,
  'AppLogin'
>;

const AppLoginView = ({navigation}: AppLoginScreenProps) => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const dispatch = useAppDispatch();

  const attemptLogin = (username: string, password: string) => {
    dispatch(setUsername(username));
    dispatch(setNickname('테스터'));
    navigation.reset({routes: [{name: 'Main'}]});
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'로그인'} inCart={true} navigation={navigation} />
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <View style={styles.inputContainer}>
          <Text style={styles.logoText}>Muggy</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'아이디'}
            value={username}
            onChangeText={onChangeUsername}
            placeholderTextColor={Constants.GRAY_COLOR}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'비밀번호'}
            value={password}
            onChangeText={onChangePassword}
            placeholderTextColor={Constants.GRAY_COLOR}
          />
          <CustomButton
            title={'로그인'}
            onPress={() => {
              attemptLogin(username, password);
            }}
          />
          <TouchableOpacity>
            <Text style={styles.registerText}>
              여기를 눌러 Muggy에 가입해보세요!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    margin: 24,
  },
  logoText: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'FugazOne-Regular',
  },
  textInput: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: Constants.GRAY_COLOR,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 4,
    minHeight: 55,
    paddingHorizontal: 16,
  },
  registerText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default AppLoginView;
