import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface PenIconProps {
  width: number;
  height: number;
  strokeWidth?: number;
  opacity?: number;
}

const PenIcon: FC<PenIconProps> = (props) => {
  const { width, height, strokeWidth = 2, opacity = 1 } = props;
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
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M59.2935 12.05140125c1.10775 -1.107645 1.729875 -2.6099325 1.729875 -4.176375 0 -1.5664425000000002 -0.6221249999999999 -3.0687300000000004 -1.729875 -4.176375C58.18575 2.59101675 56.6834625 1.96875 55.117125 1.96875s-3.068625 0.62226675 -4.176375 1.72990125L21.3675 33.271875l8.35275 8.35275L59.2935 12.05140125Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21.3675 33.2721375 -3.656625 12.009375 12.009375 -3.656625m18.267374999999998 -34.97298 8.35275 8.35275M9.835875 49.2190125H7.875c-1.5664425000000002 0 -3.06870375 0.6221249999999999 -4.17634875 1.729875C2.591014125 52.056374999999996 1.96875 53.558662500000004 1.96875 55.1252625c0 1.5663375 0.6222641250000001 3.068625 1.72990125 4.1761125 1.107645 1.10775 2.60990625 1.7301375 4.17634875 1.7301375h41.34375"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default PenIcon;
