// import React, { useState, useEffect } from 'react';
// import { Box, Button, HStack, Heading, Image, ScrollView, Spacer, Text } from 'native-base';
// import Colors from '../colors';
// import Rating from '../Components/Review/Rating';
// import NumericInput from 'react-native-numeric-input';
// import Review from '../Components/Review/Review';
// import { Snackbar } from 'react-native-paper';

// function SingleProductScreen({ route }) {
//   const { id } = route.params;
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);

//   useEffect(() => {
//     const getProductDetails = async () => {
//       try {
//         let result = await fetch(`http://192.168.1.77:5000/api/products/${id}`);

//         if (!result.ok) {
//           throw new Error(`Failed to fetch product details. Status: ${result.status}`);
//         }

//         let data = await result.json();
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product details:", error.message);
//       }
//     };

//     getProductDetails();
//   }, [id]);

//   const addToCart = () => {
//     if (!product) return;

//     const cartItem = {
//       id: product._id,
//       name: product.name,
//       price: product.price,
//       quantity: quantity,
//     };

//     console.log("Adding to cart:", cartItem);

//     setSnackbarVisible(true);
//   };

//   return (
//     <Box safeArea flex={1} bg={Colors.white}>
//       <ScrollView px={5} showsVerticalScrollIndicator={false}>
//         {product && (
//           <>
//             <Image source={{ uri: product.image }} alt='product image' w='full' h={300} resizeMode='contain' />
//             <Heading bold fontSize={15} mb={2} lineHeight={22}>
//               {product.name}
//             </Heading>
//             <Heading bold fontSize={12} mb={2} lineHeight={17}>
//               {product.weight}
//             </Heading>
//             <Heading bold fontSize={12} mb={2} lineHeight={17}>
//               {product.category}
//             </Heading>
//             <Rating value={product.rating} />

//             <HStack space={2} alignItems="center" my={5}>
//               <NumericInput
//                 value={quantity}
//                 onChange={value => setQuantity(value)}
//                 totalWidth={140}
//                 totalHeight={40}
//                 iconSize={25}
//                 step={1}
//                 maxValue={product.quantity}
//                 minValue={1}
//                 borderColor={Colors.deepGray}
//                 rounded
//                 textColor={Colors.black}
//                 iconStyle={{ color: Colors.white }}
//                 rightButtonBackgroundColor={Colors.main}
//                 leftButtonBackgroundColor={Colors.main}
//               />
//               <Spacer />
//               <Heading bold color={Colors.black}>${product.price}</Heading>
//             </HStack>

//             <Text lineHeight={24} fontSize={12}>
//               {product.description}
//             </Text>

//             <Button onPress={addToCart} bg={Colors.main} color={Colors.white} mt={10} borderRadius={30} bold>
//               ADD TO CART
//             </Button>

//             {/* <Review /> */}
//           </>
//         )}

//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={3000} 
//           style={{ marginBottom: 70 }} 
//         >
//           Product added to cart successfully!
//         </Snackbar>
//       </ScrollView>
//     </Box>
//   );
// }

// export default SingleProductScreen;


import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Heading, Image, ScrollView, Spacer, Text } from 'native-base';
import Colors from '../colors';
import Rating from '../Components/Review/Rating';
import NumericInput from 'react-native-numeric-input';
import { Snackbar } from 'react-native-paper';
import { useCart } from './CartReducer'; 

function SingleProductScreen({ route }) {
  const { cartItems, dispatch } = useCart();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
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
        setTotalPrice(data.price)
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    getProductDetails();
  }, [id]);

  const addToCart = async () => {
    try {
      if (!product) throw new Error('Product details not available');
  
      // Ensure that cartItems is defined before calling find method
      if (!cartItems) throw new Error('Cart items not available');
  
      const finalPrice = product.price * quantity;
      const itemExists = cartItems.find(item => item.id === product._id);
  
      if (itemExists) {
        // If the item already exists in the cart, update its quantity and price
        await dispatch({
          type: 'UPDATE_CART_ITEM',
          id: product._id,
          price: finalPrice,
          qty: quantity,
        });
      } else {
        // If the item does not exist in the cart, add it as a new item
        const cartItem = {
          id: product._id,
          name: product.name,
          price: finalPrice,
          quantity: quantity,
        };
  
        await dispatch({ type: 'ADD_TO_CART', payload: cartItem });
      }
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };
  
  useEffect(()=>{
    setTotalPrice(product ? product.price* quantity : 0);
  })

  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        {product && (
          <>
            <Image source={{ uri: product.image }} alt='product image' w='full' h={300} resizeMode='contain' />
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

            <Button onPress={addToCart} bg={Colors.main} color={Colors.white} mt={10} borderRadius={30} bold>
              ADD TO CART
            </Button>

          </>
        )}

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
