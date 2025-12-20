import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServicesSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Services Offered</Text>

      <View style={styles.serviceBox}>
        <Text>✔ Career Guidance</Text>
        <Text>✔ Personal Mentorship</Text>
        <Text>✔ Exam Preparation</Text>
        <Text>✔ Skill Development</Text>
      </View>
    </View>
  );
};

export default ServicesSection;

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFECD2',
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  serviceBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});
