import React, { useEffect, useState } from 'react';
import { Box, Button, CheckIcon, FormControl, Heading, Select, Text, TextArea, VStack, View } from 'native-base';
import Colors from '../../colors';
import Rating from './Rating';
import ReviewMessage from '../../Message/ReviewMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../apiconfig';

const ReviewProduct = ({ productId }) => {
  const [rating, setRating] = useState("");
  const [userData, setUserData] = useState({});
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch user data from AsyncStorage
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

  // Fetch review data
  const fetchReviewData = async () => {
    try {
      const response = await fetch(`${apiUrl}/getReview/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch rating and review data");
      }
      const result = await response.json();
      console.log(result);
      setReviews(result.reviews);
    } catch (error) {
      console.error(error.message);
      setReviews([]);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      // Validate if either rating or review is filled
      if (!rating && !review) {
        alert('Please fill either the rating or the review.');
        return;
      }
      const response = await fetch(`${apiUrl}/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userData._id,
          userName: userData.name,
          productID: productId,
          rate: rating,
          review: review
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit review. Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      // Reset form state after successful submission
      setRating("");
      setReview("");

      // Fetch updated reviews data
      fetchReviewData();
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  // Fetch user data and reviews data on component mount or when product ID changes
  useEffect(() => {
    fetchReviewData();
  }, [productId]);

  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2} marginTop={2}>
        RATE & REVIEW OF PRODUCT:
      </Heading>

      {reviews.length === 0 && (
        <ReviewMessage
          color={Colors.white}
          bg={Colors.deepGray}
          bold
          children={"No review for this Product"}
        />
      )}

      {reviews.map((review, index) => (
        <Box key={index} p={3} bg={Colors.deepGray} mt={5} rounded={5}>
          <Heading fontSize={15} color={Colors.black}>
            {review.userName}
          </Heading>
          <Rating value={review.rate} />
          <Text my={2} fontSize={14}>
            At:  {new Date(review.date).toLocaleString()}
          </Text>
          <ReviewMessage
            color={Colors.black}
            bg={Colors.white}
            size={10}
            children={review ? review.review : "No review available"}
          />
        </Box>
      ))}

      {/* Give your review */}
      <Box mt={6}>
        <Heading fontSize={15} bold mb={4} marginTop={2}>
          GIVE YOUR REVIEW FOR PRODUCT:
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "14",
                fontWeight: "bold"
              }}
            >
              Rate this product
            </FormControl.Label>

            <Select
              bg={Colors.white}
              borderWidth={0}
              py={4}
              placeholder='Choose rate'
              _selectedItem={{
                bg: Colors.white,
                endIcon: <CheckIcon size={3} />,
                justifyContent: "center",
                alignItems: "center"
              }}
              selectedValue={rating}
              onValueChange={(e) => setRating(e)}
              enabled={false} // Disable user interaction
            >
              <Select.Item label='0.5' value='0.5' />
              <Select.Item label='1 - Poor' value='1' />
              <Select.Item label='1.5' value='1.5' />
              <Select.Item label='2 - Fair' value='2' />
              <Select.Item label='2.5' value='2' />
              <Select.Item label='3 - Good' value='3' />
              <Select.Item label='3.5' value='3.5' />
              <Select.Item label='4 - Very Good' value='4' />
              <Select.Item label='4.5' value='4.5' />
              <Select.Item label='5 - Excellent' value='5' />
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "14",
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
              bg={Colors.white}
              py={4}
              value={review}
              onChangeText={(review) => setReview(review)} // Update review state on change
            />
          </FormControl>
          <Button
            onPress={handleReviewSubmit}
            bg={Colors.main}
            color={Colors.white}
            mt={2}
            borderRadius={50}
            bold>
            SUBMIT REVIEW
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
export default ReviewProduct;