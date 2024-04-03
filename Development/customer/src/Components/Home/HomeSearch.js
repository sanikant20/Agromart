import React, { useState, useEffect } from 'react';
import { Box, HStack, Input, Pressable, Text } from 'native-base';
import Colors from '../../colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeSearch({ onSearchChange }) {
    const [userData, setUserData] = useState({});
    const [cartNumber, setCartNumber] = useState(0);
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    // Function to fetch user data from AsyncStorage
    const fetchUserDataFromAsyncStorage = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userDetails');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setUserData(parsedUserData);
            } else {
                console.error('User data not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    // Fetch user data from AsyncStorage when component mounts
    useEffect(() => {
        fetchUserDataFromAsyncStorage();
    }, []);

    // Fetch cart items count when userData changes or on component mount
    useEffect(() => {
        const getCartItemCount = async () => {
            try {
                if (userData._id) {
                    const response = await fetch(`http://192.168.56.1:5000/api/CartData/${userData._id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch cart data.");
                    }
                    const result = await response.json();
                    const cartItemCount = result.cartItemCount;
                    setCartNumber(cartItemCount);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getCartItemCount();
    }, [userData]);

    // Handle search input change
    const handleSearchChange = (value) => {
        setSearchText(value);
        onSearchChange(value);
    };

    return (
        <HStack space={3} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop>
            <Input
                placeholder="Search..."
                w="85%"
                bg={Colors.white}
                type="search"
                variant="filled"
                h={12}
                borderWidth={0}
                keyboardType="default"
                autoCapitalize="none"
                clearButtonMode="while-editing"
                _focus={{
                    bg: Colors.white,
                }}
                onChangeText={handleSearchChange}
            />

            <Pressable onPress={() => navigation.navigate('Cart')}>
                <FontAwesome5 name="shopping-basket" size={33} color={Colors.white} />
                <Box px={1} rounded="full" position="absolute" top={-13} bg={Colors.orange}>
                    <Text
                        _text={{
                            color: Colors.white,
                            fontSize: 14,
                        }}
                    >
                        {cartNumber > 0 ? cartNumber : 0}
                    </Text>
                </Box>
            </Pressable>

        </HStack>
    );
}

export default HomeSearch;
