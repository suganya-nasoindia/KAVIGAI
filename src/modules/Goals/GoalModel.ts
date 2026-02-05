export interface Goal {
    goalID: number;
    goalName: string;
    goalType: string;
    goalDescription: string;
    goalBeginDate: string;
    goalEndDate: string;
    goalUrl?: string;
    goalimageUrl?: string;
    status: number;
    dateInterval: number;
  }

    export interface GoalsState {
        Goals: Goal[];
        loading: boolean;
        error: string | null;
    }  