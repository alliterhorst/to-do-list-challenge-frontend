/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { throwContextError } from '../common/util.common';
import { ScreenConfigInterface } from '../interface/screen-config.interface';
import { useAsyncStorage } from '../hooks/use-async-storage.hook';
import { ScreenNameEnum } from '../enum/screen-name.enum';

const businessContext = 'Menu';

interface MenuContextInterface {
  currentScreen: ScreenConfigInterface;
  currentNavigation: StackNavigationProp<any>;
  setScreen: (
    currentScreen: ScreenConfigInterface,
    currentNavigation: StackNavigationProp<any>,
  ) => void;
  activeScreenName: ScreenNameEnum;
  setActiveScreenName: (currentScreenName: ScreenNameEnum) => void;
  menuLoadingIsReady: boolean;
}

const MenuContext = createContext<MenuContextInterface>(null);

export function MenuProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenConfigInterface>(null);
  const [activeScreenName, setActiveScreenName] =
    useState<ScreenNameEnum>(null);

  const [currentNavigation, setCurrentNavigation] =
    useState<StackNavigationProp<any>>();
  const setScreen = (
    currentScreen: ScreenConfigInterface,
    currentNavigation: StackNavigationProp<any>,
  ): void => {
    setCurrentNavigation(currentNavigation);
    setCurrentScreen(currentScreen);
    if (activeScreenName !== currentScreen.name)
      setActiveScreenName(currentScreen.name);
  };

  const [menuLoadingIsReady] = useAsyncStorage<boolean>(
    'MENU_LOADING_IS_READY',
    (value: string): boolean => value?.toUpperCase() === 'TRUE',
    true,
  );

  return (
    <MenuContext.Provider
      value={{
        currentScreen,
        setScreen,
        currentNavigation,
        activeScreenName,
        setActiveScreenName,
        menuLoadingIsReady,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext(): MenuContextInterface {
  const context = useContext(MenuContext);
  if (!context) throwContextError(businessContext);
  return context;
}
