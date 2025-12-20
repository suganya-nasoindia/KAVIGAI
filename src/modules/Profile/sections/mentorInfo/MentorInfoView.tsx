import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MentorInfoSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Mentor Information</Text>

      <TextInput style={styles.input} placeholder="Area of Expertise" />
      <TextInput style={styles.input} placeholder="Years of Experience" keyboardType="numeric" />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="About Mentor"
        multiline
      />
    </View>
  );
};

export default MentorInfoSection;

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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});
