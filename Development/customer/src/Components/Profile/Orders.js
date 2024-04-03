import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, ScrollView, Text } from 'native-base';
import Colors from '../../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native';

const Orders = () => {
  const [userData, setUserData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  // Function to fetch user data from AsyncStorage
  const fetchUserDataFromAsyncStorage = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userDetails');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log("User Email:", parsedUserData.user_email)
        setUserData(parsedUserData);
      } else {
        console.error('User data not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrderData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Fetch user data from AsyncStorage when component mounts
  useEffect(() => {
    fetchUserDataFromAsyncStorage();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://192.168.56.1:5000/api/myOrderData", {
        method: "POST",
        body: JSON.stringify({ user_email: userData.email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }
      const result = await response.json();

      console.log("Order data:", result);

      if (result.success && result.order && result.order.products) {
        setOrderData(result.order.products);
        setOrderStatus(result.order.orderStatus);
        setPaymentStatus(result.order.payment.status);
      } else {
        console.error("No order data found in the response");
      }
    } catch (error) {
      // console.error("Error fetching order data:", error.message);
      alert("Failed to fetch order data. Please refresh page.");
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);


  return (
    <Box h='full' bg={Colors.subGreen} pt={5}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Display order and payment status */}
        <Box p={2} flexDirection="row" justifyContent="space-between" alignItems="center">
  <Button
    bg={paymentStatus === 'Paid' ? 'green.400' : 'red.400'}
    _text={{ color: 'white', fontSize: 'xl' }}
    variant="ghost"
    size="md"
    mb={2}
  >
    Payment Status: {paymentStatus}
  </Button>
  <Button
    bg={orderStatus === 'delivered' ? 'green.400' : 'red.400'}
    _text={{ color: 'white', fontSize: 'xl' }}
    variant="ghost"
    size="md"
    mb={2}
  >
    Order Status: {orderStatus}
  </Button>
</Box>


        {orderData.length > 0 && (
          <Box borderWidth={1} borderColor={Colors.black} rounded="md" overflow="hidden">
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
              bg={Colors.deepGray}
              py={5}
              px={2}
              borderBottomWidth={1}
              borderColor={Colors.black}
            >

              <Text fontSize={14} bold color={Colors.black} isTruncated textAlign="center" flex={1}>
                Product Name
              </Text>
              <Text fontSize={14} bold color={Colors.black} isTruncated textAlign="center" flex={1}>
                Price
              </Text>
              <Text fontSize={14} bold color={Colors.black} isTruncated textAlign="center" flex={1}>
                Quantity
              </Text>
              <Text fontSize={14} bold color={Colors.black} isTruncated textAlign="center" flex={1}>
                Total Price
              </Text>
            </HStack>
            {orderData.map(order => (
              <HStack
                key={order._id}
                space={4}
                justifyContent="space-between"
                alignItems="center"
                py={5}
                px={2}
                borderBottomWidth={1}
                borderColor={Colors.black}
              >
                <Text fontSize={14} color={Colors.black} isTruncated textAlign="center" flex={1}>
                  {order.name}
                </Text>
                <Text fontSize={14} color={Colors.black} isTruncated textAlign="center" flex={1}>
                  Rs {order.price}
                </Text>
                <Text fontSize={14} color={Colors.black} isTruncated textAlign="center" flex={1}>
                  {order.quantity}
                </Text>
                <Text fontSize={14} color={Colors.black} isTruncated textAlign="center" flex={1}>
                  Rs {order.price * order.quantity}
                </Text>
              </HStack>
            ))}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default Orders;
