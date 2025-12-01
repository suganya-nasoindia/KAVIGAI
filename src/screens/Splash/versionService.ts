// src/services/versionService.ts
import ApiClient from '../../services/api/ApiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

export interface VersionCheckResponse {
  forceUpdate?: boolean;
  latestVersion?: string;
  [key: string]: any; // in case API returns extra fields
}

export const checkAppVersion = async (
  versionCode: number,
  versionString: string,
  platform: string = 'android'
): Promise<{ success: boolean; data?: VersionCheckResponse; error?: string }> => {
  try {
    const currentDateTime = new Date().toISOString();
    const formData = new FormData();

    // Append JSON as "data" field
    formData.append(
      'data',
      JSON.stringify({
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
            platformName: 'Android',
            versionCode,
            versionString,
          },
        },
      })
    );

    // Use ApiClient to POST FormData
    const response = await ApiClient.post<VersionCheckResponse>(
      API_ENDPOINTS.VERSION_CHECK,
      formData
    );

    return response;
  } catch (error: any) {
    return { success: false, error: error.message || 'Version check failed' };
  }
};
