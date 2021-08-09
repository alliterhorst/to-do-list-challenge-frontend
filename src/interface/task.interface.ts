import { TaskStatusEnum } from '../enum/task-status.enum';
import { TaskHistoryInterface } from './task-history.interface';

export interface TaskInterface {
  id: string;
  userName: string;
  userEmail: string;
  description: string;
  status: TaskStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  taskHistory?: TaskHistoryInterface[];
}
