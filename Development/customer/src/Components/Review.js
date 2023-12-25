import { Box, Button, CheckIcon, FormControl, Heading, Select, Text, TextArea, VStack, View } from 'native-base'
import React, { useState } from 'react'
import Colors from '../colors'
import Rating from './Rating'
import ReviewMessage from '../Message/ReviewMessage'

export default function Review() {
    const [rating, setRating] = useState("");

    return (
        <Box my={9}>
            <Heading bold fontSize={15} mb={2}>
                VIEW RATE AND REVIEW OF THIS PRODUCT
            </Heading>

            {/* No Review */}
            <ReviewMessage
                color={Colors.white}
                bg={Colors.deepGray}
                bold
                children={"No Review"}
            />

            {/* Review */}
            <Box p={3} bg={Colors.deepGray} mt={5} rounded={5}>

                <Heading fontSize={15} color={Colors.black}>
                    Sani Kant
                </Heading>

                <Rating value={4} />

                <Text my={2} fontSize={12}>
                    Dec 12 2023
                </Text>

                {/* Rating Message */}
                <ReviewMessage
                    color={Colors.black}
                    bg={Colors.white}
                    size={10}
                    children={
                        "It Helps In Uniform Size, Attractive Shape, Luster Of Tomato. It Helps In Uniform Size, Attractive Shape, Luster Of Tomato."
                    }
                />
            </Box>



            {/* Give your review */}
            <Box mt={6}>
                <Heading fontSize={15} bold mb={4}>
                    RATE AND REVIEW THIS PRODUCT
                </Heading>
                <VStack space={6}>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12",
                                fontWeight: "bold"
                            }}
                        >
                            Rate this product
                        </FormControl.Label>
                        <Select
                            bg={Colors.subGreen}
                            borderWidth={0}
                            py={4}
                            placeholder='Choose rate'
                            _selectedItem={{
                                bg: Colors.subGreen,
                                endIcon: <CheckIcon size={3} />,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            selectedValue={rating}
                            onValueChange={(e) => setRating(e)}
                        >
                            <Select.Item label='1 - poor' value='1' />
                            <Select.Item label='2 - fair' value='2' />
                            <Select.Item label='3 - Good' value='3' />
                            <Select.Item label='4 - Very Good' value='4' />
                            <Select.Item label='5 - Excellent' value='5' />
                        </Select>

                    </FormControl>

                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12",
                                fontWeight: "bold"
                            }}
                        >
                            Write your review
                        </FormControl.Label>
                        <TextArea
                            h={24}
                            w="full"
                            placeholder='This is a good product...'
                            borderWidth={0}
                            bg={Colors.subGreen}
                            py={4}
                        />
                    </FormControl>
                    <Button
                        bg={Colors.main}
                        color={Colors.white}
                        mt={2}
                        borderRadius={50}
                        bold>
                        SUBMIT
                    </Button>

                </VStack>
            </Box>
        </Box>
    )
}


