import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const PencilWriteIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="m13.068 14.184 -3.795 0.543 0.543 -3.795 9.758 -9.758a2.3 2.3 0 1 1 3.252 3.252Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M12 5.5H2.5a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2V12"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const GroupPeopleIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="M3.25 7.75a4.25 4.25 0 1 0 8.5 0 4.25 4.25 0 1 0 -8.5 0Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M0.5 20.5a7 7 0 0 1 14 0Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M16.5 20.5h7a5.5 5.5 0 0 0 -8.027 -4.885"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M14.694 10.25a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const EarthIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="M10 21.45A10.5 10.5 0 1 1 21.45 10"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M0.66 9.17h5.55a2.72 2.72 0 0 1 1.94 0.83l1 1a2.73 2.73 0 0 1 0.11 3.76L8 16.16A2.72 2.72 0 0 0 7.35 18v2.87"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M18.54 3.7h-5.29a2.05 2.05 0 1 0 0 4.1h0.39A2.74 2.74 0 0 1 15.92 9l0.25 0.37"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M11.5 17.5a6 6 0 1 0 12 0 6 6 0 1 0 -12 0"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m17.5 14.5 0 6"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m20.5 17.5 -6 0"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const SettingLeafIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="M19.92 7.21a1.91 1.91 0 0 0 0 1.52 1.88 1.88 0 0 0 1.11 1l1.26 0.45a1.88 1.88 0 0 1 0 3.54l-1.29 0.5a1.88 1.88 0 0 0 -1.11 1 1.91 1.91 0 0 0 0 1.52L20.5 18a1.88 1.88 0 0 1 -2.5 2.5l-1.21 -0.58a1.91 1.91 0 0 0 -1.52 0 1.88 1.88 0 0 0 -1 1.11l-0.45 1.26a1.88 1.88 0 0 1 -3.54 0L9.78 21a1.88 1.88 0 0 0 -1 -1.11 1.91 1.91 0 0 0 -1.52 0L6 20.5A1.88 1.88 0 0 1 3.5 18l0.58 -1.21a1.91 1.91 0 0 0 0 -1.52 1.88 1.88 0 0 0 -1.11 -1l-1.26 -0.45a1.88 1.88 0 0 1 0 -3.54L3 9.78a1.88 1.88 0 0 0 1.11 -1 1.91 1.91 0 0 0 0 -1.52L3.5 6A1.88 1.88 0 0 1 6 3.5l1.21 0.58a1.91 1.91 0 0 0 1.52 0A1.88 1.88 0 0 0 9.78 3l0.45 -1.26a1.88 1.88 0 0 1 3.54 0L14.22 3a1.88 1.88 0 0 0 1 1.11 1.91 1.91 0 0 0 1.52 0L18 3.5A1.88 1.88 0 0 1 20.5 6Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />

        <Path
          d="M17 7.27s0 9 -5.32 9a3.68 3.68 0 0 1 0 -7.36A13 13 0 0 0 17 7.27Z"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M8 17.5a8.42 8.42 0 0 1 4.91 -5.73"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export { PencilWriteIcon, GroupPeopleIcon, EarthIcon, SettingLeafIcon };
