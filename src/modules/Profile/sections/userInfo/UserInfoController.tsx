import { AppDispatch, RootState } from "../../../../redux/reactstore";
import {
  setProfile,
  updateProfileField,
} from "../../../../redux/slices/userProfileSlice";
import { UserInfoService } from "../../../UserInfo/UserInfoService";

/* ---------------- LOAD USER PROFILE ---------------- */
export const loadUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    const response = await UserInfoService.fetchUserInfo();
    console.log("📥 Fetched user profile:", response?.data);

    const profileFromApi =
      response?.data?.data?.content?.[0]?.user;
    console.log("📥 profileFromApi:", profileFromApi);
    if (!profileFromApi) {
      console.warn("⚠️ Profile missing in API response");
      return;
    }

    dispatch(setProfile(mapApiProfileToStore(profileFromApi)));
  } catch (error) {
    console.error("❌ loadUserProfile failed", error);
  }
};

/* ---------------- UPDATE FIELD (SIMPLE & SAFE) ---------------- */
export const updateUserProfileField =
  ({ field, value }: { field: string; value: string }) =>
    (dispatch: AppDispatch) => {
      dispatch(updateProfileField({ field, value }));
    };

/* ---------------- SUBMIT PROFILE UPDATE ---------------- */
export const submitUserProfileUpdate =
  () => async (_dispatch: AppDispatch, getState: () => RootState) => {
    const profile = getState().userProfile;

    console.log("📤 Submitting profile:", profile);

    // 🔜 Uncomment when API is ready
    // await UserInfoService.updateUserInfo({
    //   content: profile,
    // });
  };

/* ---------------- API → STORE MAPPER ---------------- */
const mapApiProfileToStore = (apiProfile: any) => ({
  userID: apiProfile.userID ?? null,
  loginName: apiProfile.loginName ?? "",

  firstName: apiProfile.firstName ?? "",
  lastName: apiProfile.lastName ?? "",
  mobile: apiProfile.mobile ?? "",
  email: apiProfile.email ?? "",
  gender: apiProfile.gender ?? "",
  location: apiProfile.location ?? "",

  address: {
    street1: apiProfile.address?.street1 ?? "",
    street2: apiProfile.address?.street2 ?? "",
    city: apiProfile.address?.city ?? "",
    state: apiProfile.address?.state ?? "",
    country: apiProfile.address?.country ?? "",
    zipcode: apiProfile.address?.zipcode ?? "",
  },

  education: apiProfile.education ?? "",
  academy: apiProfile.academy ?? "",
  profession: apiProfile.profession ?? "",
  experience: apiProfile.experience ?? "",
  company: apiProfile.company ?? "",
  nonProfit: apiProfile.nonProfit ?? "",

  linkedin: apiProfile.linkedin ?? "",
  facebook: apiProfile.facebook ?? "",
  twitter: apiProfile.twitter ?? "",
  youtube: apiProfile.youtube ?? "",
  instagram: apiProfile.instagram ?? "",

  language: apiProfile.language ?? "",
  hobbies: apiProfile.hobbies ?? "",
  interests: apiProfile.interests ?? "",
  awards: apiProfile.awards ?? "",
  about: apiProfile.about ?? "",
});
