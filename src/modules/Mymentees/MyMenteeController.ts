import { MenteeItem } from './MenteeModel';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';

/* =========================
   TYPES
========================= */

interface ApiResponse<T> {
  status?: {
    statusCode?: number;
  };
  data?: {
    content?: T;
  };
}

/* =========================
   FUNCTION
========================= */

export const getMenteeList = async (): Promise<MenteeItem[]> => {
  try {
    const menteeRequestBody = {
      data: JSON.stringify({
        info: {
          type: 'android',
          actionType: 'showall',
          platformType: 'android',
          outputType: 'json',
          action: 'showall',
          role: null,
          currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
          currentTimeZone: Utilities.getCurrentTimeZone(),
        },
        data: {
            mapType: 'mentee',
            content:{},
        },
      }),
    };

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_MYMENTEE_HANDLER,
      menteeRequestBody
    );

    console.log('Full Response:', response);

    const content = response?.data?.data?.content ?? [];

    console.log('Extracted Content:', content);
    if (Array.isArray(content)) {
      return content;
    }

    console.error('Unexpected JSON structure:', response);
    return [];

  } catch (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
};
