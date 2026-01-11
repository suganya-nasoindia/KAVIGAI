import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from '../../Components/Constants';

/* =========================
   MODEL
========================= */
interface AboutModel {
  url: string;
}

/* =========================
   CONTROLLER
========================= */
const useAboutController = () => {
  const model: AboutModel = {
    url: Constants.ABOUT_URL,
  };

  return {
    model,
  };
};

/* =========================
   VIEW
========================= */
const AboutScreen: React.FC = () => {
  const { model } = useAboutController();

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: model.url }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
      />
    </SafeAreaView>
  );
};

export default AboutScreen;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
