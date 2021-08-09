import React, { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ScreenNavigationPropType } from '../type/screen-navigation-prop.type';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { screensConfigObject } from '../config/screen.config';
import { ConfigScreenComponent } from '../component/config-screen.component';
import { TaskStyle } from '../style/task.style';
import { useStepContext } from '../context/step.context';
import { TaskInterface } from '../interface/task.interface';
import { TaskToPostInterface } from '../interface/task-to-post.interface';
import {
  getTasks,
  patchTask,
  postTask,
  postWithoutTask,
} from '../service/task.service';
import { useAppContext } from '../context/app.context';
import { dateFormat, handleError } from '../common/util.common';
import { ScreenStepEnum } from '../enum/screen-step.enum';
import { TaskStatusEnum, TaskStatusEnumObject } from '../enum/task-status.enum';
import { StepComponentType } from '../type/step-component.type';
import { FloatMenuComponent } from '../component/float-menu/float-menu.component';
import { LoadingIndicatorComponent } from '../component/loading-indicator/loading-indicator.component';
import { TaskDetailComponent } from '../component/task-detail.component';
import { TaskDetailStyle } from '../style/task-detail.style';

const { Task } = screensConfigObject;
const { ViewScreen, ViewTask } = TaskStyle;

const { TaskViewRow, TaskDescription, TaskSegmentView, TaskSegmentTitle } =
  TaskDetailStyle;

export type TaskParamList = {
  [ScreenNameEnum.Task]: undefined;
};

