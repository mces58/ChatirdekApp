import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IdIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const IdIcon: FC<IdIconProps> = (props) => {
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
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M57.14285714285714 11.428571428571427h-50.285714285714285c-2.5247314285714286 0 -4.571428571428571 2.04672 -4.571428571428571 4.571428571428571v32c0 2.5248 2.0466971428571425 4.571428571428571 4.571428571428571 4.571428571428571h50.285714285714285c2.5248 0 4.571428571428571 -2.0466285714285712 4.571428571428571 -4.571428571428571v-32c0 -2.524708571428571 -2.0466285714285712 -4.571428571428571 -4.571428571428571 -4.571428571428571Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.57142857142857 38.857142857142854C24.35853714285714 38.857142857142854 27.428571428571427 35.78710857142857 27.428571428571427 32s-3.0700342857142857 -6.857142857142857 -6.857142857142857 -6.857142857142857S13.714285714285714 28.212891428571428 13.714285714285714 32s3.0700342857142857 6.857142857142857 6.857142857142857 6.857142857142857Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M38.857142857142854 25.142857142857142H50.285714285714285"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M38.857142857142854 38.857142857142854H50.285714285714285"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default IdIcon;
