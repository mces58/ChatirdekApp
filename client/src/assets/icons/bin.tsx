import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const BinIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="-0.5 -0.5 64 64"
        fill="none"
        opacity={opacity}
      >
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.625 13.125h57.75"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M37.40625 2.625h-11.8125c-1.0442775 0 -2.04582 0.41485500000000003 -2.7842325 1.1532675000000001C22.071105 4.51668 21.65625 5.5182225 21.65625 6.5625V13.125h19.6875V6.5625c0 -1.0442775 -0.41475 -2.04582 -1.1531625 -2.7842325C39.452175000000004 3.0398549999999998 38.450475 2.625 37.40625 2.625Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M25.59375 46.59375v-19.6875"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M37.40625 46.59375v-19.6875"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M49.5075 56.752500000000005c-0.072975 0.9864750000000001 -0.5171250000000001 1.9086375 -1.2429375 2.5808999999999997 -0.7255499999999999 0.672 -1.6792125000000002 1.044225 -2.6683125 1.0415999999999999H17.40375c-0.98917875 0.002625 -1.9426575000000001 -0.36960000000000004 -2.66839125 -1.0415999999999999 -0.72573375 -0.6722625 -1.1698312499999999 -1.5944250000000002 -1.24285875 -2.5808999999999997L9.84375 13.125h43.3125l-3.6487499999999997 43.627500000000005Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default BinIcon;
