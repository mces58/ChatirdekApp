import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const SendIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 0.7, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.18201 7.763 1.508 1.509c0.0936 0.09376 0.20956 0.1621 0.33693 0.19857 0.12737 0.03646 0.26194 0.03983 0.39098 0.0098 0.12903 -0.03003 0.24828 -0.09248 0.34646 -0.18143 0.09818 -0.08896 0.17205 -0.20149 0.21463 -0.32694l2.481 -7.448c0.04565 -0.13706 0.05225 -0.28411 0.01904 -0.4247 -0.0332 -0.140592 -0.10489 -0.269161 -0.20704 -0.371307 -0.10214 -0.102146 -0.23071 -0.173837 -0.3713 -0.20704 -0.14059 -0.033204 -0.28765 -0.02661 -0.4247 0.019043L1.03201 3.021c-0.12546 0.04257 -0.237986 0.11644 -0.326942 0.21463 -0.088955 0.09818 -0.151401 0.21742 -0.181433 0.34646 -0.030032 0.12904 -0.026658 0.2636 0.009804 0.39097 0.036461 0.12737 0.104805 0.24334 0.19857 0.33694L2.50001 6v3l1.682 -1.237Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.5 6.00001 4.12528 -3.05577"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default SendIcon;
