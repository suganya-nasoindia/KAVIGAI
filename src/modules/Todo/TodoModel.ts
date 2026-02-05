export interface Goal {
    goalID: number;
    goalName: string;
    goalStatus:number,
    connectedStatus?: boolean;
  }
  
  export interface Todo {
    ID: number;
    name: string;
    type:string,
    description: string;
    beginDate: string;
    endDate: string;
    url?: string;
    imageUrl?: string;
    status: number;
    dateInterval: number;
    archivedStatus?: boolean;
    goalID?: number;
    goals?: Goal[];
  }
    export interface TodoState {
        todos: Todo[];
        loading: boolean;
        error: string | null;
    }  