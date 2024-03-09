import React, { useState, useEffect } from 'react';
import { Box, FormControl, ScrollView, Input, VStack, View, Text } from 'native-base';
import Colors from '../../colors';
import Buttone from '../Buttone';

const Inputs = [
  {
    label: "name",
    key: "name"
  },
  {
    label: "location",
    key: "location"
  },
  {
    label: "email",
    key: "email"
  },
  {
    label: "password",
    key: "password"
  },
];

const Profile = ({ route }) => {
  const userId = route?.params?.userId;

  console.log("Hello", userId);

  const [userData, setUserData] = useState([]);
  // const [loading, setLoading] = useState(true); // Add loading state

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
        // setLoading(false);
      }
    };

    // Only fetch user data if userId is defined
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  if (!userId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User ID is not provided</Text>
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
