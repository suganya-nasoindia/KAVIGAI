// views/AvailableMentorList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList } from 'react-native';
import MentorCard from './MentorCard';
import { getAvailableMentors } from './MentorController';
import type { Mentor } from './MentorModel';
import { useNavigation } from '@react-navigation/native';

const AvailableMentorList: React.FC = () => {
  const navigation = useNavigation<any>();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadMentors = async () => {
      setLoading(true);
      const list = await getAvailableMentors();
      setMentors(list);
      setFilteredMentors(list);
      setLoading(false);
    };
    loadMentors();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFilteredMentors(
      mentors.filter(m =>
        `${m.firstName} ${m.lastName ?? ''}`.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
      )
    );
  }, [query, mentors]);

  const handleMentorPress = (mentor: Mentor) => {
    console.log('Navigating to mentor details for:', mentor);
    navigation.navigate('AvailableMentorsDetail', {
      mentor: mentor,
    });
  };
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <TextInput
        placeholder="Search mentors"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredMentors}
        keyExtractor={item => item.mentorID.toString()}
        renderItem={({ item }) =>
        (<MentorCard mentor={item}
          onPress={() => handleMentorPress(item)}

        />)}
        ListEmptyComponent={<Text>No mentors found</Text>}
      />
    </View>
  );
};

export default AvailableMentorList;
