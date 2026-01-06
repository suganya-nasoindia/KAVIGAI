export interface Goal {
    goalID: number;
    goalName: string;
    connectedStatus?: boolean;
  }
  
  export interface Todo {
    todoID: number;
    name: string;
    description: string;
    beginDate: string;
    endDate: string;
    imageUrl?: string;
    dateInterval: number;
    goals?: Goal[];
  }
    export interface TodoState {
        todos: Todo[];
        loading: boolean;
        error: string | null;
    }  