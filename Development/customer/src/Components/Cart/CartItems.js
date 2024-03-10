import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Pressable, Flex, Box, Image, Heading, Button, Center, View, HStack, Spinner } from 'native-base';
import Colors from "../../colors";
import CartEmpty from './CartEmpty';
import Buttone from '../Buttone';
var Buffer = require('buffer/').Buffer;

const CartItems = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCartProducts = async () => {
            try {
                const response = await fetch('http://192.168.56.1:5000/api/CartData');
                if (!response.ok) {
                    throw new Error("Failed to fetch products data");
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
        getCartProducts();
    }, []);

    

    // Function to convert Buffer to base64
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    // Calculate total price
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    if (loading) {
        return (
            <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading cart data" color={Colors.main} />
                <Text mt={2}>Loading cart data...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Center flex={1}>
                <Text>Error: {error}</Text>
            </Center>
        );
    }

    if (cart.length === 0) {
        return (
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <CartEmpty />
            </ScrollView>
        );
    }

    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
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
                                    onPress={() => handleUpdateQuantity(cartProduct._id)}
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
                        <Text fontSize="xl" bold>Total :</Text>
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
                            <Text>Rs {total}</Text>
                        </Button>
                    </HStack>


                    <Button
                        roundedBottomLeft={50}
                        roundedBottomRight={50}
                        onPress={() => handleCheckout()}
                        mt={4}
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
