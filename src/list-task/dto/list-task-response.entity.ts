export interface ListTask {
  id: number;
  name: string;
}

export interface ListTaskResponse {
  task: ListTask;
}
export interface TaskListListResponseResponse {
  tasks: ListTask[];
}
