import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, Pressable, ScrollView, Text, Button, Spinner, Flex } from 'native-base';
import Colors from '../../colors';
import { useNavigation } from '@react-navigation/native';
import SeasonalProduct from './SeasonalProduct';
import HomeSearch from './HomeSearch';
var Buffer = require('buffer/').Buffer;

function RegularProducts() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [visibleRegularProducts, setVisibleRegularProducts] = useState(6);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("http://192.168.56.1:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                setProducts(result.products);
                setLoading(false);
            } catch (error) {
                console.error("Error while fetching data", error);
                setLoading(false);
            }
        };
        // Call the function to fetch data
        getProducts();
    }, []);

    // Function to filter products based on search text
    useEffect(() => {
        if (searchText === '') {
            setFilteredProducts([]);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.category.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchText, products]);

    const loadMoreRegularProducts = () => {
        setVisibleRegularProducts(visibleRegularProducts + 4);
    };

    // Function to convert Buffer to base64
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    return (
        <Box flex={1}>
            {loading && (
                <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
                    <Spinner size="lg" accessibilityLabel="Loading all data" color={Colors.main} />
                    <Text mt={2}>Loading all data...</Text>
                </Box>
            )}

            {!loading && (
                <Box flex={1}>
                    {/* Component for search  */}
                    <HomeSearch onSearchChange={setSearchText} />

                    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                        <Heading bold fontSize={15} mb={2} ml={4} mt={4}>
                            REGULAR PRODUCTS
                        </Heading>
                        <Flex flexWrap="wrap" direction="row" justifyContent="space-between" marginBottom={5} px={5}>
                            {(searchText === '' ? products : filteredProducts).length === 0 ? (
                               <Text fontSize={16} color={Colors.red} textAlign="center" mt={5} fontStyle="italic">No search product available!!!</Text>
                            ) : (
                                (searchText === '' ? products : filteredProducts).slice(0, visibleRegularProducts).map((singleProduct) => (
                                    <Pressable
                                        key={singleProduct._id}
                                        onPress={() => navigation.navigate("Single", { id: singleProduct._id })}
                                        w="47%"
                                        bg={Colors.white}
                                        rounded="md"
                                        shadow={2}
                                        pt={0}
                                        my={3}
                                        pb={2}
                                        overflow="hidden"
                                    >
                                        <Box bg="white" rounded="md" overflow="hidden" w="100%" h={200}>
                                            {singleProduct.image && singleProduct.image.data && (
                                                <Image
                                                    source={{ uri: `data:image/png;base64,${bufferToBase64(singleProduct.image.data)}` }}
                                                    accessibilityLabel={singleProduct.name}
                                                    alt={singleProduct.name}
                                                    w='100%'
                                                    h={135}
                                                    resizeMode='cover'
                                                />
                                            )}
                                            <Box px={4} pt={1}>
                                                {singleProduct.quantity === 0 && (
                                                    <Text fontSize={16} style={{ color: 'red' }}>Out of Stock</Text>
                                                )}
                                                <Heading fontSize={11} mt={1} isTruncated w="full">
                                                    {singleProduct.name}
                                                </Heading>
                                                <Text fontSize={10} mt={1} isTruncated w="full">
                                                    Rs {singleProduct.price}
                                                </Text>
                                                <Text fontSize={10} mt={1} isTruncated w="full">
                                                    {singleProduct.category}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Pressable>
                                ))
                            )}
                        </Flex>
                        {(searchText === '' ? products : filteredProducts).length > visibleRegularProducts && (
                            <Button bg={Colors.main} color={Colors.white} alignSelf="center" mb={5} onPress={loadMoreRegularProducts}>
                                Load More Regular Products
                            </Button>
                        )}
                        {/* Fetch the component for seasonal product */}
                        <SeasonalProduct />
                    </ScrollView>
                </Box>
            )}
        </Box>
    );
}

export default RegularProducts;

