import React, { useState } from 'react';
import Colors from "../colors";
import { Box, Heading, Input, Text, VStack, Image, Button, Pressable, Link } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.77:5000/api/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();
      console.log(data);

      // if (data) {
      //   console.log(name)
      //   console.log(role)
      //   console.log(location)
      //   console.log(email)
      //   console.log(password)
      // }
      return data;

    } catch (error) {
      console.error(error)
    }
  }



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
            variant="underlined" placeholder='use@gmail.com'
            w="70%"
            fontSize={18}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            onChange={(event) => setEmail(event.nativeEvent.text)}

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

            onChange={(event) => setPassword(event.nativeEvent.text)}

          />
        </VStack>

        <Button
          _pressed={{ bg: Colors.main }}
          my={30} w={'40%'} rounded={45}
          bg={Colors.main}
          onPress={handleLogin}
         
        >
          LOGIN
        </Button>


        <Pressable mt={4}>
          <Text color={Colors.black} fontWeight="bold">

            <Link ml="auto" color={Colors.main} fontWeight="bold" alignContent={"center"}>
              SIGN UP
            </Link>
          </Text>
        </Pressable>

      </Box>
    </Box>
  )
}

export default LoginScreen;
