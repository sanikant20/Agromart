import { Box, ScrollView } from 'native-base';
import React from 'react'
import Colors from '../colors';
import OrderInfo from '../Components/Order/OrderInfo';

function OrderScreen() {
  return (
    <Box bg={Colors.subGreen} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <OrderInfo />
        </ScrollView>
      </Box>

    </Box>
  )
}

export default OrderScreen;
