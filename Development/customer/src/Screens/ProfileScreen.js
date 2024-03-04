import { Center, Heading, Image, Text } from 'native-base';
import React from 'react'
import Colors from '../colors';
import ProfileTabs from '../Components/Profile/ProfileTabs';

function ProfileScreen() {
  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{ uri: "https://images.rawpixel.com/image_png_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png" }}
          alt='Profile'
          w={24}
          h={24}
          resizeMode='cover'
        />
        <Heading bold fontSize={16} isTruncated my={2} color={Colors.white}>
          Profile
        </Heading>
        <Text italic fontSize={14} color={Colors.white}>
          Joined Dec 12 2023
        </Text>
      </Center>

      {/* Profile Tabs */}
      <ProfileTabs />
    </>

  )
}

export default ProfileScreen;
