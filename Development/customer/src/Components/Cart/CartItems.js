import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Image, VStack, Text, Box, HStack, Center } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Colors from '../../colors';
import { FontAwesome } from '@expo/vector-icons';
import Buttone from '../Buttone';
import CartEmpty from './CartEmpty';
import { Buffer } from 'buffer';

const Swiper = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCartProducts = async () => {
            try {
                let response = await fetch('http://192.168.1.77:5000/api/CartData');
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                setCart(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart products:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };
        getCartProducts();
    }, []);

    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };
    
    console.log("CartData: ", cart)
    if (cart.length === 0) {
        return <CartEmpty />;
    }

    const renderItems = () => {
        return cart.map((item) => {
            return (
                <TouchableOpacity key={item._id}>
                    <Box ml={6} mb={3}>
                        <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
                            <Center w="25%" bg={Colors.deepGray}>
                                {item.image && item.image.data && (
                                    <Image
                                        source={{ uri: `data:image/png;base64,${bufferToBase64(item.image.data)}` }}
                                        accessibilityLabel={item.name}
                                        alt={item.name}
                                        w="full"
                                        h={24}
                                        resizeMode="contain"
                                        onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
                                    />
                                )}
                            </Center>
                            <VStack w="60%" px={2} space={2}>
                                <Text isTruncated color={Colors.black} bold fontSize={10}>
                                    {item.name}
                                </Text>
                                <Text color={Colors.lightBlack}>NPR {item.price}</Text>
                            </VStack>
                            <Center>
                                <Buttone bg={Colors.main} _pressed={{ bg: Colors.main }} _text={{ color: Colors.white }}>
                                    {item.quantity}
                                </Buttone>
                            </Center>
                        </HStack>
                    </Box>
                </TouchableOpacity>
            );
        });
    };

    const renderHiddenItem = () => (
        <TouchableOpacity w={50} roundedTopRight={10} roundedBottomLeft={10} h="88%" ml="auto" justifyContent="center" bg={Colors.red}>
            <Center alignItems="center" space={2}>
                <FontAwesome name='trash' size={24} color={Colors.white} />
            </Center>
        </TouchableOpacity>
    );

    return (
        <SwipeListView>
            <FlatList
                data={cart}
                renderItem={renderItems}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        </SwipeListView>
    );
};

export default Swiper;


// const CartItems = () => {
//     const [cart, setCart] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {

//         const getCartProducts = async () => {
//             try {
//                 let response = await fetch('http://192.168.1.77:5000/api/CartData');
//                 if (!response.ok) {
//                     throw new Error("Error while fetching products data");
//                 }
//                 const result = await response.json();
//                 setCart(result);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cart products:', error.message);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };
//         getCartProducts();
//     }, []);

//     const handleCheckOut = async () => {
//         console.log("Checkout")
//     };

//     // Function to convert Buffer to base64
//     const bufferToBase64 = (buffer) => {
//         return Buffer.from(buffer).toString('base64');
//     };

//     if (cart.length === 0) {
//         //         return <CartEmpty />;
//         //     }
//         return (
//             <Box mr={6}>
//                 {/* <Swiper /> */}
//                 <Pressable key={item._id}>
//                     <Box ml={6} mb={3}>
//                         <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
//                             <Center w="25%" bg={Colors.deepGray}>
//                                 {item.image && item.image.data && (
//                                     <Image
//                                         source={{ uri: `data:image/png;base64,${bufferToBase64(item.image.data)}` }}
//                                         accessibilityLabel={item.name}
//                                         alt={item.name}
//                                         w="full"
//                                         h={24}
//                                         resizeMode="contain"
//                                         onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
//                                     />
//                                 )}
//                             </Center>
//                             <VStack w="60%" px={2} space={2}>
//                                 <Text isTruncated color={Colors.black} bold fontSize={10}>
//                                     {item.name}
//                                 </Text>
//                                 <Text color={Colors.lightBlack}>NPR {item.price}</Text>
//                             </VStack>
//                             <Center>
//                                 <Button bg={Colors.main} _pressed={{ bg: Colors.main }} _text={{ color: Colors.white }}>
//                                     {item.quantity}
//                                 </Button>
//                             </Center>
//                         </HStack>
//                     </Box>
//                 </Pressable>

