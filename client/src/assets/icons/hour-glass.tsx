import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface HourGlassIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const HourGlassIcon: FC<HourGlassIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="M18.5 5.5a6.5 6.5 0 0 1 -13 0v-5h13Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M18.5 18.5a6.5 6.5 0 0 0 -13 0v5h13Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m3.5 0.501 17 0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m3.5 23.501 17 0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m5.5 19.501 3.5 0 3 -3 3 3 3.5 0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m6.896 9.501 10.208 0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default HourGlassIcon;
