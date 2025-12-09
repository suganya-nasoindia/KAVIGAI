// Matches your API response exactly
export interface LoginContent {
    userID: number;
    loginName: string;
    apiKey: string;
    authToken: string;
    firstTime: boolean;
    message: string;
  }
  
  export interface LoginResponse {
    status: {
      statusCode: number;
      message: string;
    };
    data: {
      info: any;
      content: LoginContent;
    };
  }
  