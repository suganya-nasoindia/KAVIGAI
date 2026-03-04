import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import type { Mentor } from './MentorModel';
import Utilities from "../../Components/Utilities";

export const getAvailableMentors = async (): Promise<Mentor[]> => {
  try {
    const requestBody = {
      data: JSON.stringify({
        info: {
          type: 'mobile',
          actionType: 'showall',
          platformType: 'mobile',
          outputType: 'json',
          currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
  
          currentTimezone: Utilities.getCurrentTimeZone(),

        },
        data: {
          availableList: 'availableList',
          mapType: 'mentor',
        },
      }),
    };

    const response = await POSTMethod<any>(
      API_ENDPOINTS.END_POINT_MYMENTOR_HANDLER,
      requestBody
    );

    console.log('📦 FULL API RESPONSE:', response);

    // ✅ CORRECT PATH
    const list = response.data?.data?.content ?? [];

    console.log('✅ Parsed mentor list:', list);

    return list.map((m: any): Mentor => ({
      mentorID: m.mentorID,
      // ✅ Full mentor name
      name: [m.firstName, m.lastName]
        .filter(Boolean)          // removes null / undefined / empty
        .join(' '),
      title: m.mentorTitle,
      description: m.mentorDescription,
      firstName: m.firstName,
      lastName: m.lastName,
      tags: Array.isArray(m.mentorTags)
        ? m.mentorTags.map((t: string) => t.trim())
        : [],
      location: m.location ?? '',
      price: m.price,
      ratings: Number(m.ratings ?? 0), // ratings already 0–1
      imageUrl: m.imageUrl ?? m.photo ?? null,
      recognitions: m.recognitions,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch available mentors', error);
    return [];
  }
};


export const getMentorDetailByID = async (mentorID: number): Promise<Mentor[]> => {
  try {
    const requestBody = {
      data: JSON.stringify({
        info: {
          type: 'mobile',
          actionType: 'show',
          platformType: 'mobile',
          outputType: 'json',
        
        },
        data: {
        content:{
          mentorID: mentorID,
        }
        },
      }),
    };

    const response = await POSTMethod<any>(
      API_ENDPOINTS.END_POINT_MYMENTOR_HANDLER,
      requestBody
    );
    if (response.success && response.data?.status?.statusCode === 200) {
      // 🔹 Return alert details object
      return response.data.data?.content ?? null;
    }

    throw new Error(response.error || 'Failed to fetch alert details');
  } catch (error) {
    console.error('getAlertById error:', error);
    throw error;
  }

  //   console.log('📦 FULL API RESPONSE:', response);

  //   // ✅ CORRECT PATH
  //   const list = response.data?.data?.content ?? [];

  //   console.log('✅ Parsed mentor list:', list);

  //   return list.map((m: any): Mentor => ({
  //     mentorID: m.mentorID,
  //     // ✅ Full mentor name
  //     name: [m.firstName, m.lastName]
  //       .filter(Boolean)          // removes null / undefined / empty
  //       .join(' '),
  //     title: m.mentorTitle,
  //     description: m.mentorDescription,
  //     firstName: m.firstName,
  //     lastName: m.lastName,
  //     tags: Array.isArray(m.mentorTags)
  //       ? m.mentorTags.map((t: string) => t.trim())
  //       : [],
  //     location: m.location ?? '',
  //     price: m.price,
  //     ratings: Number(m.ratings ?? 0), // ratings already 0–1
  //     imageUrl: m.imageUrl ?? m.photo ?? null,
  //     recognitions: m.recognitions,
  //   }));
  // } catch (error) {
  //   console.error('❌ Failed to fetch available mentors', error);
  //   return [];
  // }
};

export const updateMentorRequest = async (userID:number,mentorID: number): Promise<Mentor[]> => {
  console.log('updateMentorRequest called with userID:', userID, 'mentorID:', mentorID);

  try {
    const requestBody = {
      data: JSON.stringify({
        info: {
          type: 'mobile',
          actionType: 'add',
          platformType: 'mobile',
          outputType: 'json',
        
        },
        data: {
        content:{
          // loginName:,
          // userLoginName: userLoginName,
         userType:1,
          userID: userID,
          RequestDescription:'I would like you to be my mentor',
          userRequestDate: Utilities.getCurrentDateAndTimeInUTC(),
          mentorID: mentorID,
        }
        },
      }),
    };
    console.log('Request body for updateMentorRequest:', requestBody);
    const response = await POSTMethod<any>(
      API_ENDPOINTS.END_POINT_MYMENTOR_REQUEST_HANDLER,
      requestBody
    );
    console.log('Response from updateMentorRequest:', response);
    if (response.success && response.data?.status?.statusCode === 200) {
      // 🔹 Return alert details object
      return response.data.data?.content ?? null;
    }

    throw new Error(response.error || 'Failed to fetch alert details');
  } catch (error) {
    console.error('getAlertById error:', error);
    throw error;
  }

  //   console.log('📦 FULL API RESPONSE:', response);

  //   // ✅ CORRECT PATH
  //   const list = response.data?.data?.content ?? [];

  //   console.log('✅ Parsed mentor list:', list);

  //   return list.map((m: any): Mentor => ({
  //     mentorID: m.mentorID,
  //     // ✅ Full mentor name
  //     name: [m.firstName, m.lastName]
  //       .filter(Boolean)          // removes null / undefined / empty
  //       .join(' '),
  //     title: m.mentorTitle,
  //     description: m.mentorDescription,
  //     firstName: m.firstName,
  //     lastName: m.lastName,
  //     tags: Array.isArray(m.mentorTags)
  //       ? m.mentorTags.map((t: string) => t.trim())
  //       : [],
  //     location: m.location ?? '',
  //     price: m.price,
  //     ratings: Number(m.ratings ?? 0), // ratings already 0–1
  //     imageUrl: m.imageUrl ?? m.photo ?? null,
  //     recognitions: m.recognitions,
  //   }));
  // } catch (error) {
  //   console.error('❌ Failed to fetch available mentors', error);
  //   return [];
  // }
};
