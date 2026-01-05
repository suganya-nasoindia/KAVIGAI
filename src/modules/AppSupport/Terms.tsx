import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from '../../components/Constants';

/* =========================
   MODEL
========================= */
interface TermsModel {
  url: string;
}

/* =========================
   CONTROLLER
========================= */
const useTermsController = () => {
  const model: TermsModel = {
    url: Constants.TOS_URL,
  };

  return {
    model,
  };
};

/* =========================
   VIEW
========================= */
const TermsScreen: React.FC = () => {
  const { model } = useTermsController();

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

export default TermsScreen;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
