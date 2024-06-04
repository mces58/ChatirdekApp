import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CloseIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const CloseIcon: FC<CloseIconProps> = (props) => {
  const { width, height, color, strokeWidth = 1, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.5 4.5 -5 5"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 4.5 5 5"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 13.5c3.5899 0 6.5 -2.9101 6.5 -6.5C13.5 3.41015 10.5899 0.5 7 0.5 3.41015 0.5 0.5 3.41015 0.5 7c0 3.5899 2.91015 6.5 6.5 6.5Z"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

export default CloseIcon;
