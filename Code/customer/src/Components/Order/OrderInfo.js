import { Center, Heading, Text } from 'native-base'
import React from 'react'
import Colors from '../../colors'

const OrderInfo = ({ icon, title, subTitle, success,  }) => {
    return (
        <Center bg={Colors.white} w={200} py={2} rounded={10} shadow={4} mb={5} mr={1} px={4}>
            <Center bg={Colors.main} w={60} h={60} rounded="full">
                {icon}
            </Center>
            <Heading bold fontSize={12} isTruncated mt={3} mb={2} color={Colors.black}>
                {title}
            </Heading>
            <Text fontSize={13} color={Colors.black}>
                {subTitle}
            </Text>
            <Text fontSize={13} textAlign="center" italic color={Colors.black}>
                {subTitle}
            </Text>

            {/* Status */}
            {success && (
                <Center py={2} mt={2} rounded={5} w="full" bg={Colors.blue}>
                    <Text fontSize={12} color={Colors.white}>

                    </Text>
                </Center>
            )}
        </Center>
    )
}

export default OrderInfo