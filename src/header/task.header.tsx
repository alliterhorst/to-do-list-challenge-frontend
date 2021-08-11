import React from 'react';
import { View } from 'react-native';
import { MaterialIconComponent } from '../component/material-icon/material-icon.component';
import { useStepContext } from '../context/step.context';
import { useTaskContext } from '../context/task.context';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenStepEnum } from '../enum/screen-step.enum';
import { StepComponentType } from '../type/step-component.type';

export function TaskHeaderRight(): JSX.Element {
  const { startTasksDownloading } = useTaskContext();
  const { screenStep, setScreenStep } = useStepContext();
  const currentScreenStep = screenStep?.Task;
  const step = currentScreenStep?.step;

  const stepComponent: StepComponentType = {
    TASK_SCREEN_INITIAL: (
      <>
        <View style={{ marginRight: 16 }}>
          <MaterialIconComponent
            name="refresh"
            onPress={startTasksDownloading}
          />
        </View>
        <View style={{ marginRight: 16 }}>
          <MaterialIconComponent
            name="menu"
            onPress={(): void =>
              setScreenStep(
                ScreenNameEnum.Task,
                ScreenStepEnum.TASK_SCREEN_OPEN_FLOAT_MENU,
              )
            }
          />
        </View>
      </>
    ),
  };

  return (
    <View
      style={{
        alignItems: 'flex-end',
        marginRight: 'auto',
        flexDirection: 'row',
      }}
    >
      {stepComponent[step]}
    </View>
  );
}
