import React, { useState, useEffect, useCallback } from 'react';
import { Box, FormControl, ScrollView, Input, VStack, View, Text, Spinner, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../colors';
import Buttone from '../Buttone';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

const Inputs = [
  {
    label: "ID",
    key: "_id"
  },
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
  }
];

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  // Render user data from asyncStorage
  const fetchUserDataFromAsyncStorage = async () => {
    try {
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

  // Fetch userdata from api
  const fetchUserDataFromAPI = async () => {
    try {
      if (!userData._id) {
        alert("Page refresh.")
        return;
      }

      const userID = userData._id;
      console.log("User ID", userID);
      const response = await fetch(`http://192.168.56.1:5000/api/userData/${userID}`);

      if (response.ok) {
        const userDataFromAPI = await response.json();
        setUserData(userDataFromAPI);
      } else {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data from API:', error.message);
      alert("Page Refreshed...");
    }
  };

  // SAve the user updated data 
  const saveUserDataToAsyncStorage = async (userData) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error.message);
    }
  };

  // Refresh page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserDataFromAPI();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchUserDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchUserDataFromAPI();
    }
  }, [isFocused]);

  // Handle profile update
  const handleProfileDataUpdate = async () => {
    navigation.navigate('EditProfile');
    // Save the updated user data to AsyncStorage
    await saveUserDataToAsyncStorage(userData);
  };

  // Change Password Handler
  const ChangePasswordHandler = async () => {
    try {
      navigation.navigate('ChangePassword');
    } catch (error) {
      console.error(error.message)
    };
  };

  // Logout
  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      // Navigate to login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

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
          value={userData[input.key]}
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
    <Box h="full" bg={Colors.subGreen} px={5}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <VStack space={10} mt={3} pb={10}>
          {Inputs.map(renderInputField)}
          <Button onPress={handleProfileDataUpdate}
            bg={Colors.main}
            color={Colors.white}
            borderRadius="50px"
          >
            Edit Profile
          </Button>

          <Button
            bg={Colors.main}
            color={Colors.white}
            borderRadius="50px"
            onPress={ChangePasswordHandler}
          >
            Change password
          </Button>
          <Button
            onPress={handleLogout}
            bg={Colors.skyblue}
            color={Colors.white}
            borderRadius="50px"
          >
            Log out
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Profile;
