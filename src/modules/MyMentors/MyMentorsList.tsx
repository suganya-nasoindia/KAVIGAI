import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import MentorCard from './MentorView';
import { getMentorList } from './MyMentorController';
import { MentorItem } from './MentorModel';

/* =========================
   COMPONENT
========================= */

const MyMentorList: React.FC = () => {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<MentorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  /* =========================
     LOAD DATA
  ========================== */

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const mentorData = await getMentorList();
        setMentors(mentorData);
        setFilteredMentors(mentorData);
      } catch (error) {
        console.error('Error loading mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMentors();
  }, []);

  /* =========================
     SEARCH FILTER
  ========================== */

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const result = mentors.filter((mentor) =>
      `${mentor.firstName} ${mentor.lastName}`
        .toLowerCase()
        .includes(lowerQuery) ||
      mentor.mentorTitle
        ?.toLowerCase()
        .includes(lowerQuery) ||
      mentor.mentorTags?.some((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredMentors(result);
  }, [query, mentors]);

  /* =========================
     LOADING UI
  ========================== */

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading mentors...</Text>
      </View>
    );
  }

  /* =========================
     RENDER
  ========================== */

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name, title, or tag"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={filteredMentors}
        keyExtractor={(item) => item.mentorID.toString()}
        renderItem={({ item }) => (
          <MentorCard mentor={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.noResult}>No Mentors Found</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MyMentorList;

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8C7',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
