// ProfileView.tsx
import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';

import UserInfoSection from './sections/userInfo/UserInfoView';
import MentorInfoSection from './sections/mentorInfo/MentorInfoView';
import ServicesSection from './sections/servicesInfo/ServicesInfoView';
import ResetPasswordSection from './sections/resetPassword/resetPassword';

interface Props {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileView: React.FC<Props> = ({
  tabs,
  selectedTab,
  onTabChange,
}) => {

  const renderContent = () => {
    // return <Text>TEST OK</Text>;
    // <UserInfoSection />;
    switch (selectedTab) {
      case 'User Info': return <UserInfoSection />;
      case 'Mentor Info': return <MentorInfoSection />;
      case 'Services': return <ServicesSection />;
      case 'Reset Password': return <ResetPasswordSection />;
      default: return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/user.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require('../../assets/edit.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabSelected,
            ]}
            onPress={() => onTabChange(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

export default ProfileView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5C4',
  },
  header: {
    fontSize: 24,
    padding: 16,
    color: '#fff',
    backgroundColor: '#4688C5',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // gap: 1, // Optional for spacing between image and icon
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth:0.5,
    borderColor: '#000000',
    resizeMode: 'cover',
  },
  editIcon: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop:100,
    elevation: 3,
  },
  iconImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  tabButton: {
    backgroundColor: '#F38A3E',
    padding: 10,
    borderRadius: 10,
  },
  tabSelected: {
    backgroundColor: '#e66e00',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  section: {
    backgroundColor: '#FFECD2',
    borderRadius: 10,
    marginVertical: 6,
    padding: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});
