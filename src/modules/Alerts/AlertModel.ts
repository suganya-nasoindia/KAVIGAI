// Alert.model.ts

export interface AlertItem {
  alertNotificationID ?: number;
  sentDate?: string;
  title?: string;
  description?: string;
  tags: string;
  status: number;
  archived: boolean;
  type: string;
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
