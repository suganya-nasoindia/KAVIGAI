// src/modules/suggestedServices/SuggestedServicesView.tsx

import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { useSuggestedServicesController } from "./SuggestedServicesController";

const { width, height } = Dimensions.get("window");

const Constants = {
  PROFILEUPDATE: "PROFILEUPDATE",
  TAKEATOUR: "TAKEATOUR",
  FINDMENTOR: "FINDMENTOR",
  SETAGOAL: "SETAGOAL",
};

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

  const layoutProvider = new LayoutProvider(
    () => 0,
    (_, dim) => {
      dim.width = width;
      dim.height = 110;
    }
  );

  const rowRenderer = (_, item, index) => {
    let imageSource;

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
      default:
        imageSource = images.user;
    }

    const bg = index % 2 === 0 ? images.startJourney1 : images.startJourney2;

    return (
      <ImageBackground source={bg} style={styles.card}>
        <View style={styles.row}>
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.descText}>{item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
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

      {dataProvider.getSize() > 0 ? (
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
        />
      ) : (
        <Text style={styles.emptyText}>No services available</Text>
      )}

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
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
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
  },
  descText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
