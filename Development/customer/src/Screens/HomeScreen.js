import React from 'react'
import { Box, VStack } from 'native-base'
import Colors from '../colors';
import HomeSearch from '../Components/Home/HomeSearch';
import RegularProduct from '../Components/Home/RegularProducts';
import SeasonalProducts from '../Components/Home/SeasonalProduct'

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.subGreen}>
      <>
        <RegularProduct />
      </>
    </Box>
  )
}

export default HomeScreen;
