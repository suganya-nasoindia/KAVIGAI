import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface HeaderImageProps {
  imageUrl?: string;
  defaultIcon: any; // Replace 'any' with the appropriate type for your defaultIcon
}

const HeaderImage: React.FC<HeaderImageProps> = ({ imageUrl, defaultIcon }) => {
  return (
    <Image
      source={imageUrl ? { uri: imageUrl } : defaultIcon}
      style={styles.image}
      resizeMode="contain"
    />
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 144,
    marginTop: 12,
  },
});
