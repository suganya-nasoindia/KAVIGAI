import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const AddTodo = () => {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* NAME */}
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Service Name"
          multiline
        />

        {/* BEGIN & END DATE */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Begin Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="Begin Date"
              editable={false}
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>End Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="End Date"
              editable={false}
            />
          </View>
        </View>

        {/* URL */}
        <Text style={styles.label}>URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Service URL"
        />

        {/* IMAGE URL */}
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Image URL"
        />

        {/* DESCRIPTION */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Service Description"
          multiline
        />

        {/* STATUS */}
        <Text style={styles.label}>Status</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>New</Text>
        </TouchableOpacity>

        {/* GOALS BUTTON */}
        <TouchableOpacity style={styles.goalButton}>
          <Text style={styles.goalButtonText}>GOALS</Text>
        </TouchableOpacity>

        {/* GOALS LIST */}
        <FlatList
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          style={{ height: 150 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Goals</Text>
          }
          renderItem={() => null}
        />

        {/* UPDATE BUTTON */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AddTodo;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFE8C7',
    },
  
    scrollContent: {
      padding: 15,
    },
  
    label: {
      fontSize: 14,
      color: '#777',
      marginTop: 10,
    },
  
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      fontSize: 16,
      paddingVertical: 6,
      color: '#000',
    },
  
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    half: {
      width: '48%',
    },
  
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
  
    dropdown: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
  
    dropdownText: {
      fontSize: 16,
      color: '#000',
    },
  
    goalButton: {
      marginTop: 15,
      backgroundColor: '#FF8C42',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    goalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  
    emptyText: {
      textAlign: 'center',
      marginTop: 10,
      color: '#888',
    },
  
    updateButton: {
      alignSelf: 'center',
      marginTop: 15,
      paddingHorizontal: 30,
      height: 40,
      borderRadius: 6,
      backgroundColor: '#1E88E5',
      justifyContent: 'center',
    },
  
    updateText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  