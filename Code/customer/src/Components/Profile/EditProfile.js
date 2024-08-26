import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Button, FormControl, Input, Text, ScrollView, Spinner, VStack } from 'native-base';
import Colors from '../../colors';
import apiUrl from '../../../apiconfig';

const Inputs = [
    {
        label: "Name",
        key: "name"
    },
    {
        label: "Location",
        key: "location"
    }
];

const EditProfile = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editableFields, setEditableFields] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user details from AsyncStorage
                const storedUserData = await AsyncStorage.getItem('userDetails');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                    // Initialize editableFields state with all fields initially set to false
                    const fields = {};
                    Inputs.forEach(input => {
                        fields[input.key] = false;
                    });
                    setEditableFields(fields);
                } else {
                    console.error('User data not found in AsyncStorage');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch API for handling to update profile details
    const HandleUpdateProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/editUserProfile/${userData._id}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                alert("Profile Updated")
                navigation.navigate("Profile")
            } else {
                console.error("Error in updating.");
                alert("Error in update");
            }

        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Network error. Please check your internet connection.", error);
            } else {
                console.error("Error updating admin profile:", error.message);
            }
        }
    }

    // Cancel to update profile, navigate to profile page
    const HandleCancleUpdateProfile = async () => {
        navigation.navigate("Profile")
    }

    // change the profile input field with the updated details
    const handleInputChange = (key, value) => {
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    // Render the input fields
    const renderInputField = (input) => {
        return (
            <FormControl key={input.label}>
                <FormControl.Label
                    _text={{
                        fontSize: "16px",
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
                    value={userData ? userData[input.key] : ''}
                    onChangeText={(text) => handleInputChange(input.key, text)}
                    editable={editableFields[input.key]} // Set the editable property based on state
                />
            </FormControl>
        );
    };

    // Loader
    if (loading) {
        return (
            <Box h="full" bg={Colors.white} px={5} justifyContent="center" alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading user data" color={Colors.main} />
                <Text mt={2}>Loading user data...</Text>
            </Box>
        );
    }

    return (
        <Box h="full" bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                    {Inputs.map(renderInputField)}
                    <Button
                        onPress={HandleUpdateProfile}
                        bg={Colors.main} color={Colors.white}
                        borderRadius="50px"
                    >
                        Update
                    </Button>
                    <Button
                        onPress={HandleCancleUpdateProfile}
                        bg={Colors.red} color={Colors.white}
                        borderRadius="50px"
                    >
                        Cancel
                    </Button>
                </VStack>
            </ScrollView>
        </Box>
    );
}

export default EditProfile;
