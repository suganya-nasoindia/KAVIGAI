import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from '../../components/Constants';

/* =========================
   MODEL
========================= */
interface HelpModel {
  url: string;
}

/* =========================
   CONTROLLER
========================= */
const useHelpController = () => {
  const model: HelpModel = {
    url: Constants.HELP_URL,
  };

  return {
    model,
  };
};

/* =========================
   VIEW
========================= */
const HelpScreen: React.FC = () => {
  const { model } = useHelpController();

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

export default HelpScreen;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
