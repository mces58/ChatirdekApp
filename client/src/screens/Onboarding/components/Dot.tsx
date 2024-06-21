import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Colors } from 'src/constants/color/colors';

interface DotProps {
  index: number;
  x: SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({ index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [10, 20, 10],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [
        Colors.primaryColors.dark,
        Colors.primaryColors.darkBlue,
        Colors.primaryColors.orange,
      ]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle, animatedColor]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
    borderRadius: 50,
  },
});
