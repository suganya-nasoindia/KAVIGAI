export type FilterType = 'current' | 'skipped' | 'future';

export interface BookItem {
  id: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  imageUrl?: string;
  url?: string;
  type?: string;
  status?: boolean;
  goalID?: string;
  goals?: {
    goalId: string;
    goalName: string;
    goalStatus: boolean;
    connectedStatus: boolean;
  }[];
  dateInterval?: number;
}