//                 {/* Total price */}
//                 <Center mt={5}>
//                     <HStack rounded={50}
//                         justifyContent="space-between"
//                         bg={Colors.white}
//                         shadow={2}
//                         w="90%"
//                         pl={5}
//                         h={45}
//                         alignItems="center"
//                     >
//                         <Text>Total:</Text>
//                         <Button px={10}
//                             h={45}
//                             rounded={50}
//                             bg={Colors.main}
//                             _text={{
//                                 color: Colors.white,
//                                 fontWeight: "semibold"
//                             }}
//                             _pressed={{
//                                 bg: Colors.main
//                             }}
//                         >
//                             NPR
//                             {/* {totalPrice} */}
//                         </Button>
//                     </HStack>
//                 </Center>

//                 {/* Checkout button */}
//                 <Center px={5} mb={3}>
//                     <Buttone
//                         onPress={handleCheckOut}
//                         bg={Colors.main} color={Colors.white} mt={10}>
//                         Checkout
//                     </Buttone>
//                 </Center>
//             </Box>
//         );
//     };
// export default CartItems;


// import React, { useEffect, useState } from 'react';
// import { Pressable, Image, Text, Button, View, FlatList } from 'react-native';
// import Colors from '../../colors';
// import Buttone from '../Buttone';
// import CartEmpty from './CartEmpty';
// import { Box, Center, HStack, VStack } from 'native-base';
// var Buffer = require('buffer/').Buffer;

// const CartItems = () => {
//     const [cart, setCart] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const getCartProducts = async () => {
//             try {
//                 let response = await fetch('http://192.168.56.1:5000/api/CartData');
//                 if (!response.ok) {
//                     throw new Error("Error while fetching products data");
//                 }
//                 const result = await response.json();
//                 setCart(result);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cart products:', error.message);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };
//         getCartProducts();
//     }, []);

//     const handleCheckOut = async () => {
//         console.log("Checkout");
//     };

//     // Function to convert Buffer to base64
//     const bufferToBase64 = (buffer) => {
//         return Buffer.from(buffer).toString('base64');
//     };

//     const renderItem = ({ item }) => (
//         <Pressable onPress={() => console.log('Item pressed')}>
//             <Box ml={6} mb={3}>
//                 <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
//                     <Center w="25%" bg={Colors.deepGray}>
//                         {item.image && item.image.data && (
//                             <Image
//                                 source={{ uri: `data:image/png;base64,${bufferToBase64(item.image.data)}` }}
//                                 accessibilityLabel={item.name}
//                                 alt={item.name}
//                                 w="full"
//                                 h={24}
//                                 resizeMode="contain"
//                                 onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
//                             />
//                         )}
//                     </Center>
//                     <VStack w="60%" px={2} space={2}>
//                         <Text isTruncated color={Colors.black} bold fontSize={10}>{item.name}</Text>
//                         <Text color={Colors.lightBlack}>NPR {item.price}</Text>
//                         <Text color={Colors.lightBlack}>NPR {item.quantity}</Text>
//                     </VStack>
//                     {/* <Center>
//                         <Button bg={Colors.main}
//                             _pressed={{ bg: Colors.main }}
//                             _text={{ color: Colors.white }}
//                             title="Press Me"
//                         >
//                             {String(item.quantity)}
//                         </Button>

//                     </Center> */}
//                 </HStack>
//             </Box>
//         </Pressable>
//     );

//     return (
//         <Box h='full' bg={Colors.white} pt={5}>
//             {loading ? (
//                 <Text>Loading...</Text>
//             ) : error ? (
//                 <Text>Error: {error}</Text>
//             ) : (
//                 <FlatList
//                     data={cart}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     // ListEmptyComponent={<CartEmpty />}
//                     ListFooterComponent={
//                         <>
//                             {/* Total price */}
//                             <Center mt={5}>
//                                 <HStack rounded={50} justifyContent="space-between" bg={Colors.white} shadow={2} w="90%" pl={5} h={45} alignItems="center">
//                                     <Text>Total Price:</Text>
//                                     <Button
//                                         px={10}
//                                         h={45}
//                                         rounded={50}
//                                         bg={Colors.main}
//                                         _text={{ color: Colors.white, fontWeight: "semibold" }}
//                                         _pressed={{ bg: Colors.main }}
//                                         title='Rs'
//                                     >
//                                         {/* {totalPrice} */}
//                                     </Button>
//                                 </HStack>
//                             </Center>

//                             {/* Checkout button */}
//                             <Center px={5} mb={3}>
//                                 <Buttone
//                                     onPress={handleCheckOut}
//                                     bg={Colors.main}
//                                     color={Colors.white}
//                                     mt={10}
//                                     title='Submit'
//                                 >
//                                     Checkout
//                                 </Buttone>
//                             </Center>
//                         </>
//                     }
//                 />
//             )}
//         </Box>
//     );
// };

// export default CartItems;
