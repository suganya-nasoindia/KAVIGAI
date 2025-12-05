import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { carouselData } from './WelcomeCarouselModal';
import { useWelcomeController } from './WelcomeController';

const { width, height } = Dimensions.get('window');

export default function WelcomeCarousel() {
  const { currentIndex, onSnapToItem,navigation} = useWelcomeController(
    carouselData,
    4000
  );

  return (
    <View style={styles.container}>
      
      {/* Carousel */}
      <Carousel
        width={width}
        height={height * 0.9}   // image + text inside image occupies 90%
        data={carouselData}
        autoPlay
        autoPlayInterval={4000}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* IMAGE */}
            <Image source={item.image} style={styles.image} resizeMode="contain" />

            {/* TEXT INSIDE WHITE CURVE */}
            <View style={styles.overlayTextContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
      <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>© Nasotech LLC, 2007-2026. All rights reserved.</Text>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ebebeb' },

  slide: {
    width: '100%',
    alignItems: 'center',
  },

  image: {
    width: width,
    height: height * 0.85,   // IMAGE TAKES 55% screen height
  },

  overlayTextContainer: {
    position: 'absolute',
    bottom: height * 0.10,   // pushes text UP inside white curve
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom:height * 0.05,
    marginBottom:10,
    paddingHorizontal: 50,
},
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F16821',
    textAlign: 'center',
    marginBottom: 8,
  },

  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4682B4',
    width: '85%',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    bottom:height * 0.10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#4682B4',
  },

  button: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 8,
    width: 120,
    marginLeft:10,
    height:45,
    alignItems: 'center',
    marginVertical: 30,
},
buttonText: {
    color: 'white',
    fontSize: 18,
},
footerContainer: {
    alignItems: 'center',
    bottom:height * 0.01,
    marginBottom:1,
    alignContent:'center',
    alignSelf:'center',
},
footerText: {
    fontSize: 12,
    color: '#4682B4',
    textAlign: 'center',
},

});
