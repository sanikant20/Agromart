import React, { useState } from 'react';
import { ScrollView, Flex, Pressable, Image, Box, Heading, Text } from 'native-base';
import Rating from '../Review/Rating';

const RegularProducts = ({ Products }) => {
    if (!Products || !Array.isArray(Products)) {
        return null;
    }

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = Products.slice(startIndex, endIndex);

    const handlePagination = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Box bg="gray.100" p={4} rounded="md" shadow={2}>
            <Heading mb={4} fontSize="xl">
                Regular Products
            </Heading>
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
                    {paginatedProducts.map(({ _id, image, name, price, rating }) => (
                        <Pressable
                            key={_id} // Use a unique key, such as the product ID
                            w="47%"
                            bg="white"
                            rounded="md"
                            shadow={2}
                            pt={0}
                            my={3}
                            pb={2}
                            overflow="hidden"
                        >
                            {/* ... (rest of the component remains the same) */}
                        </Pressable>
                    ))}
                </Flex>
                {/* Pagination */}
                {Products.length > itemsPerPage && (
                    <Flex justifyContent="center" mt={4}>
                        {Array.from({ length: Math.ceil(Products.length / itemsPerPage) }, (_, index) => (
                            <Pressable
                                key={index + 1}
                                p={2}
                                bg={currentPage === index + 1 ? 'blue.500' : 'gray.300'}
                                rounded="md"
                                onPress={() => handlePagination(index + 1)}
                            >
                                <Text color={currentPage === index + 1 ? 'white' : 'black'}>
                                    {index + 1}
                                </Text>
                            </Pressable>
                        ))}
                    </Flex>
                )}
            </ScrollView>
        </Box>
    );
};

export default RegularProducts;
