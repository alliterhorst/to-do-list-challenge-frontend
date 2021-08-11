import { sleep } from '../common/util.common';
import { TaskStatusEnum } from '../enum/task-status.enum';
import { RequestConfigInterface } from '../interface/request-config.interface';
import { TaskToPostInterface } from '../interface/task-to-post.interface';
import { TaskInterface } from '../interface/task.interface';
import {
  createTaskMock,
  getTasksMock,
  postWithoutTaskMock,
  updateTaskStatusMock,
} from '../mock/task.mock';
import { backendApi } from './api';

const prefix = '/api/tasks';
const defaultMockSleep = 1500;

export const getTasks = async (params: {
  config: RequestConfigInterface;
}): Promise<TaskInterface[]> => {
  const { config } = params;

  if (config.isOfflineMode) {
    await sleep(defaultMockSleep);
    return getTasksMock();
  }

  const { data } = await backendApi.get<TaskInterface[]>(
    `${config.serverUrl}${prefix}`,
  );
  return data || [];
};

export const postTask = async (params: {
  config: RequestConfigInterface;
  taskToPost: TaskToPostInterface;
}): Promise<TaskInterface> => {
  const { config, taskToPost } = params;

  if (config.isOfflineMode) {
    await sleep(defaultMockSleep);
    return createTaskMock(taskToPost);
  }

  const { data } = await backendApi.post<TaskInterface>(
    `${config.serverUrl}${prefix}`,
    taskToPost,
  );
  return data;
};

export const patchTask = async (params: {
  config: RequestConfigInterface;
  task: TaskInterface;
  supervisorPassword?: string;
}): Promise<TaskInterface> => {
  const { config, task, supervisorPassword } = params;
  const newStatus =
    task.status === TaskStatusEnum.PENDING
      ? TaskStatusEnum.DONE
      : TaskStatusEnum.PENDING;

  if (config.isOfflineMode) {
    await sleep(defaultMockSleep);
    return updateTaskStatusMock(task, newStatus);
  }

  const { data } = await backendApi.patch<TaskInterface>(
    `${config.serverUrl}${prefix}/${task.id}`,
    {
      status: newStatus,
      supervisorPassword,
    },
  );
  return data;
};

export const postWithoutTask = async (params: {
  config: RequestConfigInterface;
}): Promise<TaskInterface[]> => {
  const { config } = params;

  if (config.isOfflineMode) {
    await sleep(defaultMockSleep);
    return postWithoutTaskMock();
  }

  const { data } = await backendApi.post<TaskInterface[]>(
    `${config.serverUrl}${prefix}/without-task`,
  );
  return data || [];
};
