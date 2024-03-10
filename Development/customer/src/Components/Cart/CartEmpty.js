import React from 'react';
import { Box, Center, Text, Pressable, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../colors';
import { FontAwesome } from '@expo/vector-icons';
import Buttone from '../Buttone';

const CartEmpty = () => {
    const navigation = useNavigation();

    const handleShopNow = () => {
        navigation.navigate('Main');
    };

    return (
        <Box flex={1} px={2}>
            <Center h='100%'>
                <Center w={200} h={200} bg={Colors.white} rounded="full">
                    <FontAwesome name="shopping-basket" size={64} color={Colors.blue} />
                </Center>
                <Text color={Colors.blue} bold mt={5} fontSize={16}>
                    Cart is Empty
                </Text>

                <Button
                    fontSize={16}
                    _pressed={{ bg: Colors.main }}
                    my={15}
                    w={'90%'}
                    h={'16%'}
                    bold
                    rounded={45}
                    bg={Colors.main}
                    onPress={handleShopNow}
                >
                    Shop Now
                </Button>

            </Center>
        </Box>
    );
};

export default CartEmpty;

