import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserProfileState = typeof initialState;

const initialState = {
  userID: null as number | null,
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
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<Partial<UserProfileState>>) => {
      return {
        ...initialState,
        ...action.payload,
        address: {
          ...initialState.address,
          ...action.payload.address,
        },
      };
    },

    updateProfileField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;

      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        (state as any)[parent][child] = value;
      } else {
        (state as any)[field] = value;
      }
    },
  },
});

export const { setProfile, updateProfileField } = userProfileSlice.actions;
export default userProfileSlice.reducer;
