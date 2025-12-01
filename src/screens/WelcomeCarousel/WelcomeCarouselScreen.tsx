import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { carouselData } from '../models/WelcomeCarouselModal';
import { useWelcomeController } from '../controllers/WelcomeController';

const { width } = Dimensions.get('window');

export default function WelcomeCarousel() {
  const { currentIndex, onNext, onSnapToItem } = useWelcomeController(
    carouselData,
    4000 // autoplay interval
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={500}
        data={carouselData}
        autoPlay
        autoPlayInterval={4000}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
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

      {/* Next / Start Button */}
      <TouchableOpacity onPress={onNext} style={styles.nextButton}>
        <Text style={styles.nextText}>
          {currentIndex === carouselData.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#fff' },

  slide: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  image: {
    width: width * 0.8,
    height: 250,
    marginBottom: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 15,
  },

  /* Pagination */
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#4CAF50',
  },

  /* Button */
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 25,
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
