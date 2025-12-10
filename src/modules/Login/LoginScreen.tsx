import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView, ActivityIndicator, Dimensions,
  ImageBackground, Linking
} from "react-native";
import { TextInput, Provider as PaperProvider } from "react-native-paper";
import { useLoginController } from "./LoginController";
import Constants from "../../Components/Constants";

const { width, height } = Dimensions.get('window');

const LoginView = ({ navigation }: any) => {

  // Moved inside component ✔
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    username,
    password,
    loading,
    disabled,             // From controller
    setUsername,
    setPassword,
    handleLogin,
  } = useLoginController(navigation);

  const areAllFieldsFilled = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  const isButtonDisabled = disabled || !areAllFieldsFilled();

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/kavigai_with_logo_square.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* BACKGROUND IMAGE */}
        <ImageBackground
          source={require("../../assets/login_bg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.loginContainer}>

            <Text style={styles.loginTitle}>USER LOGIN</Text>

            {/* USERNAME */}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.inputWithIcon}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Image
                        source={require("../../assets/username.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    )}
                  />
                }
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                style={styles.inputWithIcon}
                value={password}
                onChangeText={setPassword}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Image
                        source={require("../../assets/password.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isButtonDisabled && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isButtonDisabled}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                  LOGIN
                </Text>
              )}
            </TouchableOpacity>

            {/* SIGNUP & FORGOT LINKS */}
            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>Signup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER LINKS */}
          <View style={styles.footerContainer}>
            <View style={styles.weblinkContainer}>
              <TouchableOpacity onPress={() => Linking.openURL(Constants.ABOUT_URL)}>
                <Text style={styles.webLinkText}>About</Text>
              </TouchableOpacity>
              <Text style={styles.separator}> | </Text>
              <TouchableOpacity onPress={() => Linking.openURL(Constants.CONTACT_URL)}>
                <Text style={styles.webLinkText}>Contact</Text>
              </TouchableOpacity>
              <Text style={styles.separator}> | </Text>
              <TouchableOpacity onPress={() => Linking.openURL(Constants.PRIVACY_POLICY_URL)}>
                <Text style={styles.webLinkText}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.separator}> | </Text>
              <TouchableOpacity onPress={() => Linking.openURL(Constants.TOS_URL)}>
                <Text style={styles.webLinkText}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.separator}> | </Text>
              <TouchableOpacity onPress={() => Linking.openURL(Constants.HELP_URL)}>
                <Text style={styles.webLinkText}>Help</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.copyrightText}>
              © Nasotech LLC, 2007–2025. All rights reserved.
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </PaperProvider>
  );
};

export default LoginView;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EBEBEB',
},
logoContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: 10,
},
logo: {
    width: width * 0.75,
    height: height * 0.4,
},
backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
},
loginContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
},
loginTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 15,
    textAlign: 'center',
},
inputWrapper: {
    marginBottom: 5,
},
inputWithIcon: {
    backgroundColor: 'transparent',
},
loginButton: {
    marginTop: 30,
    paddingHorizontal: 20, // Adjust padding for better content wrapping
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#FF8C00', // Orange color for active state
    alignSelf: 'center', // Center the button horizontally// Orange color for active state
},
buttonDisabled: {
    backgroundColor: '#FFA07A', // Lighter orange when disabled
},

footerContainer: {
    justifyContent: 'center', // Centers them horizontally
    alignItems: 'center', // Aligns text vertically
    marginTop: 10,
    backgroundColor:'#ffffff',
    opacity: 0.5,
    color: '#606060',
},
linkContainer: {
    flexDirection: 'row', // Arranges links in a row
    justifyContent: 'center', // Centers them horizontally
    alignItems: 'center',
    alignSelf:'center', // Aligns text vertically
    marginTop: 20,
    marginLeft:50,

},
weblinkContainer:{
    flexDirection: 'row', // Arranges links in a row
    justifyContent: 'center', // Centers them horizontally
    alignItems: 'center',
    alignSelf:'center', // Aligns text vertically
    marginTop: 10,
    marginLeft:5,
    marginRight:5,
},
linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
    justifyContent:'center',
    textDecorationLine: 'underline',
    paddingHorizontal: 30, // Space between links
},
webLinkText: {
    fontSize: 12,
    color: '#606060',
    fontWeight: 'bold',
    paddingHorizontal: 5, // Space between links
},
copyrightText: {
    fontSize: 12,
    color: '#606060',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    alignSelf: 'center',
},
separator: {
    fontSize: 16,
    color: '#000',
},
});
