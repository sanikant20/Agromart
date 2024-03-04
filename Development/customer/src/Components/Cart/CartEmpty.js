import React from 'react';
import { Box, Center, Text } from 'native-base';
import Colors from '../../colors';
import { FontAwesome } from '@expo/vector-icons';
import Buttone from '../Buttone';

const CartEmpty = () => {
    return (
        <Box flex={1} px={2}>
            <Center h='90%'>
                <Center w={200} h={200} bg={Colors.white} rounded="full">
                    <FontAwesome name="shopping-basket" size={64} color={Colors.blue} />
                </Center>
                <Text color={Colors.blue} bold mt={5} fontSize={16}>
                    Cart is Empty
                </Text>
            </Center>
            <Buttone bg={Colors.main} color={Colors.white}>
                Shop Now
            </Buttone>
        </Box>
    );
};

export default CartEmpty;
