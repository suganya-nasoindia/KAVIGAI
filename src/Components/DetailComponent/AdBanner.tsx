import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  visible?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : 'YOUR_PRODUCTION_AD_UNIT_ID'}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default AdBanner;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
});