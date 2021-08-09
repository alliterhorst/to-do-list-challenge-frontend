import React from 'react';
import { Linking, Modal, View } from 'react-native';
import { colors } from '../theme/colors';
import { MaterialIconComponent } from './material-icon/material-icon.component';
import { TaskDetailStyle } from '../style/task-detail.style';
import { TaskInterface } from '../interface/task.interface';
import {
  TaskStatusEnum,
  TaskStatusEnumObject,
  TaskStatusLabelEnum,
} from '../enum/task-status.enum';
import { dateFormat } from '../common/util.common';
import { ButtonComponent } from './button/button.component';

const {
  TaskViewModal,
  TaskViewContainer,
  TaskStatusText,
  TaskScrollView,
  TaskViewRow,
  TaskViewButtonClose,
  TaskDescription,
  TaskViewHistory,
  TaskTextHistory,
  TaskAfterScroll,
  TaskSegmentView,
  TaskSegmentTitle,
} = TaskDetailStyle;

export function TaskDetailComponent({
  task,
  changeTaskStatus,
  onCancel,
}: {
  task: TaskInterface;
  changeTaskStatus: (task: TaskInterface, status: TaskStatusEnum) => void;
  onCancel: () => void;
}): JSX.Element {
  const disableChangeStatusButton =
    task.status === TaskStatusEnum.DONE &&
    task.taskHistory?.filter(({ status }) => status === TaskStatusEnum.PENDING)
      ?.length === 2;

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <TaskViewModal>
        <TaskViewContainer>
          <TaskViewButtonClose>
            <MaterialIconComponent
              name="close"
              color="black"
              onPress={(): void => {
                if (onCancel) onCancel();
              }}
            />
          </TaskViewButtonClose>
          <TaskScrollView>
            <TaskViewRow>
              <MaterialIconComponent
                name={
                  task.status === TaskStatusEnum.PENDING
                    ? 'checkbox-blank-outline'
                    : 'checkbox-marked-outline'
                }
                color={
                  task.status === TaskStatusEnum.PENDING
                    ? 'secondary'
                    : 'primary'
                }
              />
              <TaskStatusText status={task.status}>
                Tarefa {TaskStatusEnumObject[task.status].label}
              </TaskStatusText>
            </TaskViewRow>
            <TaskSegmentView>
              <TaskSegmentTitle>Descrição da Tarefa</TaskSegmentTitle>
              <TaskDescription>{task.description}</TaskDescription>
            </TaskSegmentView>
            <TaskSegmentView>
              <TaskSegmentTitle>Responsável</TaskSegmentTitle>
              <TaskDescription>{task.userName}</TaskDescription>
              <TaskDescription
                style={{ color: colors.info, textDecorationLine: 'underline' }}
                onPress={(): void => {
                  Linking.openURL(`mailto:${task.userEmail}`);
                }}
              >
                {task.userEmail}
              </TaskDescription>
              <TaskDescription>
                Atualizado em: {dateFormat(task.updatedAt)}
              </TaskDescription>
            </TaskSegmentView>
            <View style={{ marginTop: '12px' }}>
              <ButtonComponent
                disabled={disableChangeStatusButton}
                variantName={
                  task.status === TaskStatusEnum.PENDING
                    ? 'primary'
                    : 'secondary'
                }
                onPress={(): void =>
                  changeTaskStatus(
                    task,
                    task.status === TaskStatusEnum.PENDING
                      ? TaskStatusEnum.DONE
                      : TaskStatusEnum.PENDING,
                  )
                }
              >
                {`Mover para "${
                  task.status === TaskStatusEnum.PENDING
                    ? TaskStatusLabelEnum.DONE
                    : TaskStatusLabelEnum.PENDING
                }"`}
              </ButtonComponent>
            </View>

            <TaskSegmentView>
              <TaskSegmentTitle>Histórico da tarefa</TaskSegmentTitle>
              {task.taskHistory?.map(taskHistory => (
                <TaskViewHistory key={taskHistory.id}>
                  <TaskTextHistory>
                    {`Movido para "${
                      TaskStatusEnumObject[taskHistory.status].label
                    }" - ${dateFormat(taskHistory.createdAt)}`}
                  </TaskTextHistory>
                </TaskViewHistory>
              ))}
            </TaskSegmentView>
          </TaskScrollView>
          <TaskAfterScroll />
        </TaskViewContainer>
      </TaskViewModal>
    </Modal>
  );
}
