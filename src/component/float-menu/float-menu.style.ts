import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';
import { FlattenSimpleInterpolation } from 'styled-components';

const ViewLayout = styled.View`
  position: absolute;
  width: ${({ theme }): string => `${theme.units.windowWidth}px`};
  height: ${({ theme }): string => `${theme.units.windowHeight}px`};
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
`;

const BackgroundArea = styled.TouchableWithoutFeedback`
  position: absolute;
  width: ${({ theme }): string => `${theme.units.windowWidth}px`};
  height: ${({ theme }): string => `${theme.units.windowHeight}px`};
`;

const BackgroundAnimatedView = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }): string => theme.colors.black};
  opacity: 0.1;
`;

const ViewMenu = styled(Animated.View)`
  position: absolute;
  align-self: flex-end;
  margin-top: 16px;
  background-color: ${({ theme }): string => theme.colors.active_in_primary};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  width: 70%;
  max-width: 300px;
`;

const TouchableOptionMenu = styled.TouchableOpacity``;

const TextMenu = styled.Text<{ disabled: boolean }>`
  font-family: ${({ theme }): string => theme.fonts.roboto_500};
  font-size: 18px;

  text-transform: uppercase;
  color: ${({ theme }): string => theme.colors.text_medium_emphasis};
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
  ${({ disabled }): FlattenSimpleInterpolation =>
    disabled &&
    css`
      opacity: 0.6;
    `};
`;

const SeparatorItem = styled.View`
  border-bottom-color: ${({ theme }): string => theme.colors.outline};
  border-bottom-width: 1px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 0;
`;

export const FloatMenuComponentStyled = {
  BackgroundArea,
  ViewLayout,
  BackgroundAnimatedView,
  ViewMenu,
  TouchableOptionMenu,
  TextMenu,
  SeparatorItem,
};
