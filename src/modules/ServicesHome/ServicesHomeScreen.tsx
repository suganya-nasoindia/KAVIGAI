import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedService } from '../../redux/slices/serviceSlice';

import {
  SafeAreaView,
  Image,
  ImageBackground,
  Text,Dimensions,
  View, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useServicesController } from './servicesHomeController';
import Constants from '../../Components/Constants';

type Props = NativeStackScreenProps<any>;
const { height } = Dimensions.get('window');

const ServicesHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { services, getServiceIcon } = useServicesController();
  const dispatch = useDispatch();


  const navigateToService = (type: string) => {
    console.log('Navigating to service:', type);
    switch (type) {
      case Constants.EVENT_UC:
        navigation.navigate('EventList');
        break;
      case Constants.BOOK_UC:
        navigation.navigate('BookList');
        break;
      case Constants.MEETING_UC:
        navigation.navigate('MeetingList');
        break;
      case Constants.WEBSITES_UC:
        navigation.navigate('WebsiteList');
        break;
      default:
      // alert('Coming Soon');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ImageBackground source={require('../../assets/services_bg.png')} style={styles.imageBackground}>
        <View style={styles.logocontainer}>
          <Image
            source={require('../../assets/services_orange_line.png')}
            style={styles.orangeLine}
            resizeMode="contain"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Services</Text>
            <View style={styles.underline} />
          </View>

          <Image
            source={require('../../assets/services_orange_line.png')}
            style={styles.orangeLine}
            resizeMode="contain"
          />
        </View>

        <FlatGrid
          itemDimension={120}
          spacing={15}
          data={services}
          
          renderItem={({ item }) => {
            console.log('Rendering service item:', item);
           
           return(
             <TouchableOpacity
              style={styles.card}
              onPress={() => {
                dispatch(setSelectedService(item.serviceType)); // 🔥
                navigateToService(item.serviceType);
              }}
            >

              <Image
                source={getServiceIcon(item.serviceType)}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title} numberOfLines={1}>
                {item.serviceName}
              </Text>
            </TouchableOpacity>
           );
          }}
        />
        <Image source={require('../../assets/kavigai_text_only_rectangle.png')} style={styles.footerLogo} />

      </ImageBackground>
    </SafeAreaView>
  );
};

export default ServicesHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8C7',
  },

  logocontainer: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'flex-start',
    width: '100%',
  },
  orangeLine: {
    width: '40%',
    height: 30,
  },
  titleContainer: {
    width: '20%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8737', // Replace with your color or use Colors.service_header
    fontFamily: 'sans-serif',
    marginBottom: 6,
  },
  underline: {
    height: 1,
    width: '90%',
    backgroundColor: '#FFFFFF', // Replace with app_bar_tab_selected
  },
  imageBackground: {
    flex: 1,
  },
  card: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    elevation: 3,
  },
  icon: {
    width: 75,
    height: 75,
    tintColor: '#498ABF',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    paddingTop: 15,
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLogo: {
    width: '100%',
    height: height * 0.1,
    resizeMode: 'center',
  },

});    