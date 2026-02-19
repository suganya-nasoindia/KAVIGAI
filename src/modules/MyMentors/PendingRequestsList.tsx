import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import MentorCard from './MentorView';
import { getMentorRequestList } from './MyMentorController';
import { PendingRequestItem } from './PendingRequestsModel';

/* 🔹 Define RootState properly (adjust if you already have one) */


const PendingRequestsList: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequestItem[]>([]);
  const [filteredPendingRequests, setFilteredPendingRequests] = useState<PendingRequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    const PendingMentors = async () => {
      try {
         const PendingMentorData = await getMentorRequestList();
         console.log('Fetched Pending Requests:', PendingMentorData);
        setPendingRequests(PendingMentorData);
        setFilteredPendingRequests(PendingMentorData);
      } catch (error) {
        console.error('Error loading mentor requests:', error);
      } finally {
        setLoading(false);
      }
    };

    PendingMentors();
  }, []);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const result = pendingRequests.filter((mentor) => {
      return (
        mentor?.firstName?.toLowerCase().includes(lowerQuery) ||
        mentor?.lastName?.toLowerCase().includes(lowerQuery) ||

        mentor?.mentorTitle?.toLowerCase().includes(lowerQuery) ||
        (Array.isArray(mentor?.mentorTags) &&
          mentor.mentorTags.some((tag: string) =>
            tag?.toLowerCase().includes(lowerQuery)
          ))
      );
    });

    setFilteredPendingRequests(result);
  }, [query, pendingRequests]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading Requests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name, title, or tag"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <ScrollView>
        {filteredPendingRequests.length > 0 ? (
          filteredPendingRequests.map((mentor) => (
            <MentorCard
              key={mentor.mentorID?.toString()}
              mentor={mentor}
            />
          ))
        ) : (
          <Text style={styles.noResult}>
            No Pending Requests found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PendingRequestsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE8C7',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
