export enum TodoStatus {
    Pending = "Todo",
    InProgress = "In-Progress",
    Done = "Done"
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}