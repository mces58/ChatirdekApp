import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const MicrophoneIcon: React.FC<IconProps> = (props) => {
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
          d="m12 19.5 0 3.75"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.5 0.75h1s4 0 4 4V12s0 4 -4 4h-1s-4 0 -4 -4V4.75s0 -4 4 -4"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 9.75V12a7.5 7.5 0 0 0 7.5 7.5h1A7.5 7.5 0 0 0 20 12V9.75"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default MicrophoneIcon;
