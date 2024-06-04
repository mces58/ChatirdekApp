import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface ChatSettingIconProps {
  width: number;
  height: number;
  strokeWidth?: number;
  opacity?: number;
}

const FontSizeIcon: React.FC<ChatSettingIconProps> = (props) => {
  const { width, height, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M43.024 4c0.914 0 1.704 0.621 1.817 1.528 0.175 1.4 0.298 3.645 -0.147 6.228a0.881 0.881 0 0 1 -0.74 0.735 9.231 9.231 0 0 1 -2.54 0.013c-0.394 -0.057 -0.688 -0.38 -0.755 -0.772l-0.365 -2.146h-2.939V22.81h2.004a0.93 0.93 0 0 1 0.926 0.733c0.191 0.94 0.427 2.603 0.05 3.888 -0.105 0.36 -0.459 0.569 -0.834 0.569H29.499c-0.375 0 -0.729 -0.209 -0.834 -0.569 -0.377 -1.285 -0.142 -2.948 0.05 -3.888a0.93 0.93 0 0 1 0.927 -0.733h2.003V9.586h-2.939l-0.365 2.146c-0.067 0.393 -0.361 0.715 -0.756 0.772a9.23 9.23 0 0 1 -2.54 -0.013 0.881 0.881 0 0 1 -0.74 -0.735 21.55 21.55 0 0 1 -0.146 -6.228C24.272 4.62 25.062 4 25.976 4h17.048Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 39a6 6 0 1 0 12 0 6 6 0 1 0 -12 0"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M26.457 41.498c9.328 -0.016 14.243 -0.12 16.487 -0.189 1.016 -0.03 1.927 -0.546 2.023 -1.558a8.288 8.288 0 0 0 0 -1.501c-0.096 -1.013 -1.007 -1.528 -2.023 -1.56 -2.244 -0.067 -7.159 -0.172 -16.487 -0.188m-10.925 4.97c-5.536 -0.038 -8.774 -0.111 -10.476 -0.163 -1.016 -0.03 -1.928 -0.546 -2.023 -1.558a8.322 8.322 0 0 1 0 -1.501c0.095 -1.013 1.007 -1.528 2.023 -1.56 1.702 -0.05 4.94 -0.124 10.476 -0.163"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 7 0.25 -3h15.5L19 7m-8 -3 0 24m-4 0h8"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const PaintBucketIcon: React.FC<ChatSettingIconProps> = (props) => {
  const { width, height, strokeWidth = 2.5, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M45.952 39.0525C45.952 42.2855 43.6119 44.9064 40.7253 44.9064S35.4987 42.2855 35.4987 39.0525C35.4987 36.0706 37.9097 33.0888 39.4567 31.4824C40.1611 30.751 41.2896 30.751 41.9939 31.4824C43.5409 33.0888 45.952 36.0706 45.952 39.0525Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.7396 8.1096C4.3082 7.2943 5.3534 7.0848 6.3106 7.3506C9.3227 8.1871 16.3287 10.1899 22.963 12.5015C24.4641 13.0245 25.3978 14.5813 24.9852 16.1165C24.5726 17.6518 22.9833 18.5345 21.4212 18.2392C14.5164 16.9336 7.4447 15.1753 4.4167 14.3982C3.4544 14.1512 2.6543 13.4486 2.5708 12.4591C2.5168 11.8201 2.539 11.0297 2.7672 10.1807C2.9953 9.3317 3.3725 8.6361 3.7396 8.1096Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.8378 15.4981C7.0619 17.6976 5.1768 20.0951 3.2577 22.632C1.6716 24.7287 1.617 27.5993 3.2612 29.6508C4.476 31.1665 6.0627 33.0143 7.9106 34.8622C9.7584 36.71 11.6062 38.2967 13.1219 39.5115C15.1733 41.1558 18.0439 41.1011 20.1406 39.5151C28.8819 32.9025 35.9674 26.6931 39.002 23.9661C39.8826 23.1748 39.9035 21.8184 39.0664 20.9812L21.7913 3.706C20.9542 2.8689 19.5978 2.8898 18.8065 3.7704C17.6662 5.0393 15.9172 7.0163 13.7845 9.5265"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const BroomIcon: React.FC<ChatSettingIconProps> = (props) => {
  const { width, height, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.969 22.58A8.541 8.541 0 0 1 8.619 20"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.188 21.2a8.545 8.545 0 0 1 -2.531 -2.406"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.357 19.1s-4.115 1.04 -6.947 -5.634a4.229 4.229 0 0 0 -5.545 -2.242c-3.988 1.659 -2.241 5.545 -2.241 5.545s0.822 4.993 3.434 6.51c5.074 0.157 11.299 -4.179 11.299 -4.179Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.029 16.697 7.381 -2.992"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.438 12.1C2.407 8.854 1.78 2.83 1.71 2.085a1.25 1.25 0 0 1 2.49 -0.236c0.181 1.889 0.964 6.968 2.486 9.121"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.92 9.701a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.296 12.951a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.344 14.205a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export { FontSizeIcon, PaintBucketIcon, BroomIcon };
