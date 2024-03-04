import { Box, Center, FormControl, Input, ScrollView, Text, VStack } from 'native-base';
import React from 'react'
import Colors from '../colors';
import Buttone from '../Components/Buttone';

const shippingInputs = [
  {
    label: "Enter Country",
    type: "text",
  },
  {
    label: "Enter City",
    type: "text",
  },
  {
    label: "Enter Postal Code",
    type: "text",
  },
  {
    label: "Enter Address",
    type: "text",
  }
]

function ShippingScreen() {
  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      {/* Header */}
      <Center pb={15}>
        <Text color={Colors.white} fontSize={16} bold>
          Delivery Details
        </Text>
      </Center>

      {/* Inputs */}
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {shippingInputs.map((input, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  {input.label}
                </FormControl.Label>
                <Input
                  borderWidth={0.2}
                  borderColor={Colors.main}
                  fontSize='16px'
                  bg={Colors.subGreen}
                  py={4}
                  type={input.type}
                  color={Colors.main}
                  _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                  
                />
              </FormControl>
            ))}

            <Buttone bg={Colors.main} color={Colors.white} mt={5}>
                Proceed
            </Buttone>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default ShippingScreen;
