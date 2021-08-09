import React from 'react';
import { ColorValue, Modal } from 'react-native';

import { LoadingIndicatorStyled } from './loading-indicator.style';

const {
  Wrapper,
  LoadingViewStyled,
  LoadingIndicator,
  ViewDescription,
  TextDescriptionIndicator,
} = LoadingIndicatorStyled;

export function LoadingIndicatorComponent({
  loading,
  size = 'large',
  color = '#fff',
  description,
}: {
  loading: boolean;
  size?: 'small' | 'large';
  color?: ColorValue;
  description?: string;
}): JSX.Element {
  return (
    <Modal animationType="fade" transparent visible={loading}>
      <Wrapper>
        <LoadingViewStyled>
          <LoadingIndicator animating={loading} size={size} color={color} />
          {description && (
            <ViewDescription>
              <TextDescriptionIndicator>{description}</TextDescriptionIndicator>
            </ViewDescription>
          )}
        </LoadingViewStyled>
      </Wrapper>
    </Modal>
  );
}
