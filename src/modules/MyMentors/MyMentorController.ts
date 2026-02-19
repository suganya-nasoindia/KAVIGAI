import { MentorItem } from './MentorModel';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import { PendingRequestItem } from './PendingRequestsModel';

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


export const getMentorList = async (): Promise<MentorItem[]> => {
  try {
    const mentorRequestBody = {
      data: JSON.stringify({
        info: {
          type: 'android',
          actionType: 'showall',
          platformType: 'aandroid',
          outputType: 'json',
          action: 'showall',
          role: null,
          currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
          currentTimeZone: Utilities.getCurrentTimeZone(),
        },
        data: {
          availableList: '',
          mapType: 'mentor',
        },
      }),
    };

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_MYMENTOR_HANDLER,
      mentorRequestBody
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


export const getMentorRequestList = async (): Promise<PendingRequestItem[]> => {
  try {

    const pendingMentorRequestBody = {
      data: JSON.stringify({
        info: {
          type: 'android',
          actionType: 'showall',
          platformType: 'android',
          outputType: 'json',
          currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
          currentTimeZone: Utilities.getCurrentTimeZone(),
        },
        data: {},
      }),
    };

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_MYMENTOR_REQUEST_HANDLER,
      pendingMentorRequestBody
    );

    console.log('Json Response', response);

   
      const content = response?.data?.data?.content ?? [];
      console.log('Extracted Content:', content);
      if(Array.isArray(content)) {
        return content;
      }

        console.error(
      'Unexpected JSON structure or status code:',
      response
    );

    return [];
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

