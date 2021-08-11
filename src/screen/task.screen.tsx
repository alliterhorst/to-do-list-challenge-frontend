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
import { patchTask, postTask, postWithoutTask } from '../service/task.service';
import { useAppContext } from '../context/app.context';
import { dateFormat, handleError } from '../common/util.common';
import { ScreenStepEnum } from '../enum/screen-step.enum';
import { TaskStatusEnum, TaskStatusEnumObject } from '../enum/task-status.enum';
import { StepComponentType } from '../type/step-component.type';
import { FloatMenuComponent } from '../component/float-menu/float-menu.component';
import { LoadingIndicatorComponent } from '../component/loading-indicator/loading-indicator.component';
import { TaskDetailComponent } from '../component/task-detail.component';
import { TaskDetailStyle } from '../style/task-detail.style';
import { useTaskContext } from '../context/task.context';
import { DownloadStatusEnum } from '../enum/download-status.enum';

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
  const {
    tasksDownloadingStatus,
    tasksPending,
    tasksDone,
    updateTask,
    addTask,
    addTasks,
  } = useTaskContext();
  const { screenStep, setScreenStep } = useStepContext();
  const currentScreenStep = screenStep?.Task;
  const step = currentScreenStep?.step;

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [task, setTask] = useState<TaskInterface>(null);
  const [taskToPost, setTaskToPost] = useState<TaskToPostInterface>(null);
  const [supervisorPassword, setSupervisorPassword] = useState<string>(null);

  useEffect(
    () => setTasks([...tasksPending, ...tasksDone]),
    [tasksPending, tasksDone],
  );

  const resetScreenStates = useCallback((): void => {
    setTask(null);
    setTaskToPost(null);
    setSupervisorPassword(null);
  }, [setTask, setTaskToPost, setSupervisorPassword]);

  const postTaskFromApi = useCallback(async () => {
    try {
      const newTask = await postTask({
        taskToPost,
        config: getRequestConfigObject(),
      });

      addTask(newTask);
    } catch (error) {
      console.log(error);
      alert(`Falha ao adicionar tarefa: ${handleError(error)}`);
    }
    setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
  }, [tasks, setTasks, postTask, setScreenStep, getRequestConfigObject]);

  const patchTaskFromApi = useCallback(async () => {
    try {
      console.log('currentTask', task);
      const newTask = await patchTask({
        task,
        supervisorPassword,
        config: getRequestConfigObject(),
      });
      updateTask(newTask);
    } catch (error) {
      console.log(error);
      alert(`Falha ao adicionar tarefa: ${handleError(error)}`);
    }
    setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
  }, [
    supervisorPassword,
    task,
    setTasks,
    patchTask,
    setScreenStep,
    getRequestConfigObject,
  ]);

  const postWithoutTaskFromApi = useCallback(async () => {
    try {
      const newTasks = await postWithoutTask({
        config: getRequestConfigObject(),
      });

      addTasks(newTasks);
    } catch (error) {
      console.log(error);
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
    TASK_SCREEN_PROCESSING_TASK_ADDITION: (
      <LoadingIndicatorComponent
        loading
        description="Processando inclusão da tarefas..."
      />
    ),
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
    TASK_SCREEN_PROCESSING_STATUS_CHANGE: (
      <LoadingIndicatorComponent
        loading
        description="Processando alteração de status da tarefa..."
      />
    ),
    TASK_SCREEN_PROCESSING_REQUEST_FOR_NEW_TASKS: (
      <LoadingIndicatorComponent
        loading
        description="Solicitando novas tarefas..."
      />
    ),
    TASK_SCREEN_DOWNLOAD_FAILURE: null,
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

  useEffect(() => {
    if (!tasksDownloadingStatus || !step) return;

    switch (tasksDownloadingStatus) {
      case DownloadStatusEnum.LOADING:
        setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_DOWNLOADING);
        break;
      case DownloadStatusEnum.FAILURE:
        setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_DOWNLOAD_FAILURE);
        break;
      case DownloadStatusEnum.DONE:
        setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
        break;
      default:
        break;
    }
    if (tasksDownloadingStatus === DownloadStatusEnum.LOADING)
      setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_DOWNLOADING);
  }, [tasksDownloadingStatus]);

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (!step) return;

    switch (step) {
      case ScreenStepEnum.TASK_SCREEN_INITIAL:
        resetScreenStates();
        break;
      case ScreenStepEnum.TASK_SCREEN_DOWNLOADING:
        // getTasksFromApi();
        break;
      case ScreenStepEnum.TASK_SCREEN_DOWNLOAD_FAILURE:
        setScreenStep(Task.name, ScreenStepEnum.TASK_SCREEN_INITIAL);
        break;
      case ScreenStepEnum.TASK_SCREEN_ENTER_NEW_TASK:
        break;
      case ScreenStepEnum.TASK_SCREEN_PROCESSING_TASK_ADDITION:
        postTaskFromApi();
        break;
      case ScreenStepEnum.TASK_SCREEN_SHOW_DETAIL:
        break;
      case ScreenStepEnum.TASK_SCREEN_ENTER_SUPERVISOR_PASSWORD:
        // TODO: Implementar solicitação de senha
        setScreenStep(
          Task.name,
          ScreenStepEnum.TASK_SCREEN_PROCESSING_STATUS_CHANGE,
        );
        break;
      case ScreenStepEnum.TASK_SCREEN_PROCESSING_STATUS_CHANGE:
        patchTaskFromApi();
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
                  <TaskDescription>
                    Descrição: {item.description}
                  </TaskDescription>
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
