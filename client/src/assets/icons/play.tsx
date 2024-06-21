import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const PlayIcon: React.FC<IconProps> = (props) => {
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
          d="M2.338 3.255v17.49a1.5 1.5 0 0 0 2.209 1.322l16.323 -8.745a1.5 1.5 0 0 0 0 -2.644L4.547 1.933a1.5 1.5 0 0 0 -2.209 1.322Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default PlayIcon;
