import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatusEnum } from '../enum/task-status.enum';
import { TaskHistoryInterface } from '../interface/task-history.interface';
import { TaskToPostInterface } from '../interface/task-to-post.interface';
import { TaskInterface } from '../interface/task.interface';

const userName = 'Antonio Terhorst';
const userEmail = 'antonio.terhorst@test.me';

export const createTaskHistoryMock = (
  newStatus: TaskStatusEnum = TaskStatusEnum.PENDING,
): TaskHistoryInterface => ({
  id: uuidv4(),
  createdAt: new Date(),
  status: newStatus,
});

export const createTaskMock = (
  { description, userEmail, userName }: TaskToPostInterface,
  status: TaskStatusEnum = TaskStatusEnum.PENDING,
): TaskInterface => ({
  id: uuidv4(),
  description,
  userEmail,
  userName,
  createdAt: new Date(),
  updatedAt: new Date(),
  status,
});

export const getTasksMock = (): TaskInterface[] => {
  const tasksPendingDescription = [
    'Configurar VPN',
    'Formatar o Computador',
    'Limpar cache',
  ];
  const tasksDoneDescription = [
    'Desfragmentar disco',
    'Criar campanha publicitária',
    'Cadastrar novos usuários',
  ];
  return [
    ...tasksPendingDescription.map(description =>
      createTaskMock({
        description,
        userEmail,
        userName,
      }),
    ),
    ...tasksDoneDescription.map(description =>
      createTaskMock(
        {
          description,
          userEmail,
          userName,
        },
        TaskStatusEnum.DONE,
      ),
    ),
  ];
};

export const updateTaskStatusMock = (
  task: TaskInterface,
  newStatus: TaskStatusEnum,
): TaskInterface => ({
  ...task,
  status: newStatus,
  updatedAt: new Date(),
  taskHistory: [
    createTaskHistoryMock(newStatus),
    ...(task.taskHistory ? task.taskHistory : []),
  ],
});

export const postWithoutTaskMock = (): TaskInterface[] =>
  [
    'A raça Bloodhound é capaz de farejar odores com mais de 300 horas de existência.',
    'A “cavadinha” com as patas traseiras depois de fazer xixi é uma espécie de demarcação de território comum entre os machos adultos.',
    'Apesar dos poucos centímetros de tamanho, Pinscher é a uma das raças mais valentes do mundo canino.',
  ].map(description =>
    createTaskMock({
      description,
      userName: 'Eu',
      userEmail: 'eu@me.com',
    }),
  );
