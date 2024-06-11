import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const SendMessageIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="m13.35 21.3501 9.9 -9.5 -9.9 -9.5V7.75h-2.6c-5.5 0 -10 4.5 -10 10v3.3c0 0.3 0.3 0.6 0.6 0.6h0.1c0.2 0 0.4 -0.2 0.5 -0.4 0.2 -2.9 2.6 -5.1 5.5 -5.1h5.9v5.2001Z"
          fill={customColor ?? color}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default SendMessageIcon;
