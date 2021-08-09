import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components/native';
import { ColorsType } from '../../theme/colors';

interface MaterialIconStyledInterface {
  color: ColorsType;
  size: number;
  active: boolean;
  highlighted: boolean;
}

const Wrapper = styled.View``;

const MaterialIconStyled = styled(
  MaterialCommunityIcons,
)<MaterialIconStyledInterface>`
  color: ${({ theme, color }): string => theme.colors[color]};
  font-size: ${({ size }): string => `${size}px`};
  ${({ active }): FlattenSimpleInterpolation =>
    !active &&
    css`
      opacity: 0.6;
    `}
`;

export const materialIconStyle = {
  Wrapper,
  MaterialIconStyled,
};
