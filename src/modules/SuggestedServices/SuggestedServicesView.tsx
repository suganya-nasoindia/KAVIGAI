import React, { useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  Pressable,Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSuggestedServicesController } from "./SuggestedServicesController";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
import Constants  from "../../Components/Constants";



const images = {
  user: require("../../assets/user.png"),
  website: require("../../assets/website.png"),
  find_mentor: require("../../assets/find_mentor.png"),
  goal: require("../../assets/goal.png"),
  startJourney1: require("../../assets/startjourney1.png"),
  startJourney2: require("../../assets/startjourney2.png"),
};

const SuggestedServicesView = () => {
  const { dataProvider, loading, error } = useSuggestedServicesController();
  const navigation = useNavigation<any>();

  const data = dataProvider.getAllData?.() || [];

  const isNavigating = useRef(false);

  const onCardPress = (item: any) => {
    if (isNavigating.current) return;

    isNavigating.current = true;

    switch (item.type) {
      case Constants.PROFILEUPDATE:
        navigation.navigate("ProfileUpdate");
        break;
      case Constants.FINDMENTOR:
        navigation.navigate("FindMentor");
        break;
      case Constants.SETAGOAL:
        navigation.navigate("SetGoal");
        break;
      case Constants.TAKEATOUR:
        Linking.openURL(Constants.TAKE_A_TOUR_URL);
        break;
      default:
        console.warn("Unknown service type:", item.type);
    }

    setTimeout(() => {
      isNavigating.current = false;
    }, 400);
  };

  const renderItem = ({ item, index }: any) => {
    let imageSource = images.user;

    switch (item.type) {
      case Constants.PROFILEUPDATE:
        imageSource = images.user;
        break;
      case Constants.TAKEATOUR:
        imageSource = images.website;
        break;
      case Constants.FINDMENTOR:
        imageSource = images.find_mentor;
        break;
      case Constants.SETAGOAL:
        imageSource = images.goal;
        break;
    }

    const bg = index % 2 === 0 ? images.startJourney1 : images.startJourney2;

    return (
      <Pressable
        onPress={() => onCardPress(item)}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <ImageBackground source={bg} style={styles.card}>
          <View style={styles.row}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.name}</Text>
              <Text style={styles.descText}>{item.description}</Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/startjourney.png")}
        style={styles.headerImage}
      />

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 4 }}
        showsVerticalScrollIndicator={false}
      />

      <Image
        source={require("../../assets/kavigai_text_only_rectangle.png")}
        style={styles.footerLogo}
      />
    </View>
  );
};

export default SuggestedServicesView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE8C7",
  },
  headerImage: {
    width: "100%",
    height: height * 0.25,
    resizeMode: "cover",
  },
  footerLogo: {
    width: "100%",
    height: height * 0.1,
    resizeMode: "center",
  },
  card: {
    width: width * 0.98,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 4,      // ✅ 2–5dp spacing
    borderRadius: 16,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 10,
    tintColor: "white",
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#498ABF",
    marginBottom: 2,
  },
  descText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
