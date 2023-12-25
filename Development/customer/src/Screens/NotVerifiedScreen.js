import { Box, Button, Center, Image, VStack } from 'native-base';
import React from 'react'
import Colors from '../colors';

function NotVerifiedScreen() {
  return (
    <Box flex={1} bg={Colors.main} backgroundima safeAreaTop>
      <Center w="full" h={250} >
        <Image source={require("../../assets/favicon.png")}
          alt='LOGO'
          size="lg"
        />
      </Center>
      <VStack space={6} px={5} alignItems="center">
        <Button>REGISTER</Button>

      </VStack>

    </Box>
  )
}

export default NotVerifiedScreen;
