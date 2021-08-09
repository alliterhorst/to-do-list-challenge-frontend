/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as React from 'react';
import { ThemeContext } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NotFoundScreen, NotFoundParamList } from '../screen/not-found.screen';
import LinkingConfiguration from './linking.config';
import { HomeScreen, HomeParamList } from '../screen/home.screen';
import { screensConfigArray } from './screen.config';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { useMenuContext } from '../context/menu.context';
import { TaskParamList, TaskScreen } from '../screen/task.screen';

const Stack = createStackNavigator<
  HomeParamList & NotFoundParamList & TaskParamList
>();

const screensComponent: {
  [key in ScreenNameEnum]: React.ComponentType<any>;
} = {
  Home: HomeScreen,
  NotFound: NotFoundScreen,
  Task: TaskScreen,
};

export default function Navigation(): JSX.Element {
  const { menuLoadingIsReady } = useMenuContext();
  const { navigationTheme, units } = React.useContext(ThemeContext);

  if (!menuLoadingIsReady) return null;

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        maxWidth: units.windowWidth,
        alignSelf: 'center',
        width: '100%',
      }}
    >
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={navigationTheme}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            animationEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName={ScreenNameEnum.Task}
        >
          {screensConfigArray.map(({ name, screenOptions }) => (
            <Stack.Screen
              key={name}
              name={name as any}
              component={screensComponent[name]}
              options={screenOptions}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
