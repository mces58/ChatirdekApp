import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CrossIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const CrossIcon: FC<CrossIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m13.5 0.5 -13 13"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m0.5 0.5 13 13"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

export default CrossIcon;
