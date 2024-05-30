import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface AddUserIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const AddUserIcon: FC<AddUserIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

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
          d="M31.5 48.5625H5.25v-7.35a45.730125 45.730125 0 0 1 22.3125 -5.775c4.5596250000000005 0 8.967 0.664125 13.125 1.903125"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          d="M17.0625 16.40625a11.15625 11.15625 0 1 0 22.3125 0 11.15625 11.15625 0 1 0 -22.3125 0"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          d="M60.375 48.5625h-23.625m11.8125 -11.8125v23.625"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default AddUserIcon;
