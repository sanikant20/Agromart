import { Center, Text } from 'native-base'
import React from 'react'

const ReviewMessage = ({ bg, color, children, size }) => {
    return (
        <Center bg={bg} p={4} rounded={5}>
            <Text color={color} fontSize={size}>{children}</Text>
        </Center>
    )
}

export default ReviewMessage;