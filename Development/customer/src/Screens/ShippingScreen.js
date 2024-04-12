import { Box, Button, Center, FormControl, Input, ScrollView, Text, VStack, useSafeArea } from 'native-base';
import React, { useEffect, useState } from 'react'
import Colors from '../colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../apiconfig';

const shippingInputs = [
  {
    label: "Enter City",
    type: "text",
    stateKey: "city"
  },
  {
    label: "Enter Postal Code",
    type: "text",
    stateKey: "postalCode"
  },
  {
    label: "Enter Address",
    type: "text",
    stateKey: "address"
  }
]

function ShippingScreen() {
  const [shipping, setShipping] = useState('');
  const [userData, setUserData] = useState({});
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  // retrieve userdata and reset input fields on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userDetails');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        } else {
          console.error('User data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();

    // Clear input fields when navigating from another screen
    const unsubscribe = navigation.addListener('focus', () => {
      setCity('');
      setPostalCode('');
      setAddress('');
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  const HandleShipping = async () => {
    try {
      const response = await fetch(`${apiUrl}/addShippingDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userData._id,
          username: userData.name,
          city,
          postalCode,
          address
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add shipping details");
      }

      const result = await response.json();
      console.log(result);
      setShipping(result);
      alert("Delivery details noted successcully! Please pay for ordered product!")
      navigation.navigate('Payment');
    } catch (error) {
      console.error("Error adding shipping details:", error);

    }
  };


  const validateInputs = () => {
    const errors = {};

    if (!city.trim()) {
      errors.city = <Text style={{ color: 'red' }}>City is required</Text>;
    }
    if (!postalCode.trim()) {
      errors.postalCode = <Text style={{ color: 'red' }}>Postal Code is required</Text>;
    }
    if (!address.trim()) {
      errors.address = <Text style={{ color: 'red' }}>Address is required</Text>;
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
                  onChangeText={(text) => {
                    switch (input.stateKey) {
                      case 'city':
                        setCity(text);
                        break;
                      case 'postalCode':
                        setPostalCode(text);
                        break;
                      case 'address':
                        setAddress(text);
                        break;
                      default:
                        break;
                    }
                  }}
                  value={
                    input.stateKey === 'city' ? city :
                      input.stateKey === 'postalCode' ? postalCode :
                        address}
                />
                {errors[input.stateKey] && (
                  <Text color="red" fontSize="sm">{errors[input.stateKey]}</Text>
                )}
              </FormControl>
            ))}

            <Button
              onPress={() => { if (validateInputs()) { HandleShipping(); } }}
              rounded={50}
              bg={Colors.main} color={Colors.white} mt={5}
            >
              Proceed
            </Button>
            {/* <Button
              onPress={() => { navigation.navigate('Payment'); }}
              marginBottom={10}
              rounded={50}
              bg={Colors.main} color={Colors.white} mt={5}
            >
              Alredy Provided
            </Button> */}
          </VStack>
        </ScrollView>
      </Box>
    </Box >
  )
}

export default ShippingScreen;
