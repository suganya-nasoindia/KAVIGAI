import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS  from "../../services/api/endpoints";
import Utilities from '../../Components/Utilities';
import { Goal } from './GoalModel';

interface FetchGoalParams {
  apiKey: string;
  accessToken: string;
  loginName: string;
}

export async function fetchGoals(
  params: FetchGoalParams
): Promise<Goal[]> {

  const body = {
    data: JSON.stringify({
      info: {
        actionType: 'showall',
        platformType: 'android',
        outputType: 'json',
        action:"showall",
        type:"",
        role:"",
        currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
        currentTimezone: Utilities.getCurrentTimeZone(),
      },
      data: {
        content:{}},
    }),
  };

  const response = await POSTMethod(API_ENDPOINTS.END_POINT_GET_GOAL_HANDLER, body);
  console.log('Fetch Goals Response:', response);
  if (response?.data?.status?.statusCode !== 200) {
    throw new Error(response?.data?.status?.message || 'Failed to fetch goals');
  }

  //const todos = response?.data?.data?.content?.todo ?? [];

  const goals = Array.isArray(response?.data?.data?.content)
    ? response.data.data.content
    : [];
  console.log('Parsed Goals:', goals);

  return goals.map((item: any) => ({
    ...item,
    dateInterval: Utilities.calculateDateInterval(
      Utilities.getCurrentDateAndTimeInUTC(),
      item.goalBeginDate,
      item.goalEndDate
    ),
  }));
}

export async function fetchGoalById(
  goalID: number,
  params: FetchGoalParams
): Promise<Goal | null> {
console.log('Fetching Goal with ID:', goalID);
  const body = {
    data: JSON.stringify({
      info: {
        actionType: "show",
        platformType: "android",
        outputType: "json",
      },
      data: {
        content: {
          ID: goalID,
          loginName: params.loginName,
          apiKey: params.apiKey,
        },
      },
    }),
  };

  const response = await POSTMethod(
    API_ENDPOINTS.END_POINT_GET_GOAL_HANDLER,
    body
  );

  if (response?.data?.status?.statusCode !== 200) {
    throw new Error(
      response?.data?.status?.message || "Failed to fetch todo detail"
    );
  }

  const goal =
    Array.isArray(response?.data?.data?.content)
      ? response.data.data.content[0]
      : null;

  if (!goal) return null;

  return {
    ...goal,
    dateInterval: Utilities.calculateDateInterval(
      Utilities.getCurrentDateAndTimeInUTC(),
      goal.goalBeginDate,
      goal.goalEndDate
    ),
  };
}

