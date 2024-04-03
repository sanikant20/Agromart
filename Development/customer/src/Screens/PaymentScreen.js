import React from 'react';
import { Box, Center, Image, ScrollView, Text, VStack, HStack, Button } from 'native-base';
import Buttone from '../Components/Buttone';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../colors';
import { useNavigation } from '@react-navigation/native';


const paymentMethod = [
  {
    image: require("../../assets/KhaltiLogo.png"),
    alt: "Khalti",
    icons: "Ionicons"
  },
  {
    image: require("../../assets/EsewaLogo.png"),
    alt: "E-Sewa",
    icons: "Ionicons"
  }
];

function PaymentScreen() {
  const navigation = useNavigation();

  const HandlePaymentMethod = () => {
    console.log("payment")
    navigation.navigate('Main')
  }
  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      {/* Header */}
      <Center pb={15}>
        <Text color={Colors.white} fontSize={16} bold>
          Payment Method
        </Text>
      </Center>

      {/* Inputs */}
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethod.map((item, index) => (
              <HStack
                key={index}
                alignItems="center"
                bg={Colors.subGreen}
                px={3}
                py={1}
                justifyContent="space-between"
                rounded={10}
              >
                <Box>
                  <Image
                    source={item.image}
                    alt={item.alt}
                    w={120}
                    h={50}
                  />
                </Box>
                {item.icons === "Ionicons" ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color={Colors.main}
                  />
                ) : (
                  <FontAwesome
                    name="circle-thin"
                    size={30}
                    color={Colors.main}
                  />
                )}
              </HStack>
            ))}

            <Button
              onPress={HandlePaymentMethod}
              rounded={50}
              bg={Colors.main} color={Colors.white} mt={5}>
              Proceed
            </Button>

          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
