import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const GhostIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M28.4 11.65094c1.8 0 3.2 1.4 3.2 3.2 0 1.8 -1.4 3.2 -3.2 3.2 -1.8 0 -3.2 -1.4 -3.2 -3.2 0 -1.8 1.4 -3.2 3.2 -3.2Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M37.4002 17.65096c2.2 -0.6 3.8 -1.99998 5.6 -3.59998 1.2 -1.2 3.4 -0.40002 3.4 1.39998 -0.2 8.40004 -4.2 11.40004 -9 14.00004M10.60016 17.65096c-2.2 -0.6 -3.80006 -1.99998 -5.60006 -3.59998 -1.2 -1.2 -3.400002 -0.40002 -3.400002 1.39998 0.2 8.40004 4.200042 11.40004 9.000062 14.00004m13.40004 14.4c3.6 0 4.4 -3.6 9.8 -0.8 5.4 2.6 9.8 0 8 -1.8 -1.8 -1.8 -4.4 -5.4 -4.4 -8.8l0 -15.20004c0 -7.4 -6 -13.4 -13.4 -13.4 -7.40004 0 -13.40004 6 -13.40004 13.4l0 15.20004c0 3.6 -2.60002 7.2 -4.40002 8.8 -1.8 1.6 2.6 4.4 8 1.8 5.4 -2.6 6.20006 0.8 9.80006 0.8Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M17 23.451s2 1 6.8 1 6.8 -1 6.8 -1"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M28.2 24.125v4.1552c0 2.4932 -2 4.5708 -4.4 4.5708 -2.4 0 -4.39998 -2.0776 -4.39998 -4.5708v-4.1552"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.3999 16.48748c-0.41422 0 -0.75 -0.33578 -0.75 -0.75 0 -0.4142 0.33578 -0.75 0.75 -0.75"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.3999 16.48748c0.41422 0 0.75 -0.33578 0.75 -0.75 0 -0.4142 -0.33578 -0.75 -0.75 -0.75"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default GhostIcon;
