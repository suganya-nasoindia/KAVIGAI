import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMentorInfoController } from './MentorInfoController';
import { useSelector, shallowEqual } from 'react-redux';
import type { RootState } from '../../../../redux/reactstore';

const MentorInfoView = () => {
  const mentorInfo = useSelector(
    (state: RootState) => state.userProfile.mentorInfo,
    shallowEqual
  );

  useEffect(() => {
    console.log('✅ mentorInfo changed:', mentorInfo);
  }, [mentorInfo]);

  const { form, updateField, saveMentorInfo, saving, auth } =
    useMentorInfoController();

  const onSave = async () => {
    console.log('🟢 Save button pressed');

    const result = await saveMentorInfo();

    console.log('🟢 saveMentorInfo result:', result);

    if (result?.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Error', result?.message || 'Failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Mentor Title</Text>
      <TextInput
        style={styles.input}
        value={form.mentorTitle}
        onChangeText={t => updateField('mentorTitle', t)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        value={form.mentorDescription}
        onChangeText={t => updateField('mentorDescription', t)}
      />

      <Text style={styles.label}>Mentor Tags</Text>
      <TextInput
        style={styles.input}
        value={form.mentorTags.join(', ')}
        onChangeText={t =>
          updateField(
            'mentorTags',
            t.split(',').map(v => v.trim())
          )
        }
      />

      <Text style={styles.label}>Mentoring Field</Text>
      <TextInput
        style={styles.input}
        value={form.mentoringField}
        onChangeText={t => updateField('mentoringField', t)}
      />

      <Text style={styles.label}>Price</Text>
      <Picker
        selectedValue={form.price}
        onValueChange={v => updateField('price', v)}
      >
        <Picker.Item label="Free" value="Free" />
        <Picker.Item label="Paid" value="Paid" />
      </Picker>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={[
          styles.input,
          form.price === 'Free' && styles.disabled,
        ]}
        editable={form.price === 'Paid'}
        keyboardType="numeric"
        value={String(form.amount)}
        onChangeText={t => updateField('amount', Number(t) || 0)}
      />

      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={[
          styles.input,
          form.amount === 0 && styles.disabled,
        ]}
        editable={form.amount > 0}
        keyboardType="numeric"
        value={String(form.discount)}
        onChangeText={t => updateField('discount', Number(t) || 0)}
      />

      <Text style={styles.label}>Currency</Text>
      <View style={styles.picker}>
        <Picker selectedValue={form.currencyType}
          onValueChange={value => updateField('currencyType', value)} >
          <Picker.Item label="INR" value="INR" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
        </Picker>
      </View>
      <Text style={styles.label}>Ratings</Text>
      <TextInput style={styles.input} keyboardType="numeric"
        value={String(form.ratings || '')}
        onChangeText={text => updateField('ratings', Number(text) || 0)}
        editable={false}
        selectTextOnFocus={false}
        />
      <Text style={styles.label}>Availability</Text>
      <TextInput
        style={styles.input}
        value={form.availability}
        onChangeText={t => updateField('availability', t)}
      />

      <View style={{ marginTop: 24 }}>
        <Pressable
          onPress={onSave}
          disabled={saving}
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Updating...' : 'Save'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default MentorInfoView;

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 80 },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    backgroundColor: '#ffffff', // ✅ FORCE WHITE
    color: '#000000',           // ✅ Ensure text is visible

  },
  multiline: {
    height: 80,
    backgroundColor: '#ffffff', // ✅ FORCE WHITE
    color: '#000000',           // ✅ Ensure text is visible
  },
  disabled: { backgroundColor: '#eee' },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9bbbd4',
  },
  picker: { borderWidth: 1, borderColor: '#bbb', borderRadius: 6, marginTop: 4, },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
