import React from 'react'
import { Box, Button, HStack, Pressable, ScrollView, Text } from 'native-base'
import Colors from '../../colors'

const Orders = () => {
  return (
    <Box h='full' bg={Colors.white} pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* For paid order */}
        <Pressable>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems="center"
            bg={Colors.deepGray}
            py={5}
            px={2}
          >
            <Text fontSize={11} color={Colors.blue} isTruncated>
              432989234092
            </Text>
            <Text fontSize={12} bold color={Colors.black} isTruncated>
              PAID
            </Text>
            <Text fontSize={12} italic color={Colors.black} isTruncated>
              Dec 29 2023
            </Text>
            <Button
              px={7}
              py={1.5}
              rounded={50}
              bg={Colors.main}
              _text={{
                color: Colors.white
              }}
              _pressed={{
                bg: Colors.main
              }}
            >
              NPR 323
            </Button>
          </HStack>
        </Pressable>

        {/* For not paid order */}
        <Pressable>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems="center"
            py={5}
            px={2}
          >
            <Text fontSize={11} color={Colors.blue} isTruncated>
              9872392432
            </Text>
            <Text fontSize={12} bold color={Colors.black} isTruncated>
              NOT PAID
            </Text>
            <Text fontSize={12} italic color={Colors.black} isTruncated>
              Jan 12 2024
            </Text>
            <Button
              px={7}
              py={1.5}
              rounded={50}
              bg={Colors.red}
              _text={{
                color: Colors.white
              }}
              _pressed={{
                bg: Colors.red
              }}
            >
              NPR 33
            </Button>
          </HStack>
        </Pressable>
      </ScrollView>
    </Box>
  )
}

export default Orders