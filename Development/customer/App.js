import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreen';
import NavMenu from './src/Navigation/NavMenu';
import SingleProductScreen from './src/Screens/SingleProductScreen';
import { CartProvider } from './src/Screens/CartReducer';
import CartScreen from './src/Screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={false} />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Menu" component={NavMenu} />
            <Stack.Screen name="Single" component={SingleProductScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </CartProvider>
  );
}
