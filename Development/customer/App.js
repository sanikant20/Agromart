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
import CartScreen from './src/Screens/CartScreen';
import CartEmpty from './src/Components/Cart/CartEmpty';
import EditProfile from './src/Components/Profile/EditProfile';
import ProfileScreen from './src/Screens/ProfileScreen';
import ChangePassword from './src/Components/Profile/ChangePassword';
import ShippingScreen from './src/Screens/ShippingScreen';
// import OrderScreen from './src/Screens/OrderScreen';
// import PaymentScreen from './src/Screens/PaymentScreen';
import khalti from './src/Components/KhaltiPayment/Khalti';
import { CartProvider } from './src/Components/Cart/CartContext';

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
            <Stack.Screen name="Navmenu" component={NavMenu} />
            <Stack.Screen name="Single" component={SingleProductScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="CartEmpty" component={CartEmpty} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ShippingDetails" component={ShippingScreen} />
            {/* <Stack.Screen name="OrderInfo" component={OrderScreen} /> */}
            {/* <Stack.Screen name="Payment" component={PaymentScreen} /> */}
            <Stack.Screen name="Khalti" component={khalti} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </CartProvider>
  );
}
