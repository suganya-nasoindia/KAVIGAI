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
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      console.log("🟡 submitUserProfileUpdate started");

      const profile = getState().userProfile;
      console.log("🟡 Profile:", profile);

      if (!profile?.userID) {
        console.warn("⚠️ userID missing");
        return;
      }
      console.log("📤 Submitting profile:", profile);

      const payload = {
        info: {
          type: 'mobile',
          actionType: 'update',
          platformType: 'mobile',
          outputType: 'json',
        },
        data: {
          content: {
            userID: profile.userID,

            loginName: profile.loginName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            mobile: profile.mobile,
            gender: profile.gender,
            photo: profile.photo, // ✅ FIX

            education: profile.education,
            academicInstitutions: profile.academy,
            profession: profile.profession,
            experience: profile.experience,
            companyInformation: profile.company,
            nonProfit: profile.nonProfit,

            interests: profile.interests,
            hobbies: profile.hobbies,
            languages: profile.language,

            linkedin: profile.linkedin,
            twitter: profile.twitter,
            facebook: profile.facebook,
            instagram: profile.instagram,
            youtube: profile.youtube,

            awardsRecognitions: profile.awards,
            about: profile.about, // ✅ FIX

            location: profile.location,
            address: {
              addressID: profile.address?.addressID,
              street1: profile.address?.street1,
              street2: profile.address?.street2,
              city: profile.address?.city,
              state: profile.address?.state,
              country: profile.address?.country,
              zipcode: profile.address?.zipcode,
            },

            isPaid: profile.isPaid,
            subscriptionPlanID: profile.subscriptionPlanID,
            subscriptionType: profile.subscriptionType,
            userOrderID: profile.userOrderID,
            userPaymentID: profile.userPaymentID,
          },
        },
      };
      console.log("🟢 Payload ready");
      console.log("🔍 updateUser fn:", UserInfoService.updateUser);
      console.log("typeof updateUser:", typeof UserInfoService.updateUser);

      await UserInfoService.updateUser(payload);
      console.log("✅ updateUser API SUCCESS");

      // 🔥 Backend doesn't return updated data → must refetch
      await dispatch(loadUserProfile());
    } catch (error) {
      console.error("❌ submitUserProfileUpdate failed", error);
    }
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
    addressID: apiProfile.address?.addressID ?? null, // 🔥 FIX
    street1: apiProfile.address?.street1 ?? "",
    street2: apiProfile.address?.street2 ?? "",
    city: apiProfile.address?.city ?? "",
    state: apiProfile.address?.state ?? "",
    country: apiProfile.address?.country ?? "",
    zipcode: apiProfile.address?.zipcode ?? "",
  },

  education: apiProfile.education ?? "",
  academy: apiProfile.academicInstitutions ?? "", // 🔥 FIX
  profession: apiProfile.profession ?? "",
  experience: apiProfile.experience ?? "",
  company: apiProfile.companyInformation ?? "", // 🔥 FIX
  nonProfit: apiProfile.nonProfit ?? "",

  linkedin: apiProfile.linkedin ?? "",
  facebook: apiProfile.facebook ?? "",
  twitter: apiProfile.twitter ?? "",
  youtube: apiProfile.youtube ?? "",
  instagram: apiProfile.instagram ?? "",

  language: apiProfile.languages ?? "",
  hobbies: apiProfile.hobbies ?? "",
  interests: apiProfile.interests ?? "",
  awards: apiProfile.awardsRecognitions ?? "", // 🔥 FIX
  about: apiProfile.about ?? "",
});
