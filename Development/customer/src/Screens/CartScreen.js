import { Box, Button, Center, HStack, ScrollView, Text } from 'native-base';
import React from 'react'
import Colors from '../colors';
import CartEmpty from '../Components/Cart/CartEmpty';
import CartItems from '../Components/Cart/CartItems';
import Buttone from '../Components/Buttone';

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={26} bold >Cart</Text>
       
      </Center>

      {/* When cart is Empty */}
      {/* < CartEmpty /> */}

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItems />

        {/* Total price button
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
              NPR 4342
            </Button>
          </HStack>
        </Center>

        {/* Checkout button 
        <Center px={5} mb={3}>
          <Buttone bg={Colors.main} color={Colors.white} mt={10}>
            Checkout
          </Buttone>
        </Center> */}
      </ScrollView>
    </Box>
  )
}

export default CartScreen;
