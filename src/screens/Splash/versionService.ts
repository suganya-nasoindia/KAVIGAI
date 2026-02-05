// src/services/versionService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';

export interface VersionCheckResponse {
  forceUpdate?: boolean;
  latestVersion?: string;
  [key: string]: any;
}

export const checkAppVersion = async (
  versionCode: number,
  versionString: string,
  platform: string = 'android'
): Promise<{ success: boolean; data?: VersionCheckResponse; error?: string }> => {
  try {
    const currentDateTime = new Date().toISOString();

    // Prepare JSON payload
    const payload = {
      info: {
        actionType: 'showall',
        platformType: platform,
        action: 'showall',
        outputType: 'json',
        role: '',
        type: '',
        currentDateTime,
        currentTimezone: 'IST',
      },
      data: {
        content: {
          platformType: 'mobile',
          platformName: platform === 'ios' ? 'iOS' : 'Android',
          versionCode,
          versionString,
        },
      },
    };

    console.log(payload)
    // Make API call
    const response = await POSTMethod<VersionCheckResponse>(
      API_ENDPOINTS.VERSION_CHECK,
      payload
    );
    console.log('Version Check Response:', response);

    if (response.success) {
      // Save version info locally
      await AsyncStorage.setItem('appVersionCode', versionCode.toString());
      await AsyncStorage.setItem('appVersionString', versionString);

      console.log('📌 Saved Version Details:');
      console.log('➡️ Version Code:', versionCode);
      console.log('➡️ Version String:', versionString);

      // Confirm saved values
      const savedCode = await AsyncStorage.getItem('appVersionCode');
      const savedString = await AsyncStorage.getItem('appVersionString');

      console.log('📦 Retrieved from AsyncStorage:');
      console.log('🔹 appVersionCode:', savedCode);
      console.log('🔹 appVersionString:', savedString);
    }

    return response;
  } catch (error: any) {
    console.log('❌ Version Check Error:', error.message);
    return { success: false, error: error.message || 'Version check failed' };
  }
};
