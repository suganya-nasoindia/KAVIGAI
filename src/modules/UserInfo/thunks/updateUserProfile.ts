import { AppDispatch } from "../../../redux/reactstore";
import { UserInfoService } from "../../UserInfo/UserInfoService";
import { setProfile } from "../../../redux/slices/userProfileSlice";

export const updateUserProfile =
    (profileData: any) => async (dispatch: AppDispatch) => {
        try {
            const response = await UserInfoService.updateUser(profileData);

            if (response?.statusCode === 200 || response?.success === true) {
                dispatch(setProfile(profileData));

                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    };


