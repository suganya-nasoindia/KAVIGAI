import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from '../../components/Constants';

/* =========================
   MODEL
========================= */
interface PrivacyModel {
  url: string;
}

/* =========================
   CONTROLLER
========================= */
const usePrivacyController = () => {
  const model: PrivacyModel = {
    url: Constants.PRIVACY_POLICY_URL,
  };

  return {
    model,
  };
};

/* =========================
   VIEW
========================= */
const PrivacyScreen: React.FC = () => {
  const { model } = usePrivacyController();

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

export default PrivacyScreen;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
