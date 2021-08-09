export enum TaskStatusEnum {
  PENDING = 'PENDING',
  DONE = 'DONE',
}

export enum TaskStatusLabelEnum {
  PENDING = 'Pendente',
  DONE = 'Concluída',
}

type TaskStatusEnumType = {
  [key in TaskStatusEnum]: {
    key: TaskStatusEnum;
    label: TaskStatusLabelEnum;
  };
};

export const TaskStatusEnumObject: TaskStatusEnumType = {
  PENDING: {
    key: TaskStatusEnum.PENDING,
    label: TaskStatusLabelEnum.PENDING,
  },
  DONE: {
    key: TaskStatusEnum.DONE,
    label: TaskStatusLabelEnum.DONE,
  },
};

export const TaskStatusEnumArray = Object.values(TaskStatusEnumObject);
