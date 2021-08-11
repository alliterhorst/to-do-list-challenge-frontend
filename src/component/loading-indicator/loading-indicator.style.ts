import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  min-width: ${({ theme }): string => `${theme.units.mainWidth - 2}px`};
  min-height: ${({ theme }): string => `${theme.units.mainHeight}px`}; ;
`;

const LoadingViewStyled = styled.View`
  margin: auto;
  width: 60%;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  background-color: #666;
  opacity: 0.8;
  border-radius: ${({ theme }): string => theme.units.borderRadius};
  padding: 16px;
`;

const ViewDescription = styled.View`
  margin-top: 16px;
`;
const TextDescriptionIndicator = styled.Text`
  font-family: ${({ theme }): string => theme.fonts.roboto_400};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }): string => theme.colors.white};
`;

const LoadingIndicator = styled.ActivityIndicator`
  color: ${({ theme }): string => theme.colors.background};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const LoadingIndicatorStyled = {
  Wrapper,
  LoadingViewStyled,
  ViewDescription,
  TextDescriptionIndicator,
  LoadingIndicator,
};
