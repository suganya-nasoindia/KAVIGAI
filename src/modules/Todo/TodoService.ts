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

  const response = await POSTMethod(API_ENDPOINTS.END_POINT_GET_TODO_HANDLER, body);
  console.log('Fetch Todos Response:', response);
  if (response?.data?.status?.statusCode !== 200) {
    throw new Error(response?.data?.status?.message || 'Failed to fetch todos');
  }

  //const todos = response?.data?.data?.content?.todo ?? [];

  const todos = Array.isArray(response?.data?.data?.content)
    ? response.data.data.content
    : [];
  console.log('Parsed Todos:', todos);

  return todos.map((item: any) => ({
    ...item,
    dateInterval: Utilities.calculateDateInterval(
      Utilities.getCurrentDateAndTimeInUTC(),
      item.beginDate,
      item.endDate
    ),
  }));
}
