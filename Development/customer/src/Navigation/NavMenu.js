import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Center, Pressable } from 'native-base';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons'; 
import { StyleSheet } from 'react-native'; 
import Colors from '../colors';
import ProfileScreen from '../Screens/ProfileScreen';
import CartScreen from '../Screens/CartScreen';
import HomeScreen from '../Screens/HomeScreen';

const Tab = createBottomTabNavigator();

const CustomTab = ({ children, onPress }) => (
    <Pressable
        onPress={onPress}
        h={70}
        w={70}
        rounded="full"
        bg={Colors.main}
        top={-30}
        shadow={2}
    >
        {children}
    </Pressable>
);

const NavMenu = () => {
    return (
        <Tab.Navigator
            backBehavior='main'
            initialRouteName='Main'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tab },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            {/* Home */}
            <Tab.Screen
                name='Main'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Center>
                            {
                                focused ? (
                                    <Entypo name='home' size={24} color={Colors.main} />
                                ) :
                                    (
                                        <AntDesign name='home' size={24} color={Colors.black} />
                                    )
                            }
                        </Center>
                    )
                }}
            />

            {/* Cart */}
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                
                options={{
                    tabBarButton: (props) => <CustomTab {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <Center>
                            {
                                focused ? (
                                    <FontAwesome5 name='shopping-basket' size={24} color={Colors.white} />
                                ) :
                                    (
                                        <MaterialCommunityIcons name='shopping-outline' size={24} color={Colors.white} />
                                    )
                            }
                        </Center>
                    )
                }}
            />

            {/* Profile */}
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Center>
                            {
                                focused ? (
                                    <FontAwesome name='user' size={24} color={Colors.main} />
                                ) :
                                    (
                                        <AntDesign name='user' size={24} color={Colors.black} />
                                    )
                            }
                        </Center>
                    )
                }}
            />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    tab: {
        elevation: 0,
        backgroundColor: Colors.white,
        height: 60,
    },
});

export default NavMenu;
