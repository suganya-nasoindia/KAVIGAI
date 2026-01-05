import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import GoalTemplateCard from './GoalTemplateCard';
import { useGoalTemplateList } from './useGoalTemplateList';
import { RootState } from '../../redux/reactstore';

export default function GoalTemplateListScreen() {
  const { apiKey, accessToken, loginName } = useSelector(
    (state: RootState) => state.auth
  );

  const { filtered, loading, query, setQuery } =
    useGoalTemplateList(apiKey, accessToken, loginName);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading goal templates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by category, popularity, author"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <ScrollView>
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <GoalTemplateCard key={index} goalTemplate={item} />
          ))
        ) : (
          <Text style={styles.empty}>No goal templates found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE8C7' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  empty: { textAlign: 'center', marginTop: 20 },
});
