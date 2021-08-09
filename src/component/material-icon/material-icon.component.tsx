import React from 'react';
import { materialIconStyle } from './material-icon.style';
import { MaterialIconNameType } from '../../type/material-icon-name.type';
import { ColorsType } from '../../theme/colors';

const { Wrapper, MaterialIconStyled } = materialIconStyle;

export function MaterialIconComponent({
  name,
  size = 30,
  active = true,
  color = 'white',
  onPress,
}: {
  name: MaterialIconNameType;
  size?: number;
  active?: boolean;
  color?: ColorsType;
  onPress?: () => void;
}): JSX.Element {
  return (
    <Wrapper>
      <MaterialIconStyled
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        active={active}
      />
    </Wrapper>
  );
}
