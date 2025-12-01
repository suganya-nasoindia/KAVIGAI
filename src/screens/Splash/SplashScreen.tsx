// src/screens/SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import { checkAppVersion } from './versionService';

export default function SplashScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkVersionAndNavigate();
  }, []);

  const checkVersionAndNavigate = async () => {
    try {
      setIsLoading(true);

      const response = await checkAppVersion(192, '1.0.192');

      console.log("📥 Version API Response:", response);

      if (response.success) {
        navigation.replace('WelcomeCarousel');
      } else {
        setErrorMessage(response.error || 'Version check failed');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/splash_gradient_bg.png')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Image
          source={require('../../assets/kavigai_with_logo_square.png')}
          resizeMode="center"
          style={styles.image}
        />

        {isLoading && <ActivityIndicator size="large" color="#fff" />}

        {!isLoading && errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200 },
  errorText: { marginTop: 20, fontSize: 16, color: 'red', textAlign: 'center', paddingHorizontal: 20 },
});
