import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonComponentStyled } from './button.style';

const { ButtonContainer, ButtonText, Scheme } = ButtonComponentStyled;

interface ButtonComponentProps extends TouchableOpacityProps {
  children: string;
  onPress(): void;
  variantName?: keyof typeof Scheme;
  width?: number;
  height?: number;
}

export function ButtonComponent({
  children,
  variantName = 'light',
  disabled = false,
  onPress,
  width = 250,
  height = 40,
}: ButtonComponentProps): JSX.Element {
  return (
    <ButtonContainer
      disabled={disabled}
      onPress={onPress}
      variant={Scheme[variantName]}
      width={width}
      height={height}
    >
      <ButtonText variant={Scheme[variantName]}>{children}</ButtonText>
    </ButtonContainer>
  );
}
