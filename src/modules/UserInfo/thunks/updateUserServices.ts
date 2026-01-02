import { AppDispatch, RootState } from '../../../redux/reactstore';
import { setUpdatedServices } from '../../../redux/slices/userProfileSlice';
import { POSTMethod } from '../../../services/api/ApiClient';
import API_ENDPOINTS from '../../../services/api/endpoints';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserServices =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userProfile } = getState();
      const accessToken = await AsyncStorage.getItem('AUTH_TOKEN');
      const apiKey = await AsyncStorage.getItem('API_KEY');
      console.log('Access Token and API key', accessToken, apiKey);

      if (!accessToken || !apiKey) {
        console.error('❌ Missing access token or API key');
        return;
      }

    //   const headers = {
    //     'X-auth-Token': accessToken,
    //     Authorization: apiKey,
    //   };

      const content = {
        loginName: userProfile.loginName,
        userID: userProfile.userID,
        mapType: 'service',
        userServices: userProfile.services.map(service => ({
          userID: userProfile.userID,
          serviceID: service.serviceID,
          serviceStatus: Boolean(service.isActive),
        })),
      };

      const payload = {
        info: {
          type: 'mobile',
          actionType: 'updateall',
          platformType: 'mobile',
          outputType: 'json',
        },
        data: JSON.stringify({
          content, // ✅ STRINGIFIED
        }),
      };

      const response = await POSTMethod(API_ENDPOINTS.END_POINT_USER_HANDLER, payload);

      if (response?.status?.statusCode === 200) {
        dispatch(setUpdatedServices(response.data.content));
      }
    } catch (error) {
      console.error('❌ Save services failed:', error);
    }
  };
