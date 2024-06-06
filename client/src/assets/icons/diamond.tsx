import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface DiamondProps {
  width: number;
  height: number;
  customColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

const DiamondIcon: React.FC<DiamondProps> = (props) => {
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
          d="m43.6947 22.3055 0.6945 -0.6945c0.9523 -0.9523 1.1533 -2.4224 0.4917 -3.5953l-5.3532 -9.48966C38.9958 7.58319 37.9973 7 36.9148 7H11.0856c-1.0825 0 -2.08104 0.58319 -2.6129 1.52604L3.11956 18.0157c-0.66166 1.1729 -0.46063 2.643 0.49162 3.5953L22.586 40.5858c0.781 0.781 2.0474 0.781 2.8284 0L28.5002 37.5"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M3 20h25"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M35.303 20.7698c0.2497 -0.6332 1.1457 -0.6332 1.3954 0l2.2542 5.7156c0.1017 0.2577 0.3057 0.4617 0.5634 0.5634l5.7157 2.2542c0.6331 0.2497 0.6331 1.1457 0 1.3954l-5.7157 2.2542c-0.2577 0.1017 -0.4617 0.3057 -0.5634 0.5634l-2.2542 5.7157c-0.2497 0.6331 -1.1457 0.6331 -1.3954 0l-2.2542 -5.7157c-0.1017 -0.2577 -0.3057 -0.4617 -0.5634 -0.5634l-5.7156 -2.2542c-0.6332 -0.2497 -0.6332 -1.1457 0 -1.3954l5.7156 -2.2542c0.2577 -0.1017 0.4617 -0.3057 0.5634 -0.5634l2.2542 -5.7156Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="m18.7716 7 -2.9553 11.7402c-0.2061 0.8188 -0.1478 1.6818 0.1665 2.4655l8.0079 19.9659h0.017"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="m29.2266 7 1.762 7"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default DiamondIcon;
