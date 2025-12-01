import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WelcomeCarouselScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Carousel</Text>
      <Button title="Next → Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
