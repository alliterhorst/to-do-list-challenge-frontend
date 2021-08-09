import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { FloatMenuComponentStyled } from './float-menu.style';

const {
  BackgroundArea,
  ViewLayout,
  ViewMenu,
  BackgroundAnimatedView,
  TouchableOptionMenu,
  TextMenu,
  SeparatorItem,
} = FloatMenuComponentStyled;

const animationDuration = 300;

export type OptionMenuType = {
  text: string;
  disabled: boolean;
  onPress: () => void;
};

export function FloatMenuComponent({
  options,
  onPressOutOfMenu,
}: {
  options: OptionMenuType[];
  onPressOutOfMenu: () => void;
}): JSX.Element {
  const animate = React.useRef(new Animated.Value(0)).current;

  const opacityAnimation = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  const slideAnimation = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  useEffect(() => {
    Animated.timing(animate, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ViewLayout>
      <BackgroundArea
        onPress={async (): Promise<void> => {
          Animated.timing(animate, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
          await new Promise(resolve => setTimeout(resolve, animationDuration));
          onPressOutOfMenu();
        }}
      >
        <BackgroundAnimatedView style={[{ opacity: opacityAnimation }]} />
      </BackgroundArea>
      <ViewMenu style={[{}, { transform: [{ translateX: slideAnimation }] }]}>
        {options.map((option, index) => (
          <TouchableOptionMenu
            key={index}
            onPress={option.onPress}
            disabled={option.disabled}
          >
            <TextMenu disabled={option.disabled}>{option.text}</TextMenu>
            <SeparatorItem />
          </TouchableOptionMenu>
        ))}
      </ViewMenu>
    </ViewLayout>
  );
}
