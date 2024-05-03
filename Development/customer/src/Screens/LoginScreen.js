import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../colors";
import { Box, Heading, Input, VStack, Image, Button, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import apiUrl from '../../apiconfig';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError('');

      if (!email || !password) {
        setError('Please provide both email and password.');
        return;
      }

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();

      if (!result || !result.auth) {
        setError('Invalid email or password');
        return;
      }

      // Check user role
      if (result.user.role !== 'user') {
        setError('Invalid user role');
        return;
      }

      console.log("User data:", result);
      // Store user details in AsyncStorage
      await AsyncStorage.setItem('userDetails', JSON.stringify(result.user));
      // Reset input fields
      setEmail("");
      setPassword("");
      navigation.navigate('Navmenu');

    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred while logging in.');
    }
  };

  // Navigate to the signup screen 
  const RegisterPage = () => {
    navigation.navigate('SignUp');
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
        <Heading>Login</Heading>
        <VStack space={5} pt="6">
          {/* Email or username */}
          <Input
            InputLeftElement={<MaterialIcons name="email" size={24} color="black" />}
            variant="underlined"
            placeholder='email or username'
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
            variant="underlined"
            placeholder='password'
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
          my={15} w={'60%'} rounded={45}
          bg={Colors.main}
          onPress={handleLogin}
        >
          LOGIN
        </Button>

        <Button
          _pressed={{ bg: Colors.main }}
          my={15} w={'60%'} rounded={45}
          bg={Colors.blue}
          onPress={RegisterPage}
        >
          Don't have account? Signup
        </Button>
      </Box>
    </Box>
  );
}

export default LoginScreen;
