import React, { useState, useEffect } from 'react';
import { Box, FormControl, ScrollView, Input, VStack, View, Text, Spinner } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Colors from '../../colors';
import Buttone from '../Buttone';

const Inputs = [
  {
    label: "Name",
    key: "name"
  },
  {
    label: "Location",
    key: "location"
  },
  {
    label: "Email",
    key: "email"
  },
  {
    label: "Password",
    key: "password"
  },
];

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userDetails');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        } else {
          console.error('User data not found in AsyncStorage');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderInputField = (input) => {
    return (
      <FormControl key={input.label}>
        <FormControl.Label
          _text={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {input.label}
        </FormControl.Label>

        <Input
          borderWidth={1}
          bg={Colors.subGreen}
          py={3}
          color={Colors.main}
          fontSize={20}
          _focus={{
            bg: Colors.subGreen,
            borderColor: Colors.main,
            borderWidth: 1,
          }}
          isReadOnly
          value={userData ? userData[input.key] : ''}
        />
      </FormControl>
    );
  };

  if (loading) {
    return (
      <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
        <Spinner size="lg" accessibilityLabel="Loading user data" color={Colors.main} />
        <Text mt={2}>Loading user data...</Text>
      </Box>
    );
  }

  return (
    <Box h="full" bg={Colors.white} px={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} mt={5} pb={10}>
          {Inputs.map(renderInputField)}
          <Buttone bg={Colors.main} color={Colors.white}>
            Edit Profile
          </Buttone>
          <Buttone bg={Colors.main} color={Colors.white}>
            Change password
          </Buttone>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default Profile;
