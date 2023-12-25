import { Box, Button, HStack, Heading, Image, Pressable, ScrollView, Spacer, Text } from 'native-base';
import React, { useState } from 'react'
import Colors from '../colors';
import Rating from '../Components/Rating';
import NumericInput from 'react-native-numeric-input';
import Review from '../Components/Review';


function SingleProductScreen() {
  const [value, setValue] = useState(0);

  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>

        <Image source={require("../../assets/1.jpeg")}
          alt='product image'
          w='full'
          h={300}
          resizeMode='contain'
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          Agro gem red king onion
        </Heading>
        <Rating value={4} />

        <HStack space={2} alignItems="center" my={5}>

          <NumericInput
            value={value}
            totalWidth={140}
            totalHeight={40}
            iconSize={25}
            step={1}
            maxValue={15}
            minValue={0}
            borderColor={Colors.deepGray}
            rounded
            textColor={Colors.black}
            iconStyle={{ color: Colors.white }}
            rightButtonBackgroundColor={Colors.main}
            leftButtonBackgroundColor={Colors.main}
          />
          <Spacer />
          <Heading bold color={Colors.black}>$400</Heading>
        </HStack>
        <Text lineHeight={24} fontSize={12}>
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
          It Helps In Uniform Size, Attractive Shape, Luster Of Tomato
        </Text>

        <Button bg={Colors.main} color={Colors.white} mt={10} borderRadius={30} bold>
          ADD TO CART
        </Button>
        {/* Review */}
        <Review />
      </ScrollView>
    </Box>
  )
}

export default SingleProductScreen;
