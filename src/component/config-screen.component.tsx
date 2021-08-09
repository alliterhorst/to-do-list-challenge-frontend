/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { ScreenConfigInterface } from '../interface/screen-config.interface';
import { useMenuContext } from '../context/menu.context';
import { useStepContext } from '../context/step.context';

export function ConfigScreenComponent({
  screenConfig,
  currentNavigation,
  route,
  showInfo,
  preventingGoingBack,
}: {
  screenConfig: ScreenConfigInterface;
  currentNavigation: StackNavigationProp<any>;
  route: RouteProp<any, any>;
  showInfo?: boolean;
  preventingGoingBack?: {
    onCancel?: () => void;
    onConfirm?: () => void;
    shouldRequireConfirmation?: boolean;
    title?: string;
    description?: string;
  };
}): JSX.Element {
  const { currentScreen, setScreen } = useMenuContext();
  const { screenStep, initializeScreenStep } = useStepContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!screenStep[screenConfig.name]) initializeScreenStep(screenConfig);
  }, []);

  useEffect(() => {
    if (isFocused) setScreen(screenConfig, currentNavigation);
  }, [isFocused]);

  useEffect(() => {
    if (!preventingGoingBack) return;

    const {
      onCancel,
      onConfirm,
      shouldRequireConfirmation,
      title,
      description,
    } = preventingGoingBack;

    const defaulTitle = title || 'Descartar mudanças?';
    const defaulDescription =
      description ||
      'Existem operações não concluídas nessa tela. Deseja descartar alterações e sair da tela?';

    currentNavigation.addListener('beforeRemove', e => {
      if (!shouldRequireConfirmation) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(defaulTitle, defaulDescription, [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: (): void => {
            if (onCancel) onCancel();
            return null;
          },
        },
        {
          text: 'Continuar',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: (): void => {
            if (onConfirm) onConfirm();
            currentNavigation.removeListener('beforeRemove', console.log);
            currentNavigation.dispatch(e.data.action);
          },
        },
      ]);
    });
    return (): void =>
      currentNavigation.removeListener('beforeRemove', console.log);
  }, [preventingGoingBack]);

  if (!showInfo) return null;

  return (
    <View
      style={{
        padding: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Nome da configuração de tela: {screenConfig.name}</Text>
      <Text>Key {route.key}</Text>
      <Text>Name {route.name}</Text>
      <Text>currentScreen: {currentScreen?.name}</Text>
    </View>
  );
}
