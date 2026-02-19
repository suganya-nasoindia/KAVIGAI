// Today.model.ts


export type GoalStatus = 'CURRENT' | 'SKIPPED' | 'FUTURE';

export interface GoalSummaryItem {
  status: GoalStatus;
  count: number;
}

export interface StatsItem {
  type: 'GOAL' | string;
  summary: GoalSummaryItem[];
}

export interface TodayContent {
  today: TodayItem[];
  stats: StatsItem[];
}

export interface TodayApiData {
  content: TodayContent;
}

export interface TodayApiResponse {
  status: {
    statusCode: number;
    message: string;
  };
  data: {
    data: TodayApiData;
  };
}



export interface TodayItem {

  // "serialNo": 0,
  //                   "ID": 934,
  //                   "type": "TODO",
  //                   "name": "tesr imagine Todo",
  //                   "beginDate": "2020-08-04 21:37:24",
  //                   "endDate": "2024-05-29 21:37:34",
  //                   "url": "at .com",
  //                   "imageUrl": "https://app.kavigai.com/assets/images/naso_logo_final.png",
  //                   "description": "salemp",
  //                   "status": 0,
  //                   "archived": false,
  //                   "goalID": 1906,
  //                   "goalName": "Know Flutter as a beginner",
  //                   "goalStatus": 0,
  //                   "connectedStatus": true
  //               },
  serialNo: number;
  ID: number;
  type: string;
  name: string;
  beginDate: string;
  endDate: string;
  url: string;
  imageUrl?: string;

  description: string;
  status: number;
  archived: boolean;
  goalID?: number;
  goalName?: string;
  goalStatus?: number;
  connectedStatus?: boolean;

 
  width: number;
  height: number;
}

export interface PieChartItem {
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
export interface TodayModel {
  todayItems: TodayItem[];
  pieChartData: PieChartItem[];
}