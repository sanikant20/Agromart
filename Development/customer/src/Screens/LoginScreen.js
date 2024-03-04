import React, { useState } from 'react';
import Colors from "../colors";
import { Box, Heading, Input, VStack, Image, Button, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

      const response = await fetch("http://192.168.56.1:5000/api/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log(result);

      if (!result || !result.auth || result.role) {
        setError('Invalid email, password, or user role with this email.');
        return;
      }

      navigation.navigate('Menu');

    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred while logging in.');
    }
  };

  const RegisterPage = () => {
    // Navigate to the signup screen 
    navigation.navigate('SignUp');
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

        <Heading>Login</Heading>

        <VStack space={5} pt="6">
          {/* Email */}
          <Input
            InputLeftElement={<MaterialIcons name="email" size={24} color="black" />}
            variant="underlined"
            placeholder='use@gmail.com'
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
          bg={Colors.red}
          onPress={RegisterPage}
        >
          Don't have account? Signup
        </Button>
      </Box>
    </Box>
  );
}

export default LoginScreen;
