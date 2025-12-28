import React, { useEffect, useState } from 'react';
import { Snackbar } from "react-native-paper";


import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/reactstore';
import {
  loadUserProfile,
  updateUserProfileField,
  submitUserProfileUpdate,
} from './UserInfoController';



/* ---------- Reusable Input ---------- */
interface InputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value ?? ''}
      onChangeText={onChange}
      placeholder={label}
    />
  </View>
);


/* ---------- Section Header ---------- */
const SectionHeader = ({
  title,
  toggle,
}: {
  title: string;
  toggle: () => void;
}) => (
  <TouchableOpacity onPress={toggle}>
    <ImageBackground
      source={require('../../../../assets/profile_strip.png')}
      style={styles.card}
    >
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

/* ---------- View ---------- */
const UserInfoSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [updating, setUpdating] = React.useState(false);

  const profile = useSelector((state: RootState) => state.userProfile);

  const [open, setOpen] = useState({
    personal: false,
    address: false,
    education: false,
    social: false,
    extras: false,
    about: false,
  });

  const [snackVisible, setSnackVisible] = useState(false);

  useEffect(() => {
    console.log("🧠 Redux Profile:", profile);
  }, [profile]);

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  const change = (field: string, value: string) => {
    dispatch(updateUserProfileField({ field, value }));
  };

  const onUpdateProfile = async () => {
    if (updating) return; // UI guard

    setUpdating(true);
  
    try {
      await dispatch(submitUserProfileUpdate(profile));
    } finally {
      setUpdating(false);
    }
    // const success = await dispatch(submitUserProfileUpdate(profile)); // Call the function directly
    // if (success) {
    //   setSnackVisible(true);
    // }
    Alert.alert('Success', 'User info saved!');
    
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* PERSONAL */}
      <SectionHeader title="PERSONAL" toggle={() => setOpen(p => ({ ...p, personal: !p.personal }))} />
      {open.personal && (
        <>
          <Input label="First Name" value={profile.firstName} onChange={v => change('firstName', v)} />
          <Input label="Last Name" value={profile.lastName} onChange={v => change('lastName', v)} />
          <Input label="Mobile" value={profile.mobile} onChange={v => change('mobile', v)} />
          <Input label="Email" value={profile.email} onChange={v => change('email', v)} />
          <Input label="Gender" value={profile.gender} onChange={v => change('gender', v)} />
        </>
      )}

      {/* ADDRESS */}
      <SectionHeader title="ADDRESS" toggle={() => setOpen(p => ({ ...p, address: !p.address }))} />
      {open.address && (
        <>
          <Input label="Location" value={profile.location} onChange={v => change('location', v)} />
          <Input label="Street 1" value={profile.address?.street1} onChange={v => change('address.street1', v)} />
          <Input label="Street 2" value={profile.address?.street2} onChange={v => change('address.street2', v)} />
          <Input label="City" value={profile.address?.city} onChange={v => change('address.city', v)} />
          <Input label="State" value={profile.address?.state} onChange={v => change('address.state', v)} />
          <Input label="Country" value={profile.address?.country} onChange={v => change('address.country', v)} />
          <Input label="Zipcode" value={String(profile.address?.zipcode ?? '')} onChange={v => change('address.zipcode', v)} />
        </>
      )}

      {/* EDUCATION */}
      <SectionHeader title="EDUCATION" toggle={() => setOpen(p => ({ ...p, education: !p.education }))} />
      {open.education && (
        <>
          <Input label="Education" value={profile.education} onChange={v => change('education', v)} />
          <Input label="Academy" value={profile.academy} onChange={v => change('academy', v)} />
          <Input label="Profession" value={profile.profession} onChange={v => change('profession', v)} />
          <Input label="Experience" value={profile.experience} onChange={v => change('experience', v)} />
          <Input label="Company" value={profile.company} onChange={v => change('company', v)} />
          <Input label="Non Profit" value={profile.nonProfit} onChange={v => change('nonProfit', v)} />
        </>
      )}

      {/* SOCIAL */}
      <SectionHeader title="SOCIAL NETWORKS" toggle={() => setOpen(p => ({ ...p, social: !p.social }))} />
      {open.social && (
        <>
          <Input label="LinkedIn" value={profile.linkedin} onChange={v => change('linkedin', v)} />
          <Input label="Facebook" value={profile.facebook} onChange={v => change('facebook', v)} />
          <Input label="Twitter" value={profile.twitter} onChange={v => change('twitter', v)} />
          <Input label="YouTube" value={profile.youtube} onChange={v => change('youtube', v)} />
          <Input label="Instagram" value={profile.instagram} onChange={v => change('instagram', v)} />
        </>
      )}

      {/* EXTRAS */}
      <SectionHeader title="LANGUAGES & HOBBIES" toggle={() => setOpen(p => ({ ...p, extras: !p.extras }))} />
      {open.extras && (
        <>
          <Input label="Language" value={profile.language} onChange={v => change('language', v)} />
          <Input label="Hobbies" value={profile.hobbies} onChange={v => change('hobbies', v)} />
          <Input label="Interests" value={profile.interests} onChange={v => change('interests', v)} />
        </>
      )}

      {/* ABOUT */}
      <SectionHeader title="AWARDS & ABOUT ME" toggle={() => setOpen(p => ({ ...p, about: !p.about }))} />
      {open.about && (
        <>
          <Input label="Awards" value={profile.awards} onChange={v => change('awards', v)} />
          <Input label="About Me" value={profile.about} onChange={v => change('about', v)} />
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title={updating?"Update Inprogress":"Update Profile" }
        onPress={onUpdateProfile} disabled = {updating} />
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
      >
        Profile updated successfully ✅
      </Snackbar>
    </ScrollView>
  );
};

export default UserInfoSection;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#FFE8C7' },
  card: { height: 70, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  sectionHeaderText: { fontSize: 16, fontWeight: 'bold' },
  fieldContainer: { marginBottom: 14 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
  buttonContainer: { marginVertical: 30 },
});
