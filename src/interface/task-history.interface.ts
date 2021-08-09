import { TaskStatusEnum } from '../enum/task-status.enum';

export interface TaskHistoryInterface {
  id: string;
  status: TaskStatusEnum;
  createdAt: Date;
}
