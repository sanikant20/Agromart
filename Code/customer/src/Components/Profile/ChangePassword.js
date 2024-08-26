import React, { useState, useEffect } from 'react';
import { ScrollView, VStack, FormControl, Text, Input, Button, Box } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../colors';
import { useNavigation } from '@react-navigation/native';
import apiUrl from '../../../apiconfig';

const Inputs = [
    {
        label: "Old Password",
        key: "oldPassword"
    },
    {
        label: "New Password",
        key: "newPassword"
    }
];

const ChangePassword = () => {
    const [userData, setUserData] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const navigation = useNavigation();

    // Retriving the user data from AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userDetails');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                } else {
                    console.error('User data not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, []);

    // Function for Changing Password
    const handleChangePassword = async () => {
        try {
            // Validation
            if (!oldPassword) {
                setOldPasswordError("Please enter old password");
                return;
            } else {
                setOldPasswordError("");
            }
            if (!newPassword) {
                setNewPasswordError("Please enter new password");
                return;
            } else {
                setNewPasswordError("");
            }

            // Fetch api of change password
            const response = await fetch(`${apiUrl}/changeUserPassword`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userData.email, oldPassword, newPassword })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                if (response.status === 400 && errorMessage.error === 'Old password is incorrect') {
                    setOldPasswordError("Old password is incorrect");
                } else {
                    throw new Error("Failed to change password.");
                }
                return;
            }

            const result = await response.json();
            console.log("Password change result:", result);
            setOldPassword('');
            setNewPassword('');
            setOldPasswordError('');
            setNewPasswordError('');
            alert("Login Again!!")
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    // Navigate to the profile
    const handleCancelChangePassword = () => {
        navigation.navigate("Profile");
    };

    const renderInputField = (input) => {
        return (
            <FormControl key={input.label}>
                <FormControl.Label
                    _text={{
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    {input.label}
                </FormControl.Label>

                <Input
                    borderWidth={1}
                    bg={Colors.subGreen}
                    py={3}
                    color={Colors.main}
                    fontSize={20}
                    _focus={{
                        bg: Colors.subGreen,
                        borderColor: Colors.main,
                        borderWidth: 1,
                    }}
                    value={input.key === 'oldPassword' ? oldPassword : newPassword}
                    onChangeText={text => input.key === 'oldPassword' ? setOldPassword(text) : setNewPassword(text)}
                    secureTextEntry
                />

                {input.key === 'oldPassword' && oldPasswordError ? (
                    <Text style={{ color: "red" }}>{oldPasswordError}</Text>
                ) : null}
                {input.key === 'newPassword' && newPasswordError ? (
                    <Text style={{ color: "red" }}>{newPasswordError}</Text>
                ) : null}

            </FormControl>
        );
    };

    return (
        <Box flex={1} bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                    {Inputs.map(renderInputField)}
                    <Button
                        onPress={handleChangePassword}
                        bg={Colors.main} color={Colors.white}
                        borderRadius="50px"
                    >
                        Update
                    </Button>
                    <Button
                        onPress={handleCancelChangePassword}
                        bg={Colors.red} color={Colors.white}
                        borderRadius="50px"
                    >
                        Cancel
                    </Button>
                </VStack>
            </ScrollView>
        </Box>
    );
};

export default ChangePassword;
