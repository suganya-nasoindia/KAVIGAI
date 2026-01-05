// Alert.model.ts

export interface AlertItem {
    sentDate?: string;
    title?: string;
    description?: string;
  }
  
  export interface AlertApiResponse {
    status?: {
      statusCode: number;
      message: string;
    };
    data?: {
      content: AlertItem[];
    };
  }
  