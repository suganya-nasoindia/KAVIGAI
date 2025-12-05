// src/redux/slices/userProfileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface MentorInfo {
  mentorID: number | null;
  mentorTitle: string;
  mentorDescription: string;
  mentorTags: string[];
  mentoringField: string;
  price: string;
  amount: number;
  discount: number;
  currencyType: string;
  ratings: number;
  availability: string;
  mentorStatus: number;
  education: string;
  profession: string;
  experience: string;
  linkedin: string;
  photo: string;
  location: string;
  gender: string;
}

export interface UserProfileState {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: string;
  location: string;
  education: string;
  academy: string;
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
  awards: string;
  about: string;

  address: Address;

  mentor: MentorInfo;

  subscriptionInfo: Record<string, any>;
  roles: string[];
  permissions: string[];
  services: any[];
}

// ---------------------------------------------------------
// INITIAL STATE
// ---------------------------------------------------------

const initialState: UserProfileState = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  gender: '',
  location: '',
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
  awards: '',
  about: '',

  address: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  },

  mentor: {
    mentorID: null,
    mentorTitle: '',
    mentorDescription: '',
    mentorTags: [],
    mentoringField: '',
    price: '',
    amount: 0,
    discount: 0,
    currencyType: 'INR',
    ratings: 0,
    availability: 'yes',
    mentorStatus: 0,
    education: '',
    profession: '',
    experience: '',
    linkedin: '',
    photo: '',
    location: '',
    gender: '',
  },

  subscriptionInfo: {},
  roles: [],
  permissions: [],
  services: [],
};

// ---------------------------------------------------------
// SLICE
// ---------------------------------------------------------

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // ------------------------------------------------------
    // SET FULL USER PROFILE
    // ------------------------------------------------------
    setProfile: (state, action: PayloadAction<any>) => {
      const user = action.payload;

      state.firstName = user.firstName || '';
      state.lastName = user.lastName || '';
      state.mobile = user.mobile || '';
      state.email = user.email || '';
      state.gender = user.gender || '';
      state.location = user.location || '';
      state.education = user.education || '';
      state.academy = user.academicInstitutions || '';
      state.profession = user.profession || '';
      state.experience = user.experience || '';
      state.company = user.companyInformation || '';
      state.nonProfit = user.nonProfit || '';
      state.linkedin = user.linkedin || '';
      state.facebook = user.facebook || '';
      state.twitter = user.twitter || '';
      state.youtube = user.youtube || '';
      state.instagram = user.instagram || '';
      state.language = user.languages || '';
      state.hobbies = user.hobbies || '';
      state.interests = user.interests || '';
      state.awards = user.awardsRecognitions || '';
      state.about = user.about || '';

      state.address = {
        street1: user.address?.street1 || '',
        street2: user.address?.street2 || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        country: user.address?.country || '',
        zipcode: user.address?.zipcode || '',
      };

      state.mentor = {
        ...state.mentor,
        ...user.mentor,
        mentorTags: user.mentor?.mentorTags || [],
      };

      state.subscriptionInfo = user.subscriptionInfo || {};
      state.roles = user.roles || [];
      state.permissions = user.permissions || [];
      state.services = user.services || [];
    },

    // ------------------------------------------------------
    // UPDATE ANY FIELD — supports nested updates
    // ------------------------------------------------------
    updateProfileField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;

      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        (state as any)[parent] = {
          ...(state as any)[parent],
          [child]: value,
        };
      } else {
        (state as any)[field] = value;
      }
    },

    // ------------------------------------------------------
    // RESET PROFILE
    // ------------------------------------------------------
    resetProfile: () => initialState,
  },
});

// ---------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------

export const { setProfile, updateProfileField, resetProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
