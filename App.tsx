/* eslint-disable @typescript-eslint/no-var-requires */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import Navigation from './src/config/navigation.config';
import { AppProvider } from './src/context/app.context';
import { MenuProvider } from './src/context/menu.context';
import { appTheme } from './src/theme';
import { StepProvider } from './src/context/step.context';
import { TaskProvider } from './src/context/task.context';

const ROBOTO_400 = require('./src/assets/fonts/Roboto-Regular.ttf');
const ROBOTO_500 = require('./src/assets/fonts/Roboto-Medium.ttf');
const ROBOTO_700 = require('./src/assets/fonts/Roboto-Bold.ttf');

export default function App(): JSX.Element {
  useKeepAwake();
  const [fontsLoaded] = useFonts({
    roboto_400: ROBOTO_400,
    roboto_500: ROBOTO_500,
    roboto_700: ROBOTO_700,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={appTheme}>
        <AppProvider>
          <MenuProvider>
            <StepProvider>
              <TaskProvider>
                <>
                  <Navigation />
                  <StatusBar />
                </>
              </TaskProvider>
            </StepProvider>
          </MenuProvider>
        </AppProvider>
      </ThemeProvider>
    );
  }
}
