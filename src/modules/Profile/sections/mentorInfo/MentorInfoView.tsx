import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMentorInfoController } from './MentorInfoController';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/reactstore';



const MentorInfoView = () => {
  const mentorInfo = useSelector(
    (state: RootState) => state.userProfile.mentorInfo
  );

  console.log('✅ mentorInfo from redux:', mentorInfo);

  const { form, updateField, saveMentorInfo } =
    useMentorInfoController();

  const onSave = () => {
    if (!form.mentorTitle?.trim()) {
      Alert.alert('Validation', 'Mentor title is required');
      return;
    }

    if (form.price === 'Paid' && form.amount <= 0) {
      Alert.alert('Validation', 'Please enter a valid amount');
      return;
    }

    saveMentorInfo();
    Alert.alert('Success', 'Mentor info saved!');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.label}>Mentor Title</Text>
        <TextInput
          style={styles.input}
          value={form.mentorTitle}
          onChangeText={text => updateField('mentorTitle', text)}
        />

        <Text style={styles.label}>Mentor Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          multiline
          value={form.mentorDescription}
          onChangeText={text =>
            updateField('mentorDescription', text)
          }
        />

        <Text style={styles.label}>Mentor Tags</Text>
        <TextInput
          style={styles.input}
          value={form.mentorTags.join(', ')}
          onChangeText={text =>
            updateField(
              'mentorTags',
              text.split(',').map(t => t.trim())
            )
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
          style={[
            styles.input,
            form.price === 'Free' && styles.disabledInput,
          ]}
          editable={form.price === 'Paid'}
          keyboardType="numeric"
          value={String(form.amount ?? 0)}
          onChangeText={text =>
            updateField('amount', Number(text) || 0)
          }
        />

        <Text style={styles.label}>Discount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(form.discount ?? 0)}
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

        <Text style={styles.label}>Ratings</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(form.ratings || '')}
          onChangeText={text =>
            updateField('ratings', Number(text) || 0)
          }
        />

        <Text style={styles.label}>Availability</Text>
        <TextInput
          style={styles.input}
          value={form.availability}
          onChangeText={text =>
            updateField('availability', text)
          }
        />

        <View style={{ marginTop: 24 }}>
          <Button title="Save" onPress={onSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    marginTop: 4,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
});
