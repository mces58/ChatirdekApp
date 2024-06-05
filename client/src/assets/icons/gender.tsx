import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface GenderIconProps {
  width: number;
  height: number;
  customColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

const GenderIcon: React.FC<GenderIconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" opacity={opacity}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ?? customColor}
          d="M3 6a3 3 0 1 0 6 0 3 3 0 1 0 -6 0"
          strokeWidth={strokeWidth}
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ?? customColor}
          d="M6 9v4.5"
          strokeWidth={strokeWidth}
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ?? customColor}
          d="m11 0.5 -3 3"
          strokeWidth={strokeWidth}
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ?? customColor}
          d="M8.5 0.5H11V3"
          strokeWidth={strokeWidth}
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ?? customColor}
          d="M4.5 12 6 13.5 7.5 12"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default GenderIcon;
