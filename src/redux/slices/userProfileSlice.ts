import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ---------------- TYPES ---------------- */

type Address = {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string | number;
};

type MentorInfo = {
  mentorTitle: string;
  mentorDescription: string;
  mentoringField: string;
  mentorTags: string[],
  price: 'Free' | 'Paid';
  amount: number;
  ratings: number;
  discount: number;
  currencyType: string;
  availability: string;
};


type Service = {
  serviceID: number;
  serviceName?: string;
  description?: string;
  isActive: boolean; // 👈 REQUIRED
};

type UserProfileState = {
  /* BASIC PROFILE (UNCHANGED) */
  userID: number | null;
  loginName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: string;
  location: string;
  address: Address;
  education: string;
  academy: string;
  photo: null | string;
  profession: string;
  experience: string;
  company: string;
  nonProfit: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
  language: string;
  hobbies: string;
  interests: string;
  awardsRecognitions: string;
  about: string;

  /* NEW SEPARATED BLOCKS */
  mentorInfo: MentorInfo;
  services: any[];
  currentGoals: any[];
  myMentors: any[];
  myMentees: any[];
};

/* ---------------- INITIAL STATE ---------------- */

const initialState: UserProfileState = {
  userID: null,
  loginName: '',
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  gender: '',
  location: '',
  address: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  },
  photo: null,
  education: '',
  academy: '',
  profession: '',
  experience: '',
  company: '',
  nonProfit: '',
  linkedin: '',
  facebook: '',
  twitter: '',
  youtube: '',
  instagram: '',
  language: '',
  hobbies: '',
  interests: '',
  awardsRecognitions: '',
  about: '',

  /* NEW */
  mentorInfo: {
    mentorTitle: '',
    mentorDescription: '',
    mentoringField: '',
    mentorTags: [],
    price: 'Free',
    amount: 0,
    ratings: 0,
    discount: 0,
    currencyType: 'INR',
    availability: '',
  },

  services: [],
  currentGoals: [],
  myMentors: [],
  myMentees: [],
};

/* ---------------- SLICE ---------------- */

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    toggleServiceStatus: (
      state,
      action: PayloadAction<{ serviceID: number; isActive: boolean }>
    ) => {
      const { serviceID, isActive } = action.payload;
      const service = state.services.find(
        s => s.serviceID === serviceID
      );
      if (service) {
        service.isActive = isActive;
      }
    },
  
    setUpdatedServices: (
      state,
      action: PayloadAction<
        { serviceID: number; serviceStatus: boolean }[]
      >
    ) => {
      state.services = state.services.map(service => {
        const updated = action.payload.find(
          s => s.serviceID === service.serviceID
        );
    
        return updated
          ? { ...service, isActive: updated.serviceStatus }
          : service;
      });
    },
    
    /* ---------------- PROFILE (UNCHANGED) ---------------- */
    setProfile: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      return {
        ...state,
        ...action.payload,
        mentorInfo: state.mentorInfo,
        address: {
          ...state.address,
          ...action.payload.address,
        },
      };
    },

    updateProfileField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;

      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        (state as any)[parent][child] = value;
      } else {
        (state as any)[field] = value;
      }
    },

    /* ---------------- MENTOR INFO ---------------- */
    setMentorInfo(state, action: PayloadAction<MentorInfo>) {
      state.mentorInfo =
      {
        ...state.mentorInfo,
        ...action.payload,
      }
    },

    updateMentorField(
      state,
      action: PayloadAction<{ field: keyof MentorInfo; value: any }>
    ) {
      state.mentorInfo[action.payload.field as keyof MentorInfo] = action.payload.value;
    },

    /* ---------------- SERVICES ---------------- */
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },

    /* ---------------- CURRENT GOALS ---------------- */
    setCurrentGoals(state, action: PayloadAction<any[]>) {
      state.currentGoals = action.payload;
    },

    /* ---------------- MY MENTORS ---------------- */
    setMyMentors(state, action: PayloadAction<any[]>) {
      state.myMentors = action.payload;
    },

    /* ---------------- MY MENTEES ---------------- */
    setMyMentees(state, action: PayloadAction<any[]>) {
      state.myMentees = action.payload;
    },

    resetUserProfile: () => initialState,
  },
});

/* ---------------- EXPORTS ---------------- */

export const {
  setProfile,
  updateProfileField,

  setMentorInfo,
  updateMentorField,

  setServices,
  setCurrentGoals,
  setMyMentors,
  setMyMentees,
  toggleServiceStatus,setUpdatedServices,
  resetUserProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
