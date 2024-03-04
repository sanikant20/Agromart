import React, { useState, useEffect } from 'react';
import { Box, FormControl, ScrollView, Input, VStack, View, Text } from 'native-base';
import Colors from '../../colors';
import Buttone from '../Buttone';
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';


const Inputs = [
  {
    label: "Username",
    key: "username"
  },
  {
    label: "Address",
    key: "address"
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
  const route = useRoute();
  // Check if route and route.params are defined before accessing userId
  const userId = route && route.params ? route.params.userId : null;

  console.log("Hello", userId);

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          // userId is not defined, handle this case
          throw new Error('User ID is not provided');
        }

        const response = await fetch(`http://192.168.1.77:5000/api/userData/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setLoading(false);
      }
    };

    // Only fetch user data if userId is defined
    if (userId) {
      fetchUserData();
    }
  }, [userId]);




  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User data not found</Text>
      </View>
    );
  }

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