import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { screensConfigObject } from './screen.config';
import { ScreenNameEnum } from '../enum/screen-name.enum';

const { Home, Task, NotFound } = screensConfigObject;

const linking: LinkingOptions = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    initialRouteName: Task.name,
    screens: {
      [Home.name]: { ...Home.optionsToLinking },
      [Task.name]: { ...Task.optionsToLinking },
      [ScreenNameEnum.NotFound]: NotFound.optionsToLinking.path,
    },
  },
};
export default linking;
