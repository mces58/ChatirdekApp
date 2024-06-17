import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Line, Path, Text } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const Logo: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 20, opacity = 1 } = props;
  const { theme } = useTheme();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;
  return (
    <View style={{ width: '100%', height: 50 }}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`${-SCREEN_WIDTH} 0 ${width} ${height}`}
        opacity={opacity}
      >
        <Text
          fill={customColor ?? color}
          fontFamily="Poppins-Bold"
          fontSize="302.84"
          transform="translate(400.43 222.59) scale(.60 1)"
        >
          Chatirdek
        </Text>
        <Path
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
          d="M258.64,168.9c13.38-4.88,50-18.24,51.17-37.1,1.52-24.7-58.37-48.82-99.78-57.56-37.14-7.84-88.53-18.69-117.24,13.1-22.45,24.86-23.41,67.86-6.84,96.06,32.24,54.89,126.85,39.75,171.46,28.34,34.17-8.74,112.67-31.6,115.11-76.46,3.04-56.02-114.73-109.66-207.2-116.77-34.84-2.68-77.78-5.32-112.61,24.37C10.96,78.49,12.15,135.18,12.63,146.06c.4,9.16,2.5,57.73,39.21,88.94,7.92,6.73,15.53,11.02,20.89,13.65-.95,41.1,6.27,55.15,14.92,58.42,22.63,8.55,71.66-34.83,71.68-34.85"
        />
        <Line
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
          x1="159.34"
          y1="272"
          x2="1200"
          y2="272"
        />
      </Svg>
    </View>
  );
};

export default Logo;
