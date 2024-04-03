import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text, Button } from 'native-base';
import Colors from '../../colors';
import { useNavigation } from '@react-navigation/native';
var Buffer = require('buffer/').Buffer;

const SeasonalProduct = () => {
    const navigation = useNavigation();
    const [visibleSeasonalProducts, setVisibleSeasonalProducts] = useState(2);
    const [loading, setLoading] = useState(null)
    const [seasonalData, setSeasonalData] = useState([]);

    useEffect(() => {
        const getSeasonalProduct = async () => {
            try {
                const response = await fetch("http:192.168.56.1:5000/api/seasonalProduct");
                if (!response.ok) {
                    throw new Error({ success: false, message: "Error in fetching api", error })
                }
                let result = await response.json();
                // console.log("Seasonal Product:", result)
                setSeasonalData(result)
                setLoading(false)
            } catch (error) {
                console.error({ success: false, message: "Internal Server Errer", error })
            }
        };
        getSeasonalProduct();
    }, [])


    // Function to convert Buffer to base64
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }
    const loadMoreSeasonalProducts = () => {
        setVisibleSeasonalProducts(visibleSeasonalProducts + 5);
    };

    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={true}>
            {/* Seasonal Products card Lists  */}
            <Heading bold fontSize={15} mb={2} ml={4} mt={4}>
                SEASONAL PRODUCTS
            </Heading>
            <Flex flexWrap="wrap" direction="row" justifyContent="space-between" marginBottom={10} px={5}>
                {
                    seasonalData.slice(0, visibleSeasonalProducts).map((seasonalProduct) => (
                        <Pressable
                            key={seasonalProduct._id}
                            onPress={() => navigation.navigate("Single", { id: seasonalProduct._id })}
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
                                {seasonalProduct.image && seasonalProduct.image.data && (
                                    <Image
                                        source={{ uri: `data:image/png;base64,${bufferToBase64(seasonalProduct.image.data)}` }}
                                        accessibilityLabel={seasonalProduct.name}
                                        alt={seasonalProduct.name}
                                        w='100%'
                                        h={135}
                                        resizeMode='cover'
                                        onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                                    />
                                )}

                                <Box px={4} pt={1}>
                                    {seasonalProduct.quantity === 0 && (
                                        <Text fontSize={16} style={{ color: 'red' }}>Out of Stock</Text>
                                    )}
                                    <Heading fontSize={11} mt={1} isTruncated w="full">
                                        {seasonalProduct.name}
                                    </Heading>
                                    <Text fontSize={10} mt={1} isTruncated w="full">
                                        Rs {seasonalProduct.price}
                                    </Text>
                                    <Text fontSize={10} mt={1} isTruncated w="full">
                                        {seasonalProduct.category}
                                    </Text>
                                </Box>
                            </Box>
                        </Pressable>
                    ))
                }
            </Flex>
            {visibleSeasonalProducts < seasonalData.length && (
                <Button bg={Colors.main} color={Colors.white} alignSelf="center" mb={10} onPress={loadMoreSeasonalProducts}>
                    Load More Season Products
                </Button>
            )}
        </ScrollView>
    )
}
export default SeasonalProduct;
