import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import SingleScreen from '../Screens/SingleProductScreen';
import ShippingScreen from '../Screens/ShippingScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import CartScreen from '../Screens/CartScreen';
import { CartProvider } from '../Screens/CartReducer';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
    return (
        <CartProvider> 
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} /> 
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </CartProvider>
    );
};

export default StackNav;
