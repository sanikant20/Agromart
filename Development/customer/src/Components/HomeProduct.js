import React from 'react';
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from 'native-base';
import Products from '../Data/Products';
import Colors from '../colors';
import Rating from './Rating';

function HomeProduct() {
    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
                {Products.map(({ _id, image, name, price, rating }) => (
                    <Pressable
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
