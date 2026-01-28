export interface Goal {
    goalName?: string;
    connectedStatus?: boolean;
  }
  
  export interface EventItem {
    goalID?: string;
    name: string;
    description: string;
    beginDate: string;
    endDate: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    goals?: Goal[];
    dateInterval?: number;
  }
  
  export type FilterType = 'current' | 'skipped' | 'future';
  