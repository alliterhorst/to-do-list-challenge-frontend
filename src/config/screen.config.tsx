import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenStepEnum } from '../enum/screen-step.enum';
import { TaskHeaderRight } from '../header/task.header';
import { ScreenListType } from '../type/screen-list.type';

export const screensConfigObject: ScreenListType = {
  Home: {
    name: ScreenNameEnum.Home,
    screenOptions: { headerTitle: 'Home', title: 'Home' },
    optionsToLinking: {
      path: 'home',
    },
    steps: [ScreenStepEnum.HOME_SCREEN_INITIAL],
  },
  NotFound: {
    name: ScreenNameEnum.NotFound,
    screenOptions: {
      title: 'Página não encontrada',
      headerTitle: 'Página não encontrada',
    },
    optionsToLinking: {
      path: '*',
    },
    steps: [ScreenStepEnum.NOT_FOUND_SCREEN_INITIAL],
  },
  Task: {
    name: ScreenNameEnum.Task,
    screenOptions: {
      headerTitle: 'Tarefas',
      headerRight: (): JSX.Element => TaskHeaderRight(),
      title: 'Tarefas',
    },
    optionsToLinking: {
      path: 'task',
    },
    steps: [
      ScreenStepEnum.TASK_SCREEN_INITIAL,
      ScreenStepEnum.TASK_SCREEN_DOWNLOADING,
      ScreenStepEnum.TASK_SCREEN_ENTER_NEW_TASK,
      ScreenStepEnum.TASK_SCREEN_PROCESSING_TASK_ADDITION,
      ScreenStepEnum.TASK_SCREEN_SHOW_DETAIL,
      ScreenStepEnum.TASK_SCREEN_ENTER_SUPERVISOR_PASSWORD,
      ScreenStepEnum.TASK_SCREEN_PROCESSING_STATUS_CHANGE,
      ScreenStepEnum.TASK_SCREEN_PROCESSING_REQUEST_FOR_NEW_TASKS,
      ScreenStepEnum.TASK_SCREEN_OPEN_FLOAT_MENU,
    ],
  },
};

export const screensConfigArray = Object.values(screensConfigObject);
