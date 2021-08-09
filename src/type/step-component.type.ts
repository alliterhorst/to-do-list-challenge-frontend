import { ScreenStepEnum } from '../enum/screen-step.enum';

export type StepComponentType = {
  [key in ScreenStepEnum]?: JSX.Element;
};
