import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import type { GoalTemplate } from './GoalTemplateModel';
import Utilities from "../../Components/Utilities";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAvailableGoalTemplate = async (): Promise<GoalTemplate[]> => {
    const loginName = await AsyncStorage.getItem('LOGIN_NAME');
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
          loginName:loginName,
          template: true,
        },
      }),
    };
   const response = await POSTMethod<any>(
      API_ENDPOINTS.END_POINT_GOAL_TEMPLATE_HANDLER,
      requestBody
    );

    console.log('📦 FULL API RESPONSE:', response);

    // ✅ CORRECT PATH
    const list = response.data?.data?.content ?? [];

    console.log('✅ Parsed goalTemplate list:', list);

    return list.map((goalTemplate: any): GoalTemplate => ({
      goalTemplateID: goalTemplate.goalTemplateID,
    authorName: goalTemplate.authorName,
    authorFirstName: goalTemplate.authorFirstName,
    authorLastName: goalTemplate.authorLastName,
    goalName: goalTemplate.goalName,
    goalType: goalTemplate.goalType,
    goalDuration: goalTemplate.goalDuration,
    goalUrl: goalTemplate.goalUrl,
    goalImageUrl: goalTemplate.goalImageUrl,
    goalDescription: goalTemplate.goalDescription,
    tags: Array.isArray(goalTemplate.tags)
        ? goalTemplate.tags.map((t: string) => t.trim())
        : [],
    price: goalTemplate.price,
    amount: goalTemplate.amount,        
    discount: goalTemplate.discount,
    currencyType: goalTemplate.currencyType,
    rating: goalTemplate.rating,
    popularity: goalTemplate.popularity,    
    category: goalTemplate.category,
    goalStatus: goalTemplate.goalStatus,
    published: goalTemplate.published,
    archived: goalTemplate.archived,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch available mentors', error);
    return [];
  }
};

