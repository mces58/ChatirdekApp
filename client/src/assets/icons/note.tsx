import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const NoteIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.79797714285714 21.565851428571428 0 16.749805714285714"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.777062857142855 21.563862857142855V14.283908571428572c0 -3.3864685714285714 2.1090514285714286 -6.354445714285714 5.140114285714286 -7.173359999999999 1.9867542857142857 -0.5367771428571428 4.003337142857142 -1.0622057142857142 6.049062857142857 -1.5598971428571426 4.536342857142857 -1.103622857142857 9.000617142857141 -2.0183314285714284 13.31136 -2.901630857142857 2.3043428571428572 -0.47213142857142854 4.129371428571428 1.2616765714285714 4.129371428571428 3.8038594285714282v8.117211428571428c-0.4769142857142857 0.1344342857142857 -0.9562285714285713 0.2697257142857143 -1.4372571428571428 0.40553142857142854 -4.242514285714286 1.1975657142857141 -8.635542857142857 2.437645714285714 -13.171954285714284 3.541268571428571 -4.536377142857143 1.1035885714285714 -9.000582857142856 2.018297142857143 -13.311565714285713 2.9016342857142856 -0.23684571428571427 0.04851428571428571 -0.47321142857142856 0.09695999999999999 -0.7091314285714286 0.14533714285714283Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M45.42857142857142 34.56068571428571V14.598617142857142"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.684788571428571 45.42857142857142c4.55256 0 7.11336 -2.5608 7.11336 -7.113257142857142 0 -4.552491428571428 -2.5608 -7.113291428571428 -7.11336 -7.113291428571428S2.571428571428571 33.76282285714286 2.571428571428571 38.31531428571429c0 4.5524571428571425 2.5608 7.113257142857142 7.11336 7.113257142857142Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M38.31531428571429 42.05451428571428c4.5524571428571425 0 7.113257142857142 -2.5608 7.113257142857142 -7.113257142857142 0 -4.552594285714285 -2.5608 -7.113394285714285 -7.113257142857142 -7.113394285714285 -4.552491428571428 0 -7.113291428571428 2.5608 -7.113291428571428 7.113394285714285 0 4.5524571428571425 2.5608 7.113257142857142 7.113291428571428 7.113257142857142Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default NoteIcon;
