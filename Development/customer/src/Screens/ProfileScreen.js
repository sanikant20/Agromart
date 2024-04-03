import { Center, Heading, Image, Text } from 'native-base';
import React, { useEffect, useState } from 'react'
import Colors from '../colors';
import ProfileTabs from '../Components/Profile/ProfileTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen() {
  const [userData, setUserData] = useState({});

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

    } catch (error) {
      console.error('Error fetching user data:', error.message);

    }
  };
  useEffect(() => {
    fetchUserDataFromAsyncStorage();
  }, []);

  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Heading bold fontSize={24} isTruncated my={2} color={Colors.orange}>
          Profile : {userData.name}
        </Heading>
        <Text bold fontSize={16} color={Colors.orange}>
          ID Created : {new Date(userData.createdAt).toLocaleString()}
        </Text>
      </Center>

      {/* Render Profile Tabs */}
      <ProfileTabs />
    </>
  )
}

export default ProfileScreen;
