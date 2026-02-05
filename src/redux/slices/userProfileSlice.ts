import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

type Address = {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string | number;
};

type MentorInfo = {
  mentorTitle?: string;
  mentorDescription?: string;
  mentoringField?: string;
  mentorTags?: string[];
  price?: "Free" | "Paid";
  amount?: number;
  ratings?: number;
  discount?: number;
  currencyType?: string;
  availability?: string;
};

type Service = {
  serviceID: number;
  serviceName?: string;
  serviceType?: string;
  description?: string;
  isActive: boolean;
};

type UserProfileState = {
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
  photo: string | null;
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

  mentorInfo: MentorInfo;
  services: Service[];
  currentGoals: any[];
  myMentors: any[];
  myMentees: any[];
};

/* ================= INITIAL STATE ================= */

const initialState: UserProfileState = {
  userID: null,
  loginName: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  gender: "",
  location: "",
  address: {},
  education: "",
  academy: "",
  photo: null,
  profession: "",
  experience: "",
  company: "",
  nonProfit: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  youtube: "",
  instagram: "",
  language: "",
  hobbies: "",
  interests: "",
  awardsRecognitions: "",
  about: "",

  mentorInfo: {},
  services: [],
  currentGoals: [],
  myMentors: [],
  myMentees: [],
};

/* ================= SLICE ================= */

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    /* ---------- MAIN PROFILE (FROM API) ---------- */
    setProfile: (state, action: PayloadAction<any>) => {
      const user = action.payload?.user;
      if (!user) return;

      state.userID = user.userID ?? null;
      state.loginName = user.loginName ?? "";
      state.firstName = user.firstName ?? "";
      state.lastName = user.lastName ?? "";
      state.mobile = user.mobile ?? "";
      state.email = user.email ?? "";
      state.gender = user.gender ?? "";
      state.location = user.location ?? "";
      state.education = user.education ?? "";
      state.academy = user.academy ?? "";
      state.profession = user.profession ?? "";
      state.experience = user.experience ?? "";
      state.company = user.company ?? "";
      state.nonProfit = user.nonProfit ?? "";
      state.linkedin = user.linkedin ?? "";
      state.facebook = user.facebook ?? "";
      state.twitter = user.twitter ?? "";
      state.youtube = user.youtube ?? "";
      state.instagram = user.instagram ?? "";
      state.language = user.language ?? "";
      state.hobbies = user.hobbies ?? "";
      state.interests = user.interests ?? "";
      state.awardsRecognitions = user.awardsRecognitions ?? "";
      state.about = user.about ?? "";
      state.photo = user.photo ?? null;

      state.address = {
        ...state.address,
        ...(user.address ?? {}),
      };
    },

    /* ---------- MENTOR ---------- */
    setMentorInfo: (state, action: PayloadAction<MentorInfo>) => {
      state.mentorInfo = {
        ...state.mentorInfo,
        ...action.payload,
      };
    },

    /* ---------- SERVICES ---------- */
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },

    toggleServiceStatus: (
      state,
      action: PayloadAction<{ serviceID: number; isActive: boolean }>
    ) => {
      const service = state.services.find(
        s => s.serviceID === action.payload.serviceID
      );
      if (service) {
        service.isActive = action.payload.isActive;
      }
    },

    /* ---------- GOALS ---------- */
    setCurrentGoals: (state, action: PayloadAction<any[]>) => {
      state.currentGoals = action.payload;
    },

    /* ---------- MENTORS / MENTEES ---------- */
    setMyMentors: (state, action: PayloadAction<any[]>) => {
      state.myMentors = action.payload;
    },

    setMyMentees: (state, action: PayloadAction<any[]>) => {
      state.myMentees = action.payload;
    },

    /* ---------- RESET ---------- */
    resetUserProfile: () => initialState,
  },
});

/* ================= EXPORTS ================= */

export const {
  setProfile,
  setMentorInfo,
  setServices,
  toggleServiceStatus,
  setCurrentGoals,
  setMyMentors,
  setMyMentees,
  resetUserProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
