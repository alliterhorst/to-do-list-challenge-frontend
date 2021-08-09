import * as React from 'react';
import styled from 'styled-components/native';
import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenNavigationPropType } from '../type/screen-navigation-prop.type';
import { HomeParamList } from './home.screen';
import { screensConfigObject } from '../config/screen.config';
import { TaskParamList } from './task.screen';
import { ConfigScreenComponent } from '../component/config-screen.component';

const { NotFound } = screensConfigObject;
export type NotFoundParamList = {
  [ScreenNameEnum.NotFound]: undefined;
  [ScreenNameEnum.Home]: HomeParamList[ScreenNameEnum.Home];
  [ScreenNameEnum.Task]: TaskParamList[ScreenNameEnum.Task];
};

const ViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.View`
  font-size: 20;
  font-weight: bold;
`;

const TouchableLink = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 0 15px;
`;

const TextLink = styled.Text`
  font-size: 14px;
  color: #2e78b7;
`;

export function NotFoundScreen({
  navigation,
  route,
}: ScreenNavigationPropType<
  NotFoundParamList,
  ScreenNameEnum.NotFound
>): JSX.Element {
  return (
    <>
      <ConfigScreenComponent
        route={route}
        screenConfig={NotFound}
        currentNavigation={navigation}
      />
      <ViewContainer>
        <Title>Pagina não encontrada</Title>
        <TouchableLink
          onPress={(): void => {
            navigation.popToTop();
            navigation.replace(ScreenNameEnum.Task);
          }}
        >
          <TextLink>Ir para Tarefas</TextLink>
        </TouchableLink>
      </ViewContainer>
    </>
  );
}
