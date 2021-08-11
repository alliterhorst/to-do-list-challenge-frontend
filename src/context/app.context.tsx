import React, { createContext, useContext, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { throwContextError } from '../common/util.common';
import { RequestConfigInterface } from '../interface/request-config.interface';

const businessContext = 'App';
const isWebPlataform = Platform.OS === 'web';
const defaultServerUrl = 'http://localhost:3000';

interface AppContextInterface {
  isWebPlataform: boolean;
  isOfflineMode: boolean;
  setIsOfflineMode: (isOfflineMode: boolean) => void;
  serverUrl: string;
  setServerUrl: (serverUrl: string) => void;
  resetServerUtl: () => void;
  getRequestConfigObject: () => RequestConfigInterface;
}

const AppContext = createContext<AppContextInterface>(null);

export function AppProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(true);
  const [serverUrl, setServerUrl] = useState<string>(defaultServerUrl);
  const resetServerUtl = useCallback(
    () => setServerUrl(defaultServerUrl),
    [setServerUrl],
  );

  const getRequestConfigObject = useCallback(
    (): RequestConfigInterface => ({
      isOfflineMode,
      serverUrl,
    }),
    [isOfflineMode, serverUrl],
  );

  return (
    <AppContext.Provider
      value={{
        isWebPlataform,
        isOfflineMode,
        setIsOfflineMode,
        serverUrl,
        setServerUrl,
        resetServerUtl,
        getRequestConfigObject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextInterface {
  const context = useContext(AppContext);
  if (!context) throwContextError(businessContext);
  return context;
}
