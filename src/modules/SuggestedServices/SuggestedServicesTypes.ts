export interface SuggestedServiceItem {
    serialNo: number;
    ID: number;
    name: string;
    type: string;
    beginDate: string;
    endDate: string;
    url: string;
    imageUrl: string;
    description: string;
    status: string;
    dateInterval: string;
    archived: number;
  }

  export interface SuggestedServiceResponse {
    status: {
      statusCode: number;
      message: string;
    };
    data: {
      info: {
        actionType: string;
      };
      content: SuggestedServiceItem[]; // ✅ ARRAY
    };
  }
  