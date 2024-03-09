// import React, { useState, useEffect } from 'react';
// import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from 'native-base';
// import Colors from '../../colors';
// import Rating from '../Review/Rating';
// import { useNavigation } from '@react-navigation/native';
// var Buffer = require('buffer/').Buffer

// function HomeProduct() {
//     const navigation = useNavigation();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const getProducts = async () => {
//             try {
//                 const response = await fetch("http://192.168.56.1:5000/api/products");
//                 if (!response.ok) {
//                     throw new Error("Error while fetching products data");
//                 }

//                 const result = await response.json();
//                 setProducts(result);
//             } catch (error) {
//                 console.error("Error while fetching data", error);
//             }
//         };

//         // Call the function to fetch data
//         getProducts();
//     }, []);

//     // Function to convert Buffer to base64
//     const bufferToBase64 = (buffer) => {
//         return Buffer.from(buffer).toString('base64');
//     };

//     return (
//         <ScrollView flex={1} showsVerticalScrollIndicator={false}>
//             <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
//                 {
//                     products.map((singleProduct) => (
//                         <Pressable
//                             key={singleProduct._id}
//                             onPress={() => navigation.navigate("Single", { id: singleProduct._id })}
//                             w="47%"
//                             bg={Colors.white}
//                             rounded="md"
//                             shadow={2}
//                             pt={0}
//                             my={3}
//                             pb={2}
//                             overflow="hidden"
//                         >
//                             {singleProduct.image && singleProduct.image.data && (
//                                 <Image
//                                     source={{ uri: `data:image/png;base64,${bufferToBase64(singleProduct.image.data)}` }}
//                                     accessibilityLabel={singleProduct.name}
//                                     alt={singleProduct.name}
//                                     w="full"
//                                     h={24}
//                                     resizeMode="contain"
//                                     onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
//                                 />
//                             )}

//                             <Box px={4} pt={1}>
//                                 <Heading size="sm" bold>
//                                     ${singleProduct.price}
//                                 </Heading>
//                                 <Text fontSize={10} mt={1} isTruncated w="full">
//                                     {singleProduct.name}
//                                 </Text>
//                                 {/* Product Rating */}
//                                 <Rating value={singleProduct.rating} />
//                             </Box>
//                         </Pressable>
//                     ))
//                 }
//             </Flex>
//         </ScrollView>
//     );
// }

// export default HomeProduct;


import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text, Button } from 'native-base';
import Colors from '../../colors';
import Rating from '../Review/Rating';
import { useNavigation } from '@react-navigation/native';
var Buffer = require('buffer/').Buffer;

function HomeProduct() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(4);

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

    // Function to convert Buffer to base64
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    const loadMoreProducts = () => {
        setVisibleProducts(visibleProducts + 4);
    };

    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <Text color="blue.500" fontSize="lg" ml={4}>
                Regular Products
            </Text>
            <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
                {
                    products.slice(0, visibleProducts).map((singleProduct) => (
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
                            {singleProduct.image && singleProduct.image.data && (
                                <Image
                                    source={{ uri: `data:image/png;base64,${bufferToBase64(singleProduct.image.data)}` }}
                                    accessibilityLabel={singleProduct.name}
                                    alt={singleProduct.name}
                                    w="full"
                                    h={24}
                                    resizeMode="contain"
                                    onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                                />
                            )}

                            <Box px={4} pt={1}>
                                <Heading size="sm" bold>
                                    Rs {singleProduct.price}
                                </Heading>
                                <Text fontSize={10} mt={1} isTruncated w="full">
                                    {singleProduct.name}
                                </Text>
                                {/* Product Rating */}
                                <Rating value={singleProduct.rating} />
                            </Box>
                        </Pressable>
                    ))
                }
            </Flex>
            {visibleProducts < products.length && (
                <Button bg={Colors.main} color={Colors.white} alignSelf="center" my={5} onPress={loadMoreProducts}>
                    Load More Regular Products
                </Button>
            )}


            <Text color="blue.500" fontSize="lg"  ml={4}>
                    Seasonal Products
            </Text>
            <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
                {
                    products.slice(0, visibleProducts).map((singleProduct) => (
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
                            {singleProduct.image && singleProduct.image.data && (
                                <Image
                                    source={{ uri: `data:image/png;base64,${bufferToBase64(singleProduct.image.data)}` }}
                                    accessibilityLabel={singleProduct.name}
                                    alt={singleProduct.name}
                                    w="full"
                                    h={24}
                                    resizeMode="contain"
                                    onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                                />
                            )}

                            <Box px={4} pt={1}>
                                <Heading size="sm" bold>
                                    Rs {singleProduct.price}
                                </Heading>
                                <Text fontSize={10} mt={1} isTruncated w="full">
                                    {singleProduct.name}
                                </Text>
                            
                                <Rating value={singleProduct.rating} />
                            </Box>
                        </Pressable>
                    ))
                }
            </Flex>
            {visibleProducts < products.length && (
                <Button bg={Colors.main} color={Colors.white} alignSelf="center" my={5} onPress={loadMoreProducts}>
                    Load More Seasonal Products
                </Button>
            )}
        </ScrollView>



    );
}

export default HomeProduct;


