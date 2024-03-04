// import { Center, HStack, Pressable, Image, VStack, Text, Button } from 'native-base';
// import React from 'react';
// import { Box } from 'native-base';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import Products from '../../Data/Products';
// import Colors from '../../colors';
// import { FontAwesome } from '@expo/vector-icons';
// import Buttone from '../Buttone';
// import { useCart, } from '../../Screens/CartReducer';
// import CartEmpty from './CartEmpty';

// const Swiper = () => (
//     <SwipeListView
//         rightOpenValue={-50}
//         previewRowKey="0"
//         previewOpenValue={-40}
//         previewOpenDelay={3000}
//         data={data.map}
//         renderItem={renderItems}
//         renderHiddenItem={HiddenItems}
//         showsVerticalScrollIndicator={false}
//     />
// );

// // Render Items
// const renderItems = (data) => (
//     <Pressable>
//         <Box ml={6} mb={3}>
//             <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
//                 <Center w="25%" bg={Colors.deepGray}>
//                     <Image
//                         source={{ uri: data.item.image }}
//                         alt={data.item.name}
//                         w="full"
//                         h={24}
//                         resizeMode="contain"
//                     />
//                 </Center>
//                 <VStack w="60%" px={2} space={2}>
//                     <Text isTruncated color={Colors.black} bold fontSize={10}>
//                         {data.item.name}
//                     </Text>
//                     <Text color={Colors.lightBlack}>NPR {data.item.price}</Text>
//                 </VStack>
//                 <Center>
//                     <Button bg={Colors.main}
//                         _pressed={{ bg: Colors.main }}
//                         _text={bg = Colors.white}
//                     >5</Button>
//                 </Center>
//             </HStack>
//         </Box>
//     </Pressable>
// );

// // Render Hidden items
// const HiddenItems = (data) => (
//     <Pressable w={50} roundedTopRight={10} roundedBottomLeft={10} h="88%" ml="auto" justifyContent="center" bg={Colors.red}>
//         <Center alignItems="center" space={2}>
//             <FontAwesome name='trash' size={24} color={Colors.white} />
//         </Center>
//     </Pressable>
// );

// const CartItems = () => {
//     let data = useCart();
//     const { dispatch } = useCart();

//     if (data.length === 0) {
//         return (
//             <CartEmpty />
//         )
//     };

//     const handleCheckOut = async () => {
//         try {
//             // Send POST request to checkout
//             const response = await fetch('http://:5000/api/orderData', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ cartData }),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to checkout');
//             }
//             console.log("JSON RESPONSE:::::", response.status)
//             if (response.status === 200) {
//                 dispatch({ type: "CLEAR_CART" })
//             }
//             // Clear cart data after successful checkout
//             // setCartData([]);

//             alert('Checkout successful');
//         } catch (error) {
//             console.error('Error during checkout:', error.message);
//         }
//     };
//     let totalPrice = data.reduce((total, food) => total + food.price, 0)

//     return (
//         <Box mr={6}>
//             <Swiper />

//             {/* Total price */}
//             <Center mt={5}>
//                 <HStack rounded={50}
//                     justifyContent="space-between"
//                     bg={Colors.white}
//                     shadow={2}
//                     w="90%"
//                     pl={5}
//                     h={45}
//                     alignItems="center"
//                 >
//                     <Text>Total:</Text>
//                     <Button px={10}
//                         h={45}
//                         rounded={50}
//                         bg={Colors.main}
//                         _text={{
//                             color: Colors.white,
//                             fontWeight: "semibold"
//                         }}
//                         _pressed={{
//                             bg: Colors.main
//                         }}
//                     >
//                         NPR {totalPrice}
//                     </Button>
//                 </HStack>
//             </Center>

//             {/* Checkout button */}
//             <Center px={5} mb={3}>
//                 <Buttone onPress={handleCheckOut} bg={Colors.main} color={Colors.white} mt={10}>
//                     Checkout
//                 </Buttone>
//             </Center>
//         </Box>
//     );
// };


// export default CartItems;

import React, { useEffect } from 'react';
import { Box, Center, HStack, Text, Button, Pressable, Image, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Colors from '../../colors';
import { FontAwesome } from '@expo/vector-icons';
import Buttone from '../Buttone';
import { useCart, useDispatchCart } from '../../Screens/CartReducer'; // Import useCart and useDispatchCart hooks
import CartEmpty from './CartEmpty';

const Swiper = () => {
  const data = useCart(); 
//   const dispatch = useCart();

  return (
    <SwipeListView
      rightOpenValue={-50}
      previewRowKey="0"
      previewOpenValue={-40}
      previewOpenDelay={3000}
      data={data} 
      renderItem={renderItems}
      renderHiddenItem={HiddenItems}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Render Items
const renderItems = (data) => (
  <Pressable>
    <Box ml={6} mb={3}>
      <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
        <Center w="25%" bg={Colors.deepGray}>
          <Image
            source={{ uri: data.item.image }}
            alt={data.item.name}
            w="full"
            h={24}
            resizeMode="contain"
          />
        </Center>
        <VStack w="60%" px={2} space={2}>
          <Text isTruncated color={Colors.black} bold fontSize={10}>
            {data.item.name}
          </Text>
          <Text color={Colors.lightBlack}>NPR {data.item.price}</Text>
        </VStack>
        <Center>
          <Button bg={Colors.main} _pressed={{ bg: Colors.main }} _text={bg = Colors.white}>
            {data.item.quantity}
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);

// Render Hidden items
const HiddenItems = (data) => (
  <Pressable w={50} roundedTopRight={10} roundedBottomLeft={10} h="88%" ml="auto" justifyContent="center" bg={Colors.red}>
    <Center alignItems="center" space={2}>
      <FontAwesome name='trash' size={24} color={Colors.white} />
    </Center>
  </Pressable>
);

const CartItems = () => {
  const data = useCart(); 
  const dispatch = useDispatchCart();

  useEffect(() => {
    // Calculate total price whenever cart data changes
    const totalPrice = data.reduce((total, food) => total + food.price, 0);
  }, [data]);

  const handleCheckOut = async () => {
    try {
      // Send POST request to checkout
      const response = await fetch('http://192.168.56.1:5000/api/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartData: data }), // Use cart data
      });
      if (!response.ok) {
        throw new Error('Failed to checkout');
      }
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" })
      }
      // Clear cart data after successful checkout
      // setCartData([]);

      alert('Checkout successful');
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  // Calculate total price
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return (
      <CartEmpty />
    )
  };

  return (
    <Box mr={6}>
      <Swiper />

      {/* Total price */}
      <Center mt={5}>
        <HStack rounded={50}
          justifyContent="space-between"
          bg={Colors.white}
          shadow={2}
          w="90%"
          pl={5}
          h={45}
          alignItems="center"
        >
          <Text>Total:</Text>
          <Button px={10}
            h={45}
            rounded={50}
            bg={Colors.main}
            _text={{
              color: Colors.white,
              fontWeight: "semibold"
            }}
            _pressed={{
              bg: Colors.main
            }}
          >
            NPR {totalPrice}
          </Button>
        </HStack>
      </Center>

      {/* Checkout button */}
      <Center px={5} mb={3}>
        <Buttone onPress={handleCheckOut} bg={Colors.main} color={Colors.white} mt={10}>
          Checkout
        </Buttone>
      </Center>
    </Box>
  );
};

export default CartItems;
