import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from '../../Components/Constants';

/* =========================
   MODEL
========================= */
interface ContactModel {
  url: string;
}

/* =========================
   CONTROLLER
========================= */
const useContactController = () => {
  const model: ContactModel = {
    url: Constants.CONTACT_URL,
  };

  return {
    model,
  };
};

/* =========================
   VIEW
========================= */
const ContactScreen: React.FC = () => {
  const { model } = useContactController();

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

export default ContactScreen;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
