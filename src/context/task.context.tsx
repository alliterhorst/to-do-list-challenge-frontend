import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { throwContextError } from '../common/util.common';
import { DownloadStatusEnum } from '../enum/download-status.enum';
import { TaskStatusEnum } from '../enum/task-status.enum';
import { useAsyncStorage } from '../hooks/use-async-storage.hook';
import { TaskInterface } from '../interface/task.interface';
import { getTasks } from '../service/task.service';
import { useAppContext } from './app.context';

const businessContext = 'Task';

interface TaskContextInterface {
  tasksDownloadingStatus: DownloadStatusEnum;
  startTasksDownloading: () => void;
  tasksPending: TaskInterface[];
  tasksDone: TaskInterface[];
  updateTask: (task: TaskInterface) => void;
  addTask: (task: TaskInterface) => void;
  addTasks: (tasks: TaskInterface[]) => void;
}

const TaskContext = createContext<TaskContextInterface>(null);

export function TaskProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { getRequestConfigObject } = useAppContext();

  const [tasksDownloadingStatus, _setTasksDownloadingStatus] =
    useAsyncStorage<DownloadStatusEnum>(
      'TASKS_DOWNLOAD_STATUS',
      (value: string): DownloadStatusEnum =>
        value ? DownloadStatusEnum[value as DownloadStatusEnum] : null,
      DownloadStatusEnum.NOT_STARTED,
    );

  const [tasks, _setTasks] = useAsyncStorage<TaskInterface[]>(
    'TASKS',
    JSON.parse,
    [],
  );

  const [tasksPending, _setTasksPending] = useState<TaskInterface[]>([]);
  const [tasksDone, _setTasksDone] = useState<TaskInterface[]>([]);

  const startTasksDownloading = useCallback(async (): Promise<void> => {
    _setTasksDownloadingStatus(DownloadStatusEnum.LOADING);
    try {
      const newTasks = await getTasks({
        config: getRequestConfigObject(),
      });
      _setTasks(newTasks);
      _setTasksDownloadingStatus(DownloadStatusEnum.DONE);
    } catch (error) {
      console.error(error);
      _setTasksDownloadingStatus(DownloadStatusEnum.FAILURE);
    }
  }, [_setTasks, _setTasksDownloadingStatus, getRequestConfigObject]);

  const updateTask = useCallback(
    (task: TaskInterface): void => {
      _setTasks([task, ...tasks.filter(({ id }) => id !== task.id)]);
    },
    [tasks, _setTasks],
  );

  const addTask = useCallback(
    (newTask: TaskInterface): void => {
      _setTasks([newTask, ...tasks]);
    },
    [tasks, _setTasks],
  );

  const addTasks = useCallback(
    (newTasks: TaskInterface[]): void => {
      _setTasks([...newTasks, ...tasks]);
    },
    [tasks, _setTasks],
  );

  useEffect(() => {
    if (!tasks) return;
    _setTasksPending(
      tasks.filter(({ status }) => status === TaskStatusEnum.PENDING),
    );
    _setTasksDone(tasks.filter(({ status }) => status === TaskStatusEnum.DONE));
  }, [tasks]);

  useEffect(() => {
    if (!tasksDownloadingStatus) return;
    if (tasksDownloadingStatus === DownloadStatusEnum.NOT_STARTED)
      startTasksDownloading();
  }, [tasksDownloadingStatus, startTasksDownloading]);

  return (
    <TaskContext.Provider
      value={{
        startTasksDownloading,
        tasksDownloadingStatus,
        tasksPending,
        tasksDone,
        updateTask,
        addTask,
        addTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextInterface {
  const context = useContext(TaskContext);
  if (!context) throwContextError(businessContext);
  return context;
}
