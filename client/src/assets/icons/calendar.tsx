import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CalendarIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const CalendarIcon: FC<CalendarIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M23.25 21.75c0 0.8 -0.7 1.5 -1.5 1.5H2.25c-0.8 0 -1.5 -0.7 -1.5 -1.5V5.25c0 -0.8 0.7 -1.5 1.5 -1.5h19.5c0.8 0 1.5 0.7 1.5 1.5v16.5Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M0.75 9.75h22.5"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M6.75 5.95V0.75"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M17.25 5.95V0.75"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="m16.4703 13.5499 1.3198 1.3199 2.6398 -2.6397"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M18.35 18.461c-0.52 0 -0.936 0.416 -0.936 0.936s0.416 0.9359 0.936 0.9359c0.5199 0 0.9359 -0.4159 0.9359 -0.9359s-0.416 -0.936 -0.9359 -0.936Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M12 18.461c-0.52 0 -0.936 0.416 -0.936 0.936s0.416 0.9359 0.936 0.9359 0.936 -0.4159 0.936 -0.9359 -0.416 -0.936 -0.936 -0.936Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M12 12.9139c-0.52 0 -0.936 0.416 -0.936 0.936s0.416 0.936 0.936 0.936 0.936 -0.416 0.936 -0.936 -0.416 -0.936 -0.936 -0.936Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M5.65005 18.461c-0.52 0 -0.93599 0.416 -0.93599 0.936s0.41599 0.9359 0.93599 0.9359c0.51999 0 0.93598 -0.4159 0.93598 -0.9359s-0.41599 -0.936 -0.93598 -0.936Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M5.65005 12.9139c-0.52 0 -0.93599 0.416 -0.93599 0.936s0.41599 0.936 0.93599 0.936c0.51999 0 0.93598 -0.416 0.93598 -0.936s-0.41599 -0.936 -0.93598 -0.936Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default CalendarIcon;
