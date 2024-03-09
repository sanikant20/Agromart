import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Heading, Image, Spacer, Text } from 'native-base';
import Colors from '../colors';
import Rating from '../Components/Review/Rating';
import NumericInput from 'react-native-numeric-input';
import { Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-virtualized-view';
var Buffer = require('buffer/').Buffer;

function SingleProductScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        let result = await fetch(`http://192.168.56.1:5000/api/products/${id}`);

        if (!result.ok) {
          throw new Error(`Failed to fetch product details. Status: ${result.status}`);
        }
        let data = await result.json();
        setProduct(data);
        setTotalPrice(data.price);
        console.log(data)
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };
    getProductDetails();
  }, [id]);

  useEffect(() => {
    setTotalPrice(product ? product.price * quantity : 0);
  }, [product, quantity]);

  // Function to convert Buffer to base64
  const bufferToBase64 = (buffer) => {
    return Buffer.from(buffer).toString('base64');
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append('product_id', product._id);
    formData.append('category', product.category);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', quantity);
    formData.append('weight', product.weight);
    formData.append('description', product.description);
    formData.append('image', {
      uri: `data:image/png;base64,${bufferToBase64(product.image.data)}`,
      name: 'product_image.png',
      type: 'image/png',
    });
    return formData;
  };

  const addToCart = async () => {
    try {
      const formData = createFormData();
      const response = await fetch("http://192.168.56.1:5000/api/AddToCart", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={product.image?.data ?
            { uri: `data:image/png;base64,${bufferToBase64(product.image.data)}` }
            : null
          }
          alt='product image'
          w='full' h={300}
          resizeMode='contain'
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {product.name}
        </Heading>
        <Heading bold fontSize={12} mb={2} lineHeight={17}>
          {product.weight}
        </Heading>
        <Heading bold fontSize={12} mb={2} lineHeight={17}>
          {product.category}
        </Heading>
        <Rating value={product.rating} />

        <HStack space={2} alignItems="center" my={5}>
          <NumericInput
            value={quantity}
            onChange={value => setQuantity(value)}
            totalWidth={140}
            totalHeight={40}
            iconSize={25}
            step={1}
            maxValue={product.quantity}
            minValue={1}
            borderColor={Colors.deepGray}
            rounded
            textColor={Colors.black}
            iconStyle={{ color: Colors.white }}
            rightButtonBackgroundColor={Colors.main}
            leftButtonBackgroundColor={Colors.main}
          />
          <Spacer />
          <Heading color={Colors.black}>NPR: {totalPrice}</Heading>
        </HStack>

        <Text lineHeight={24} fontSize={12}>
          {product.description}
        </Text>

        <Button
          onPress={addToCart}
          bg={Colors.main} color={Colors.white} mt={10} borderRadius={30} bold>
          ADD TO CART
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ marginBottom: 70 }}
        >
          Product added to cart successfully!
        </Snackbar>
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;