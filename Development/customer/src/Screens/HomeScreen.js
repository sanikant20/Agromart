import React from 'react'
import { Box } from 'native-base'
import Colors from '../colors';
import HomeSearch from '../Components/Home/HomeSearch';
import HomeProduct from '../Components/Home/HomeProduct';
import RegularProducts from '../Components/Home/RegularProducts';

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.subGreen}>
      <HomeSearch />
      {/* <RegularProducts /> */}
      <HomeProduct />

</Box>
  )
}

export default HomeScreen;
