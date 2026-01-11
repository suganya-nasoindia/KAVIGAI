// Today.model.ts

export type GoalStatus = 'CURRENT' | 'SKIPPED' | 'FUTURE';

export interface TodayItem {
  goalID?: number;
  goalName?: string;
  connectedStatus?: boolean;
  imageUrl?: string;
  type: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
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