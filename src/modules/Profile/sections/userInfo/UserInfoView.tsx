import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const UserInfoSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>User Information</Text>

      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
    </View>
  );
};

export default UserInfoSection;

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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },
});
