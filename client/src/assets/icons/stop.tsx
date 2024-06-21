import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const StopIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1.5, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M0.75 11.998a11.25 11.25 0 1 0 22.5 0 11.25 11.25 0 1 0 -22.5 0Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 8.248 7.5 0 0 7.5 -7.5 0Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default StopIcon;
