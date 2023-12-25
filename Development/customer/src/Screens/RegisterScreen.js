import React, { useEffect, useState } from 'react';
import Colors from "../colors";
import { Box, Heading, Input, Text, VStack, Image, Button, Pressable, Link, Select } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [role, setRoleUser] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSIgnup = async () => {
    try {
      const response = await fetch("http://192.168.1.77:5000/api/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          role: role,
          location: location,
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
            onChangeText={(user) => setRoleUser("user")}
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
          my={30} w={'40%'} rounded={45}
          bg={Colors.main}
          onPress={handleSIgnup}
        >
          Signup
        </Button>


        <Pressable mt={4}>
          <Text color={Colors.black} fontWeight="bold">

            <Link ml="auto" color={Colors.main} fontWeight="bold" alignContent={"center"}>
              Login
            </Link>
          </Text>
        </Pressable>

      </Box>
    </Box>
  )
}

export default RegisterScreen;