export function TaskScreen({
  navigation,
  route,
}: ScreenNavigationPropType<TaskParamList, ScreenNameEnum.Task>): JSX.Element {
  const { getRequestConfigObject } = useAppContext();
  const { screenStep, setScreenStep } = useStepContext();
  const currentScreenStep = screenStep?.Task;
  const step = currentScreenStep?.step;

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [task, setTask] = useState<TaskInterface>(null);
  const [taskToPost, setTaskToPost] = useState<TaskToPostInterface>(null);
  const [supervisorPassword, setSupervisorPassword] = useState<string>(null);

  const resetScreenStates = useCallback((): void => {
    setTask(null);
    setTaskToPost(null);
    setSupervisorPassword(null);
  }, [setTask, setTaskToPost, setSupervisorPassword]);

  const getTasksFromApi = useCallback(async () => {
    try {
      const newTasks = await getTasks({
        config: getRequestConfigObject(),
      });

      setTasks(newTasks);
      resetScreenStates();
    } catch (error) {
      alert(`Falha ao consultar tarefas: ${handleError(error)}`);
    }
    setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
  }, [
    setTasks,
    resetScreenStates,
    getTasks,
    setScreenStep,
    getRequestConfigObject,
  ]);

  const postTaskFromApi = useCallback(async () => {
    try {
      const newTask = await postTask({
        taskToPost,
        config: getRequestConfigObject(),
      });

      setTasks([newTask, ...tasks]);
    } catch (error) {
      alert(`Falha ao adicionar tarefa: ${handleError(error)}`);
    }
    setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
  }, [tasks, setTasks, postTask, setScreenStep, getRequestConfigObject]);

  const patchTaskFromApi = useCallback(
    async (status: TaskStatusEnum) => {
      try {
        const newTask = await patchTask({
          taskId: task?.id,
          supervisorPassword,
          status,
          config: getRequestConfigObject(),
        });

        setTasks(
          tasks.map(currentTask =>
            currentTask.id !== task?.id ? currentTask : newTask,
          ),
        );
      } catch (error) {
        alert(`Falha ao adicionar tarefa: ${handleError(error)}`);
      }
      setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
    },
    [
      supervisorPassword,
      task,
      setTasks,
      patchTask,
      setScreenStep,
      getRequestConfigObject,
    ],
  );

  const postWithoutTaskFromApi = useCallback(async () => {
    try {
      const newTasks = await postWithoutTask({
        config: getRequestConfigObject(),
      });

      setTasks([...newTasks, ...tasks]);
    } catch (error) {
      alert(`Falha ao solicitar novas tarefas: ${handleError(error)}`);
    }
    setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
  }, [tasks, setTasks, postWithoutTask, setScreenStep, getRequestConfigObject]);

  const stepComponent: StepComponentType = {
    TASK_SCREEN_INITIAL: null,
    TASK_SCREEN_DOWNLOADING: (
      <LoadingIndicatorComponent
        loading
        description="Buscando lista de tarefas..."
      />
    ),
    TASK_SCREEN_ENTER_NEW_TASK: null,
    TASK_SCREEN_PROCESSING_TASK_ADDITION: null,
    TASK_SCREEN_SHOW_DETAIL: (
      <TaskDetailComponent
        task={task}
        onCancel={(): void =>
          setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL)
        }
        changeTaskStatus={(): void =>
          setScreenStep(
            Task.name,
            task?.status === TaskStatusEnum.DONE
              ? ScreenStepEnum.TASK_SCREEN_ENTER_SUPERVISOR_PASSWORD
              : ScreenStepEnum.TASK_SCREEN_PROCESSING_STATUS_CHANGE,
          )
        }
      />
    ),
    TASK_SCREEN_ENTER_SUPERVISOR_PASSWORD: null,
    TASK_SCREEN_PROCESSING_STATUS_CHANGE: null,
    TASK_SCREEN_PROCESSING_REQUEST_FOR_NEW_TASKS: null,
    TASK_SCREEN_OPEN_FLOAT_MENU: (
      <FloatMenuComponent
        options={[
          {
            text: 'Adicionar Tarefa',
            onPress: (): void =>
              setScreenStep(
                Task.name,
                ScreenStepEnum.TASK_SCREEN_ENTER_NEW_TASK,
              ),
            disabled: false,
          },
          {
            text: 'Estou sem tarefas',
            onPress: (): void =>
              setScreenStep(
                Task.name,
                ScreenStepEnum.TASK_SCREEN_PROCESSING_REQUEST_FOR_NEW_TASKS,
              ),
            disabled: false,
          },
        ]}
        onPressOutOfMenu={(): void =>
          setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL)
        }
      />
    ),
  };

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (!step) return;

    switch (step) {
      case ScreenStepEnum.TASK_SCREEN_INITIAL:
        if (tasks?.length === 0)
          setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_DOWNLOADING);
        break;
      case ScreenStepEnum.TASK_SCREEN_DOWNLOADING:
        getTasksFromApi();
        break;
      case ScreenStepEnum.TASK_SCREEN_ENTER_NEW_TASK:
        break;
      case ScreenStepEnum.TASK_SCREEN_PROCESSING_TASK_ADDITION:
        postTaskFromApi();
        break;
      case ScreenStepEnum.TASK_SCREEN_SHOW_DETAIL:
        break;
      case ScreenStepEnum.TASK_SCREEN_ENTER_SUPERVISOR_PASSWORD:
        break;
      case ScreenStepEnum.TASK_SCREEN_PROCESSING_STATUS_CHANGE:
        patchTaskFromApi(
          task?.status === TaskStatusEnum.DONE
            ? TaskStatusEnum.PENDING
            : TaskStatusEnum.DONE,
        );
        break;
      case ScreenStepEnum.TASK_SCREEN_PROCESSING_REQUEST_FOR_NEW_TASKS:
        postWithoutTaskFromApi();
        break;
      case ScreenStepEnum.TASK_SCREEN_OPEN_FLOAT_MENU:
        break;
      default:
        break;
    }
  }, [step]);

  return (
    <>
      <ConfigScreenComponent
        route={route}
        screenConfig={Task}
        currentNavigation={navigation}
      />
      <ViewScreen>
        {stepComponent[step]}
        <FlatList
          data={tasks}
          keyExtractor={(item): string => item.id}
          renderItem={({ item }): JSX.Element => (
            <ViewTask
              key={item.id}
              onPress={(): void => {
                setTask(item);
                setScreenStep(
                  Task.name,
                  ScreenStepEnum.TASK_SCREEN_SHOW_DETAIL,
                );
              }}
            >
              <>
                <TaskSegmentView style={{ marginTop: 8 }}>
                  <TaskSegmentTitle
                    color={
                      item.status === TaskStatusEnum.PENDING
                        ? 'secondary'
                        : 'primary'
                    }
                  >
                    Tarefa {TaskStatusEnumObject[item.status].label}
                  </TaskSegmentTitle>
                  <TaskDescription>{item.description}</TaskDescription>
                  <TaskDescription>
                    Responsável: {item.userName}
                  </TaskDescription>
                  <TaskViewRow>
                    <TaskDescription>E-mail: </TaskDescription>
                    <TaskDescription
                      style={{
                        textDecorationLine: 'underline',
                      }}
                    >
                      {item.userEmail}
                    </TaskDescription>
                  </TaskViewRow>
                  <TaskDescription>
                    Atualizado em: {dateFormat(item.updatedAt)}
                  </TaskDescription>
                </TaskSegmentView>
              </>
            </ViewTask>
          )}
        />
      </ViewScreen>
    </>
  );
}
