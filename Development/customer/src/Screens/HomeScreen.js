import React from 'react'
import { Box } from 'native-base'
import Colors from '../colors';
import HomeSearch from '../Components/HomeSearch';
import HomeProduct from '../Components/HomeProduct';

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.subGreen}>
      <HomeSearch />
      <HomeProduct />
</Box>
  )
}

export default HomeScreen;
