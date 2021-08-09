import { StackNavigationOptions } from '@react-navigation/stack';
import { PathConfig } from '@react-navigation/native';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenStepEnum } from '../enum/screen-step.enum';

export interface ScreenConfigInterface {
  name: ScreenNameEnum;
  screenOptions?: StackNavigationOptions;
  optionsToLinking?: PathConfig;
  steps: ScreenStepEnum[];
}
