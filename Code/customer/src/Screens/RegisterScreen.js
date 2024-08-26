import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from "../colors";
import { Box, Heading, Input, VStack, Image, Button, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import apiUrl from '../../apiconfig';

function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check email api
  const checkEmailExistence = async () => {
    try {
      const checkResponse = await fetch(`${apiUrl}/check-email`, {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const checkJson = await checkResponse.json();
      return checkJson.emailExists;

    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const handleSignup = async (e) => {
    // Email existence
    const emailExists = await checkEmailExistence();

    if (emailExists) {
      alert("Email already exists. Choose a different email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Create new user
    try {
      setError('');
      if (!name || !location || !email || !password) {
        setError('Please provide all details.');
        return;
      }

      // Fetching the server with a POST request for signup
      let result = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        body: JSON.stringify({ name, role: 'user', location, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred while registering.');
    }
  };

  // Navigate to login page
  const AlreadySignup = () => {
    navigation.navigate('Login');
  };

  return (
    <Box flex={1} bg={Colors.grey}>
      <Image flex={1}
        alt="logo"
        resizeMode="stretch"
        w="full"
        source={require("../../assets/Green.png")}>
      </Image>

      <Box w='full' h="full" position="absolute" top="0" px="6" justifyContent="center">
        <Heading>Sign Up</Heading>
        <VStack space={5} pt="6">
          {/* Name */}
          <Input
            InputLeftElement={<AntDesign name="user" size={24} color="black" />}
            variant="underlined" placeholder='Name'
            w="70%"
            fontSize={18}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          {/* Address */}
          <Input
            InputLeftElement={<Ionicons name="location" size={24} color="black" />}
            variant="underlined" placeholder='Address'
            w="70%"
            fontSize={18}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />

          {/* Email */}
          <Input
            InputLeftElement={<MaterialIcons name="email" size={24} color="black" />}
            variant="underlined" placeholder='email or username'
            w="70%"
            fontSize={18}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* Password */}
          <Input
            InputLeftElement={<AntDesign name="eye" size={24} color="black" />}
            variant="underlined" placeholder='password'
            w="70%"
            fontSize={18}
            type='password'
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </VStack>

        {error && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        
        <Button
          _pressed={{ bg: Colors.main }}
          my={15}
          w={'60%'}
          rounded={45}
          bg={Colors.main}
          onPress={handleSignup}
        >
          SIGNUP
        </Button>

        <Button
          _pressed={{ bg: Colors.main }}
          my={15}
          w={'60%'}
          rounded={45}
          bg={Colors.blue}
          onPress={AlreadySignup}
        >
          Already have account? Login
        </Button>
      </Box>
    </Box>
  )
}

export default RegisterScreen;
