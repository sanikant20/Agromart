import React, { useState, useEffect } from 'react';
import { Box, HStack, Input, Pressable, Text, Spinner } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../colors';
import { useCartContext } from '../Cart/CartContext';

function HomeSearch({ onSearchChange }) {
    const { cartItemCount } = useCartContext();
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    // Handle search input change
    const handleSearchChange = (value) => {
        setSearchText(value);
        onSearchChange(value);
    };

    // Reset searchText when component unmounts
    useEffect(() => {
        return () => {
            setSearchText('');
        };
    }, []);

    return (
        <HStack space={3} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop>
            <Input
                placeholder="Search..."
                value={searchText} // Set value of input to searchText
                onChangeText={handleSearchChange}
                w="85%"
                bg={Colors.white}
                type="search"
                variant="filled"
                h={12}
                borderWidth={0}
                keyboardType="default"
                autoCapitalize="none"
                clearButtonMode="while-editing"
                _focus={{
                    bg: Colors.white,
                }}
            />
            <Pressable onPress={() => navigation.navigate('Cart')}>
                <FontAwesome5 name="shopping-basket" size={33} color={Colors.white} />
                <Box px={1} rounded="full" position="absolute" top={-13} bg={Colors.orange}>
                    <Text
                        _text={{
                            color: Colors.white,
                            fontSize: 14,
                        }}
                    >
                        {cartItemCount > 0 ? cartItemCount : 0}
                    </Text>
                </Box>
            </Pressable>
        </HStack>
    );
}

export default HomeSearch;
