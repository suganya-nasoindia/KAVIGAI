import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS  from "../../services/api/endpoints";
import Utilities from '../../Components/Utilities';
import { Todo } from './TodoModel';

interface FetchTodoParams {
  apiKey: string;
  accessToken: string;
  loginName: string;
}

export async function fetchTodos(
  params: FetchTodoParams
): Promise<Todo[]> {

  const headers = {
    'X-Access-Token': params.accessToken,
    'X-Api-Key': params.apiKey,
  };

  const body = {
    data: JSON.stringify({
      info: {
        actionType: 'showall',
        platformType: 'android',
        outputType: 'json',
        currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
        currentTimezone: Utilities.getCurrentTimeZone(),
      },
      data: { loginName: params.loginName },
    }),
  };

  const response = await POSTMethod(API_ENDPOINTS.END_POINT_GET_TODO_HANDLER, body, headers);

  if (response?.status?.statusCode !== 200) {
    throw new Error('Failed to fetch todos');
  }

  return response.data.content.map((item: any) => ({
    ...item,
    dateInterval: Utilities.calculateDateInterval(
      Utilities.getCurrentDateAndTimeInUTC(),
      item.beginDate,
      item.endDate
    ),
  }));
}
