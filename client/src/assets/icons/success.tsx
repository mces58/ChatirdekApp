import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SuccessIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const SuccessIcon: FC<SuccessIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" opacity={opacity}>
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.2857142857142856 39.08594285714286 14.765714285714285 55.13142857142857c0.42111999999999994 0.5472 0.9607314285714286 0.992 1.5782857142857143 1.3010285714285714 0.6175542857142856 0.30857142857142855 1.2970514285714285 0.47359999999999997 1.9874285714285715 0.4818285714285714 0.6792685714285714 0.008228571428571427 1.3517714285714286 -0.13577142857142857 1.9685942857142857 -0.42011428571428566 0.6167771428571429 -0.2848 1.1623771428571428 -0.7035428571428571 1.5971199999999999 -1.2256L61.71428571428571 7.085942857142856"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default SuccessIcon;
