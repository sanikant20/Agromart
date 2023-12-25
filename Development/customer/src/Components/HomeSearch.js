import React from 'react';
import { Box, HStack, Input, Text } from 'native-base';
import Colors from '../colors';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function HomeSearch() {
    return (
        <HStack space={3} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop>
            <Input
                placeholder="seeds, fertilizers, pesticides, ..."
                w="85%"
                bg={Colors.white}
                type="search"
                variant="filled"
                h={12}
                borderWidth={0}
                _focus={{
                    bg: Colors.white,
                }}
            />
            <Pressable ml={3}>
                <FontAwesome5 name="shopping-basket" size={24} color={Colors.white} />
                <Box px={1} rounded="full" position="absolute" top={-13} bg={Colors.red}>
                    <Text
                        _text={{
                            color: Colors.white,
                            fontSize: 11,
                        }}
                    >
                        {/* Add  text content here */}
                        5
                    </Text>
                </Box>
            </Pressable>
        </HStack>
    );
}

export default HomeSearch;
