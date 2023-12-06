import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginView from './src/views/LoginView';
import AppLoginView from './src/views/AppLoginView';
import {Provider} from 'react-redux';
import {store} from './src/store';
import MainView from './src/views/MainView';
import CafeView from './src/views/CafeView';
import MenuView from './src/views/MenuView';
import {StackParamList} from './src/types';
import CartView from './src/views/CartView';
import BeanInfoView from "./src/views/BeanInfoView";

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Login'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="AppLogin" component={AppLoginView} />
          <Stack.Screen name="Main" component={MainView} />
          <Stack.Screen
            name="Cafe"
            component={CafeView}
            initialParams={{cafeId: 1}}
          />
          <Stack.Screen name="Menu" component={MenuView} />
          <Stack.Screen name="Cart" component={CartView} />
          <Stack.Screen name="Bean" component={BeanInfoView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
