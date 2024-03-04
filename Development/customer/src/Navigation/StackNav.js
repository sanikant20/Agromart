import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import SingleProductScreen from '../Screens/SingleProduct';
import ShippingScreen from '../Screens/ShippingScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Profile from '../Components/Profile/Profile';
import { CartProvider } from '../Screens/CartReducer';
import CartScreen from '../Screens/CartScreen';

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
                <Stack.Screen name="Single" component={SingleProductScreen} />
                <Stack.Screen name="Shipping" component={ShippingScreen} />
                <Stack.Screen name="Checkout" component={PaymentScreen} />
                {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
            </Stack.Navigator>
        </CartProvider>

    );
};

export default StackNav;
