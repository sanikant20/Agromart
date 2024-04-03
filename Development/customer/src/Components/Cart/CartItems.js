import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, Pressable, Flex, Box, Image, Button, Center, HStack, Spinner } from 'native-base';
import Colors from "../../colors";
import CartEmpty from './CartEmpty';
import AsyncStorage from '@react-native-async-storage/async-storage';
var Buffer = require('buffer/').Buffer;
import { RefreshControl } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

// Function to fetch cart products from API
const fetchCartProductsFromAPI = async (userData, setCart, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(`http://192.168.56.1:5000/api/CartData/${userData._id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch cart products data");
        }
        const result = await response.json();
        if (result.data) {
            setCart(result.data);
        } else {
            setCart([]);
        }
        setLoading(false);
    } catch (error) {
        console.error('Error fetching cart products:', error.message);
        setError("Failed to fetch products data. Please try again later.");
        setLoading(false);
    }
};

const CartItems = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

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

    // Function to handle refreshing cart data
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCartProductsFromAPI(userData, setCart, setLoading, setError);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [userData]);

    // Fetch user data from AsyncStorage when component mounts
    useEffect(() => {
        fetchUserDataFromAsyncStorage();
    }, []);

    // Fetch cart products when component is focused
    useEffect(() => {
        if (isFocused && Object.keys(userData).length > 0) {
            fetchCartProductsFromAPI(userData, setCart, setLoading, setError);
        }
    }, [isFocused, userData]);

    // Function to handle deletion of cart product
    const handleDeleteProduct = async (cartProductId) => {
        try {
            const response = await fetch(`http://192.168.56.1:5000/api/deleteCartProducts/${cartProductId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Failed to delete cart product. Status: ${response.status}`);
            }
            // Remove the deleted product from the cart state
            const updatedCart = cart.filter(item => item._id !== cartProductId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error deleting cart product:', error.message);
        }
    };


    // Handle checkout to place order
    const handleCheckout = async () => {
        try {
            // Filter out image data from the cart
            const cartWithoutImages = cart.map(item => {
                const { image, ...rest } = item;
                return rest;
            });

            const orderResponse = await fetch("http://192.168.56.1:5000/api/placeOrder", {
                method: "POST",
                body: JSON.stringify({ user_id: userData._id, user_email: userData.email, cart: cartWithoutImages }), // Send cart without image data
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Status :", orderResponse.status);

            if (!orderResponse.ok) {
                const errorMessage = await orderResponse.text();
                throw new Error(`Failed to place order. Error: ${errorMessage}`);
            }

            const orderData = await orderResponse.json();
            console.log("Order Data:", orderData);
            // Display order placed successful message
             alert(orderData.message);
            navigation.navigate('ShippingDetails');
        } catch (error) {
            console.error("Error placing order:", error.message);
            alert(error.message);
        }
    };




    // Function to convert Buffer to base64
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    // Calculate total price of cart items
    const TotalPrice = cart ? cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) : 0;

    // Render loading spinner while data is being fetched
    if (loading) {
        return (
            <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading cart data" color={Colors.main} />
                <Text mt={2}>Loading cart data...</Text>
            </Box>
        );
    }

    // Render error message if there's an error
    if (error) {
        return (
            <Center flex={1}>
                <Text>Error: {error}</Text>
            </Center>
        );
    }

    // Render cart items if cart is not empty
    if (cart.length === 0) {
        return (
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <CartEmpty />
            </ScrollView>
        );
    }

    // Render cart items
    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Box px={5}>
                {cart.map((cartProduct) => (
                    <Pressable
                        key={cartProduct._id}
                        onPress={() => navigation.navigate("Single", { id: cartProduct._id })}
                        bg={Colors.white}
                        rounded="md"
                        shadow={2}
                        pt={3}
                        my={2}
                        pb={2}
                        overflow="hidden"
                    >
                        <Flex direction="row" justifyContent="space-between" alignItems="center">
                            {cartProduct.image && cartProduct.image.data && (
                                <Image
                                    source={{ uri: `data:image/png;base64,${bufferToBase64(cartProduct.image.data)}` }}
                                    accessibilityLabel={cartProduct.name}
                                    alt={cartProduct.name}
                                    w={20}
                                    h={20}
                                    resizeMode="contain"
                                    onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                                />
                            )}
                            <Box px={4} pt={1} flex={1} direction="row">
                                <Text bold fontSize={16} isTruncated>
                                    Name: {cartProduct.name}
                                </Text>
                                <Text bold fontSize={16} isTruncated>
                                    Price: {cartProduct.price}
                                </Text>
                            </Box>
                            <Flex direction="row" alignItems="center">
                                <Button
                                    bg={Colors.main}
                                    color={Colors.white}
                                    _pressed={{ bg: Colors.main }}
                                    _text={{ fontSize: 16 }}
                                    mr={2}
                                >
                                    <Text color={Colors.white}>Qty: {cartProduct.quantity}</Text>
                                </Button>

                                <Button
                                    mr={2}
                                    onPress={() => handleDeleteProduct(cartProduct._id)}
                                    bg={Colors.red}
                                    _pressed={{ bg: Colors.red }}
                                    _text={{ color: Colors.white, fontSize: 16 }}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                    </Pressable>
                ))}
                <Center mt={5}>
                    <HStack
                        fontSize="20"
                        rounded={50}
                        justifyContent="space-between"
                        bg={Colors.white}
                        shadow={2}
                        w="90%"
                        pl={5}
                        h={45}
                        alignItems="center"
                    >
                        <Text fontSize="xl" bold>Total Price :</Text>
                        <Button
                            px={10}
                            h={45}
                            rounded={50}
                            bg={Colors.main}
                            _text={{
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: "xl"
                            }}
                            _pressed={{
                                bg: Colors.main
                            }}
                        >
                            <Text>Rs {TotalPrice}</Text>
                        </Button>
                    </HStack>
                    <Button
                        roundedBottomLeft={50}
                        roundedBottomRight={50}
                        onPress={() => handleCheckout()}
                        mt={4}
                        mb={10}
                        w={'90%'}
                        bg={Colors.main}
                        _pressed={{ bg: Colors.main }}
                        _text={{ color: Colors.white }}>
                        Checkout
                    </Button>
                </Center>
            </Box>
        </ScrollView>
    );
};

export default CartItems;
