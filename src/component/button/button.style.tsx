import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { FlattenSimpleInterpolation } from 'styled-components';
import { ColorsType } from '../../theme/colors';

enum ButtonStyledEnum {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark',
  transparent = 'transparent',
}

enum ButtonStyledSchemeColorEnum {
  backgroundColor,
  borderColor,
  textColor,
}

type VariantType = {
  [key in keyof typeof ButtonStyledSchemeColorEnum]: ColorsType;
};

type SchemeType = {
  [key in keyof typeof ButtonStyledEnum]: VariantType;
};
interface ButtonStyledInterface {
  variant: VariantType;
}

interface ButtonTouchableStyledInterface extends ButtonStyledInterface {
  width: number;
  height: number;
}

const Scheme: SchemeType = {
  primary: {
    backgroundColor: 'button_primary',
    borderColor: 'transparent',
    textColor: 'white',
  },
  secondary: {
    backgroundColor: 'button_secondary',
    borderColor: 'transparent',
    textColor: 'white',
  },
  success: {
    backgroundColor: 'success',
    borderColor: 'transparent',
    textColor: 'white',
  },
  danger: {
    backgroundColor: 'danger',
    borderColor: 'transparent',
    textColor: 'white',
  },
  warning: {
    backgroundColor: 'warning',
    borderColor: 'transparent',
    textColor: 'text_high_emphasis',
  },
  info: {
    backgroundColor: 'info',
    borderColor: 'transparent',
    textColor: 'white',
  },
  light: {
    backgroundColor: 'light',
    borderColor: 'outline',
    textColor: 'label',
  },
  dark: {
    backgroundColor: 'dark',
    borderColor: 'transparent',
    textColor: 'white',
  },
  transparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: 'text_high_emphasis',
  },
};

const ButtonContainer = styled.TouchableOpacity<ButtonTouchableStyledInterface>`
  width: 100%;
  height: ${({ height }): string => `${height}px`};
  border-radius: ${({ theme }): string => theme.units.borderRadius};
  border-width: 1px;
  border-color: ${({ theme, variant }): string =>
    theme.colors[variant.borderColor]};
  background: ${({ theme, variant }): string =>
    theme.colors[variant.backgroundColor]};
  ${({ disabled }): FlattenSimpleInterpolation =>
    disabled &&
    css`
      opacity: 0.6;
    `}
  justify-content: center;
  align-items: center;

  ${Platform.select({
    web: css`
      outline-width: 0;
    `,
  })}
`;

const ButtonText = styled.Text<ButtonStyledInterface>`
  font-family: ${({ theme }): string => theme.fonts.roboto_400};
  font-size: 16px;
  color: ${({ theme, variant }): string => theme.colors[variant.textColor]};
  text-transform: uppercase;
`;

export const ButtonComponentStyled = {
  ButtonContainer,
  ButtonText,
  Scheme,
};
