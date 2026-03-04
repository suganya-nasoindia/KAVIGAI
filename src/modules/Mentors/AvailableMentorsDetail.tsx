import React, { useEffect, useState } from 'react';
import {
  View,Modal,
  Text, TextInput,
  ScrollView,
  StyleSheet, TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { Mentor } from './MentorModel';
import { getMentorDetailByID,updateMentorRequest } from './MentorController';
import Constants from '../../Components/Constants';

/* =========================
   TYPES
========================= */

type MentorStackParamList = {
  AvailableMentorsDetail: { mentor: Mentor };
};

type MentorDetailsRouteProp = RouteProp<
  MentorStackParamList,
  'AvailableMentorsDetail'
>;

/* =========================
   VIEW
========================= */

export default function AvailableMentorDetailsView() {
  const route = useRoute<MentorDetailsRouteProp>();
  const { mentor } = route.params;

  const [mentorData, setMentorData] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    loadMentor();
  }, []);

  const loadMentor = async () => {
    try {
      const data = await getMentorDetailByID(mentor.mentorID);
      setMentorData(data[0]);
      console.log('Loaded mentor details:', data);
    } catch (err) {
      setError('Failed to load mentor details');
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SAFE IMAGE COMPONENT
  ========================= */

  const SafeImage = ({ photo }: { photo?: string }) => {
    const isValidUrl =
      photo &&
      photo.trim() !== '' &&
      photo !== 'null';

    const source = isValidUrl
      ? { uri: encodeURI(Constants.APP_SERVER_IMAGE_UPLOAD_BASE_URL + photo) }
      : require('../../assets/mymentors.png');

    return <Image source={source} style={styles.icon} />;
  };

  /* =========================
     LOADING / ERROR STATES
  ========================= */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#498ABF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!mentorData) {
    return (
      <View style={styles.center}>
        <Text>No Mentor Found</Text>
      </View>
    );
  }


  const DetailField = ({
    label,
    value,
  }: {
    label: string;
    value?: string;
  }) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={styles.input}
          value={value || ''}
          editable={false}
          placeholder="-"
          placeholderTextColor="#999"
        />
      </View>
    );
  };


  const handleMentorRequest = async () => {
    try {
      if (
        !mentorData ||
        requestSent ||
        mentorData.userID == null ||
        mentorData.mentorID == null
      ) {
        return;
      }
      setSending(true);

      const response = await updateMentorRequest( mentorData.userID,
        mentorData.mentorID
      );
      if (response?.status?.statusCode === 200) {
        setRequestSent(true);
        setShowSuccessModal(true);
      } else {
        alert(response?.status?.message || "Failed to send request");
      }
  
    } catch (error) {
      console.log("ERROR:", error);
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
    };
  /* =========================
     MAIN UI
  ========================= */

  return (
    <View style={{ flex: 1, backgroundColor: '#FFE8C7' }}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.headerCard}>
        <SafeImage photo={mentorData.photo} />

        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.title}>
            {mentorData.firstName} {mentorData.lastName}
          </Text>
          <Text style={styles.title}>
            {mentorData.mentorTitle}
          </Text>
          <Text style={styles.title}>
            {mentorData.location}
          </Text>

          <Text style={styles.subText}>
            {mentorData.tags?.join(', ')}
          </Text>
        </View>
      </View>

      {/* DETAILS SECTION */}

      <DetailField
        label="Mentor Description"
        value={mentorData.mentorDescription}
      />

      <DetailField
        label="Mentor Tag"
        value={mentorData.mentorTags?.join(', ')}
      />

      <DetailField
        label="Subscription Type"
        value={mentorData.price ? `$${mentorData.price}` : 'Free'}
      />

      <DetailField
        label="Ratings"
        value={mentorData.ratings?.toString()}
      />

      <DetailField
        label="Availability"
        value={mentorData.availability}
      />

      <DetailField
        label="Education"
        value={mentorData.education}
      />

      <DetailField
        label="Profession"
        value={mentorData.profession}
      />

      <DetailField
        label="Experience"
        value={mentorData.experience}
      />

      <DetailField
        label="LinkedIn"
        value={mentorData.linkedin}
      />

      <TouchableOpacity
        style={[
          styles.sendButton,
          (requestSent || sending) && { backgroundColor: '#A0A0A0' }
        ]}
        onPress={handleMentorRequest}
        disabled={sending || requestSent}
      >
        {sending ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.sendButtonText}>
            {requestSent ? 'Request Sent ✓' : 'Send Mentor Request'}
          </Text>
        )}
      </TouchableOpacity>

    </ScrollView>

    <Modal
    visible={showSuccessModal}
    transparent
    animationType="fade"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Success 🎉</Text>
        <Text style={styles.modalMessage}>
          Your mentor request has been sent successfully!
        </Text>
  
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setShowSuccessModal(false)}
        >
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  </View>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8C7',
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: "left",
    alignContent: "center",
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 15,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#505050',
  },
  subText: {
    fontSize: 14,
    color: '#646464',
    marginTop: 5,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
  },
  sendButton: {
    backgroundColor: '#498ABF', // your primary color
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#505050',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#505050',
  },
  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#6A6A6A',
    marginBottom: 4,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#BCA88B',
    fontSize: 17,
    color: '#333',
    paddingVertical: 6,
  },
  errorText: {
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#498ABF',
  },
  
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#505050',
  },
  
  modalButton: {
    backgroundColor: '#498ABF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});