import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMentorInfoController } from './MentorInfoController';


const MentorInfoView = () => {
  const { form, updateField, saveMentorInfo } =
    useMentorInfoController();

  const onSave = () => {
    saveMentorInfo();
    Alert.alert('Success', 'Mentor info saved!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mentor Information</Text>

      <Text style={styles.label}>Mentor Title</Text>
      <TextInput
        style={styles.input}
        value={form.mentorTitle}
        onChangeText={text => updateField('mentorTitle', text)}
      />

      <Text style={styles.label}>Mentor Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={form.mentorDescription}
        onChangeText={text =>
          updateField('mentorDescription', text)
        }
      />

      <Text style={styles.label}>Mentoring Field</Text>
      <TextInput
        style={styles.input}
        value={form.mentoringField}
        onChangeText={text =>
          updateField('mentoringField', text)
        }
      />

      <Text style={styles.label}>Price</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={form.price}
          onValueChange={value =>
            updateField('price', value)
          }
        >
          <Picker.Item label="Free" value="Free" />
          <Picker.Item label="Paid" value="Paid" />
        </Picker>
      </View>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.amount)}
        onChangeText={text =>
          updateField('amount', Number(text) || 0)
        }
      />

      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.discount)}
        onChangeText={text =>
          updateField('discount', Number(text) || 0)
        }
      />

      <Text style={styles.label}>Currency</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={form.currencyType}
          onValueChange={value =>
            updateField('currencyType', value)
          }
        >
          <Picker.Item label="INR" value="INR" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
        </Picker>
      </View>

      <Text style={styles.label}>Availability</Text>
      <TextInput
        style={styles.input}
        value={form.availability}
        onChangeText={text =>
          updateField('availability', text)
        }
      />

      <Button title="Save" onPress={onSave} />
    </ScrollView>
  );
};

export default MentorInfoView;

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 80 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    marginTop: 4,
  },
});
