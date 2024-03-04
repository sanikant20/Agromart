import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SingleProduct from './src/Screens/SingleProduct'
import CartScreen from './src/Screens/CartScreen'
import ProfileScreen from './src/Screens/ProfileScreen'
import ShippingScreen from './src/Screens/ShippingScreen';
import PaymentScreen from './src/Screens/PaymentScreen';
import OrderScreen from './src/Screens/OrderScreen';
import NavMenu from './src/Navigation/NavMenu';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={NavMenu} />
        </Stack.Navigator>
      </NavigationContainer>

    </NativeBaseProvider>
  );
}
