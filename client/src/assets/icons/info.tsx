import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const InfoIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
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
          d="M12 23c6.0751 0 11 -4.9249 11 -11 0 -6.07513 -4.9249 -11 -11 -11C5.92487 1 1 5.92487 1 12c0 6.0751 4.92487 11 11 11Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.9412 16.8512v-6.1396c0 -0.2327 -0.0924 -0.4557 -0.2569 -0.6202 -0.1645 -0.16452 -0.3876 -0.25693 -0.6202 -0.25693h-0.8771"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.5026 7.94752c-0.2422 0 -0.4385 -0.19634 -0.4385 -0.43854s0.1963 -0.43855 0.4385 -0.43855"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.5027 7.94752c0.2422 0 0.4386 -0.19634 0.4386 -0.43854s-0.1964 -0.43855 -0.4386 -0.43855"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.187 16.8512h3.626"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default InfoIcon;
