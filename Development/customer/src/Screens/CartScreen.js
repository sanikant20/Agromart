import { Box, Button, Center, FlatList, HStack, ScrollView, Text } from 'native-base';
import React from 'react'
import Colors from '../colors';
import CartEmpty from '../Components/Cart/CartEmpty';
import CartItems from '../Components/Cart/CartItems';

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>

      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={26} bold >Cart</Text>
      </Center>

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItems />
      </ScrollView>
      
    </Box>
  )
}

export default CartScreen;
