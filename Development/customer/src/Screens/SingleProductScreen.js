import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Heading, Image, Spacer, Spinner, Text } from 'native-base';
import Colors from '../colors';
import NumericInput from 'react-native-numeric-input';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewProduct from '../Components/Review/ReviewProduct';
import Rating from '../Components/Review/Rating';
import SimilarProduct from '../Components/Products/SimilarProduct';
var Buffer = require('buffer/').Buffer;

function SingleProductScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const navigation = useNavigation();


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        let response = await fetch(`http://192.168.56.1:5000/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product details. Status: ${response.status}`);
        }
        let result = await response.json();
        setProduct(result);
        setTotalPrice(result.price);
        console.log(result);

        // Once product details are fetched, fetch similar products
        fetchSimilarProducts(result.category);

        // Fetch average rating
        let ratingResponse = await fetch(`http://192.168.56.1:5000/api/getReview/${id}`);
        if (!ratingResponse.ok) {
          throw new Error(`Failed to fetch average rating. Status: ${ratingResponse.status}`);
        }
        let ratingData = await ratingResponse.json();
        setAverageRating(ratingData.averageRating);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        setLoading(false);
      }
    };
    getProductDetails();
  }, [id]);


  // Function to fetch similar products based on category
  const fetchSimilarProducts = async (category) => {
    try {
      let response = await fetch(`http://192.168.56.1:5000/api/products?category=${category}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch similar products. Status: ${response.status}`);
      }
      let result = await response.json();
      setSimilarProducts(result.products);
    } catch (error) {
      console.error("Error fetching similar products:", error.message);
    }
  };

  // Count total price 
  useEffect(() => {
    setTotalPrice(product ? product.price * quantity : 0);
  }, [product, quantity]);

  // Function to convert Buffer to base64
  const bufferToBase64 = (buffer) => {
    return Buffer.from(buffer).toString('base64');
  };

  // retrive userdata
  useEffect(() => {
    const fetchUserData = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);


  // FromData to add product to cart
  const createFormData = () => {
    const formData = new FormData();
    formData.append('user_id', userData._id);
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

  // Fetch API to add product to cart
  const addToCart = async () => {
    try {
      const formData = createFormData();
      const response = await fetch("http://192.168.56.1:5000/api/AddToCart", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      alert("Product added to cart successfully!")
      navigation.navigate("Main")
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      if (error.message === 'Product not found') {
        alert("Product not found. Please try again later.");
      } else {
        alert("Failed to add product to cart. Please try again later.");
      }
    }
  };

  // display loader
  if (loading) {
    return (
      <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
        <Spinner size="lg" accessibilityLabel="Loading product data" color={Colors.main} />
        <Text mt={2}>Loading product data...</Text>
      </Box>
    );
  }

  console.log("ProductID:", product._id)
  return (
    <Box safeArea flex={1} p={3} bg={Colors.subGreen}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={product.image?.data ?
            { uri: `data:image/png;base64,${bufferToBase64(product.image.data)}` }
            : null
          }
          alt='product image'
          w='100%'
          h={320}
          resizeMode='cover'
        />
        <Heading bold fontSize={15} mt={1} mb={2} lineHeight={22}>
          Name : <Text>{product.name}</Text>
        </Heading>
        <Heading bold fontSize={12} mb={2} lineHeight={17}>
          Weight : {product.weight}
        </Heading>
        <Heading bold fontSize={12} mb={2} lineHeight={17}>
          Category : {product.category}
        </Heading>
        <Rating value={averageRating} />

        <HStack space={2} alignItems="center" my={5}>

          <NumericInput
            value={quantity}
            onChange={value => {
              if (value <= 0) {
                setQuantity(0);
              } else {
                setQuantity(value);
              }
            }}
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
          <Heading color={Colors.black}>Rs: {totalPrice}</Heading>
        </HStack>

        <Text lineHeight={24} fontSize={14}>
          <Text bold>Description : </Text>
          {product.description}
        </Text>

        <Button
          onPress={addToCart}
          bg={Colors.main} color={Colors.white} mt={10} borderRadius={30} bold>
          ADD TO CART
        </Button>

        <Box safeArea flex={1} p={3} bg={Colors.subGreen}>
          <ReviewProduct productId={product._id} />

          {/* Render Similar Products wrapped with the product category */}
          <SimilarProduct navigation={navigation} products={similarProducts} category={product.category} />

        </Box>
      </ScrollView>
    </Box>
  );
};
export default SingleProductScreen;


