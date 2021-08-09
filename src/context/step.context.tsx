import React, { createContext, useContext, useState } from 'react';
import { throwContextError } from '../common/util.common';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenStepEnum } from '../enum/screen-step.enum';
import { ScreenConfigInterface } from '../interface/screen-config.interface';

const businessContext = 'Step';

type ScreenStepListType = {
  [key in ScreenNameEnum]?: {
    steps: ScreenStepEnum[];
    step: ScreenStepEnum;
  };
};

const defaultScreenStep: ScreenStepListType = {};

interface StepContextInterface {
  screenStep: ScreenStepListType;
  setScreenStep: (screenName: ScreenNameEnum, step: ScreenStepEnum) => void;
  setDefaultScreenStep: (screenName: ScreenNameEnum) => void;
  initializeScreenStep: (
    screenConfig: ScreenConfigInterface,
    secoundScreen?: ScreenConfigInterface,
  ) => void;
}

const StepContext = createContext<StepContextInterface>(null);

export function StepProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [screenStep, _setScreenStep] =
    useState<ScreenStepListType>(defaultScreenStep);

  const setScreenStep = (
    screenName: ScreenNameEnum,
    step: ScreenStepEnum,
  ): void => {
    const newScreenStep = { ...screenStep };
    if (!newScreenStep[screenName].steps.includes(step)) {
      console.log(`O step ${step} não pertence a essa tela`);
      throw new Error(`O step ${step} não pertence a essa tela`);
    }
    newScreenStep[screenName].step = step;
    _setScreenStep(newScreenStep);
  };

  const setDefaultScreenStep = (screenName: ScreenNameEnum): void => {
    const newScreenStep = { ...screenStep };
    newScreenStep[screenName].step = defaultScreenStep[screenName].step;
    _setScreenStep(newScreenStep);
  };

  const initializeScreenStep = (
    { name, steps }: ScreenConfigInterface,
    secoundScreen?: ScreenConfigInterface,
  ): void => {
    const newScreenStep = { ...screenStep };
    newScreenStep[name] = {
      step: steps[0],
      steps,
    };
    if (secoundScreen)
      newScreenStep[secoundScreen.name] = {
        step: secoundScreen.steps[0],
        steps: secoundScreen.steps,
      };
    _setScreenStep(newScreenStep);
  };

  return (
    <StepContext.Provider
      value={{
        screenStep,
        setDefaultScreenStep,
        setScreenStep,
        initializeScreenStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStepContext(): StepContextInterface {
  const context = useContext(StepContext);
  if (!context) throwContextError(businessContext);
  return context;
}
