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

