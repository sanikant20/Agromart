import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from "../colors";
import { Box, Heading, Input, VStack, Image, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check email api
  const checkEmailExistence = async () => {
    try {
      const checkResponse = await fetch("http://192.168.1.77:5000/api/check-email", {
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

    // Create new user
    try {
      setError('');
      if (!name || !role || !location || !email || !password) {
        setError('Please provide all details.');
        return;
      }

      // Fetching the server with a POST request for signup
      let result = await fetch('http://192.168.1.77:5000/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, role, location, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      console.log(result);

      // await AsyncStorage.setItem("userData", JSON.stringify(result))
      navigation.navigate('Menu');

    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred while registering.');
    }
  };

  const AlreadySignup = () => {
    navigation.navigate('Login');
  };

  return (
    <Box flex={1} bg={Colors.black}>
      <Image flex={1}
        alt="logo"
        resizeMode="cover"
        w="full"
        source={require("../../assets/cover.jpg")}>
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

          {/* Role */}
          <Input
            variant="underlined"
            placeholder='customer'
            w="70%"
            fontSize={18}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={role}
            onChangeText={(User) => setRole(User)}
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
            variant="underlined" placeholder='use@gmail.com'
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
