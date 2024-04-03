import React, { useState } from 'react';
import { ScrollView, Pressable, Box, Heading, Text, Image, Flex } from 'native-base';
import { Colors } from '../../colors';
var Buffer = require('buffer/').Buffer;

const SimilarProduct = ({ navigation, products, category }) => {
  const [isPressed, setIsPressed] = useState(null);

  // Filter products based on the category
  const similarProducts = products.filter(product => product.category === category);

  // Sort similarProducts by index in descending order
  const sortedProducts = similarProducts.slice().reverse();

  // Get the last four products
  const lastFourProducts = sortedProducts.slice(0, 4);

  // Show a message if no similar products are found
  if (similarProducts.length === 0) {
    return (
      <Heading bold fontSize={15} mb={2} mt={2}>
        SIMILAR PRODUCT NOT AVAILABLE.
      </Heading>
    );
  }

  // Function to convert Buffer to base64
  const bufferToBase64 = (buffer) => {
    return Buffer.from(buffer).toString('base64');
  };

  const handlePress = (id) => {
    navigation.navigate("Single", { id });
  };

  return (
    <Box flex={1}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false} px={4} pt={4}>
        <Heading bold fontSize={15} mb={2}>
          SIMILAR PRODUCTS:
        </Heading>
        <Flex flexWrap="wrap" direction="row" justifyContent="space-between">
          {lastFourProducts.map((similarProduct) => (
            <Pressable
              key={similarProduct._id}
              onPressIn={() => setIsPressed(similarProduct._id)}
              onPressOut={() => setIsPressed(null)}
              onPress={() => handlePress(similarProduct._id)}
              w="45%"
              rounded="md"
              shadow={2}
              my={2}
              overflow="hidden"
              bg={isPressed === similarProduct._id ? 'gray.200' : 'transparent'}
            >
              <Box bg="white" rounded="md" overflow="hidden" w="100%" h={210}>
                <Image
                  source={similarProduct.image?.data ?
                    { uri: `data:image/png;base64,${bufferToBase64(similarProduct.image.data)}` }
                    : null
                  }
                  alt='product image'
                  w='100%'
                  h={135}
                  resizeMode='cover'
                />
                <Box px={4} pt={1}>
                  {similarProduct.quantity === 0 && (
                    <Text fontSize={16} style={{ color: 'red' }}>Out of Stock</Text>
                  )}
                  <Text fontSize={10} mt={1} isTruncated w="full">
                    {similarProduct.name}
                  </Text>
                  <Text fontSize={10} mt={1} isTruncated w="full">
                    Rs {similarProduct.price}
                  </Text>
                  <Text fontSize={10} mt={1} isTruncated w="full">
                    {similarProduct.category}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          ))}
        </Flex>
      </ScrollView>
    </Box>
  );
}

export default SimilarProduct;




