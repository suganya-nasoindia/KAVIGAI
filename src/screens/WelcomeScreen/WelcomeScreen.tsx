// src/modules/welcome/WelcomeScreen.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

import { useTranslation } from "react-i18next";
import { WelcomeController } from "./WelcomeController";

const { width } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const controller = new WelcomeController(navigation, t);

  const parts = controller.getWelcomeMessageParts();
  const team = controller.getTeamMessageParts();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/welcomescreen_bg.png")}
        style={styles.backgroundImage}
      >
        <Image
          source={require("../../assets/kavigai_with_logo_square.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          
          {/* Welcome Message (NO nested Text!) */}
          <Text style={styles.header}>
            {parts[0]} <Text style={styles.bold}>KAVIGAI</Text> {parts[1]}{" "}
            <Text style={styles.bold}>KAVIGAI</Text> {parts[2]}
          </Text>

          <Text style={styles.header}>{t("onboardMessage")}</Text>
          <Text style={styles.header}>{t("taglineMessage")}</Text>

          <Text style={[styles.header, styles.bold]}>
            {t("allTheBestMessage")}
          </Text>

          {/* Team Message */}
          <Text style={styles.header}>
            {team[0]} <Text style={styles.bold}>KAVIGAI</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={controller.handleContinue}
        >
          <Text style={styles.continueButtonText}>{t("continueBtn")}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  backgroundImage: { flex: 1 },
  image: {
    flex: 3,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
  },
  textContainer: { flex: 8, padding: 15, justifyContent: "center" },
  header: {
    margin: 5,
    fontSize: 20,
    textAlign: "center",
    color: "#606060",
    lineHeight: 30,
  },
  continueButton: {
    width: width * 0.45,
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    alignSelf: "center",
    marginBottom: 50,
  },
  continueButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    alignContent:"center",
    alignSelf:"center",
  },
  bold: { fontWeight: "bold" },
});
