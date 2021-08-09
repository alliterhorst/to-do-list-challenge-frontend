import * as React from 'react';
import { ScreenNavigationPropType } from '../type/screen-navigation-prop.type';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { screensConfigObject } from '../config/screen.config';
import { ConfigScreenComponent } from '../component/config-screen.component';

const { Home } = screensConfigObject;

export type HomeParamList = {
  [ScreenNameEnum.Home]: undefined;
};

export function HomeScreen({
  navigation,
  route,
}: ScreenNavigationPropType<HomeParamList, ScreenNameEnum.Home>): JSX.Element {
  return (
    <ConfigScreenComponent
      route={route}
      screenConfig={Home}
      currentNavigation={navigation}
      showInfo
    />
  );
}
