import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface ArrowIconProps {
  width: number;
  height: number;
  direction: 'top' | 'right' | 'bottom' | 'left';
  strokeWidth?: number;
  opacity?: number;
}

const ArrowIcon: FC<ArrowIconProps> = (props) => {
  const { width, height, direction, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();
  let d = '';
  switch (direction) {
    case 'top':
      d = 'M24 20L16 12L8 20';
      break;
    case 'right':
      d = 'M12 24L20 16L12 8';
      break;
    case 'bottom':
      d = 'M8 12L16 20L24 12';
      break;
    case 'left':
      d = 'M20 8L12 16L20 24';
      break;
    default:
      break;
  }

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <Path
          d={d}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

export default ArrowIcon;
