import React, { useState } from 'react';
import { View, Button, Text, Linking } from 'react-native';
import myKhaltiKey from './KhaltiKey';

const PaymentScreen = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  const initiatePayment = async () => {
    try {
      const payload = {
        // Populate payload data as needed for Khalti payment initiation
        amount: 1000 * 100,
        product_identity: '323423',
        mobile: '9812345678',
        email: 'example@example.com',
      };

      const response = await fetch('http://192.168.56.1:5000/khalti-Merchant-api', {
        method: 'POST',
        headers: {
          Authorization: myKhaltiKey
        },
        body: JSON.stringify(payload),
      }
      );
      if (!response.ok) {
        throw new Error("Error fetching payment API");
      }
      const result = await response.json();
      console.log("Payment data:", result);
      if (result) {
        setPaymentResult(result.khaltiResult);
      } else {
        console.error('Payment initiation failed:', result.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error.message);
    }
  };

  const openPaymentURL = () => {
    if (paymentResult && paymentResult.payment_url) {
      Linking.openURL(paymentResult.payment_url);
    }
  };

  return (
    // <webview source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }}>
      <View>
        <Button title="Initiate Payment" onPress={initiatePayment} />
        {paymentResult && (
          <View>
            <Text>Payment initiated successfully!</Text>
            <Button title="Pay Now" onPress={openPaymentURL} />
          </View>
        )}
      </View>
    // </webview>

  );
};

export default PaymentScreen;
