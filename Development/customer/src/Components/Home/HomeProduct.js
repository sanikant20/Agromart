import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from 'native-base';
import Colors from '../../colors';
import Rating from '../Review/Rating';
import { useNavigation } from '@react-navigation/native';

function HomeProduct() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("http://192.168.56.1:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }

                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };

        // Call the function to fetch data
        getProducts();
    }, []);


    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
                {products && products.map(({ _id, image, name, price, rating, product }) => (
                    <Pressable
                        onPress={() => navigation.navigate("Single", { id: _id })}
                        key={_id}
                        w="47%"
                        bg={Colors.white}
                        rounded="md"
                        shadow={2}
                        pt={0}
                        my={3}
                        pb={2}
                        overflow="hidden"
                    >

                        <Image
                            source={{ uri: image }}
                            accessibilityLabel={name}
                            alt={name}
                            w="full"
                            h={24}
                            resizeMode="contain"
                            onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                        />

                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                ${price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated w="full">
                                {name}
                            </Text>
                            {/* Product Rating */}
                            <Rating value={rating} />
                        </Box>
                    </Pressable>
                ))}
            </Flex>
        </ScrollView>
    );
}

export default HomeProduct;
