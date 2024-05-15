import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width: number;
  height: number;
  color: string;
}

const ChatIcon: FC<IconProps> = (props) => {
  const { width, height, color } = props;
  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M1.00007 11c0 -5.52285 4.47716 -10 10.00003 -10 4.4981 0 8.3026 2.96991 9.5595 7.0558C19.1178 7.07394 17.3759 6.5 15.5 6.5c-4.9706 0 -9 4.0294 -9 9 0 2.0712 0.69965 3.979 1.8755 5.4999l-8.179699 -0.0002 2.640079 -4.2239C1.67999 15.1446 1.00007 13.1506 1.00007 11ZM8 15.5C8 11.3579 11.3579 8 15.5 8s7.5 3.3579 7.5 7.5c0 1.5461 -0.4688 2.9847 -1.2714 4.179l2.0757 3.3208L15.5 23C11.3579 23 8 19.6421 8 15.5Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const UpdateIcon: FC<IconProps> = (props) => {
  const { width, height, color } = props;
  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M12 24c6.2907 0 11.4508 -4.8405 11.9589 -11h-5.028c-0.4774 3.4168 -3.3708 6 -6.9309 6 -3.56008 0 -6.45354 -2.5832 -6.93087 -6H0.0410728C0.549224 19.1595 5.70934 24 12 24Zm11.9589 -13h-5.028C18.4535 7.58317 15.5601 5 12 5c-3.56008 0 -6.45354 2.58317 -6.93087 6H0.0410728C0.549224 4.84047 5.70934 0 12 0c6.2907 0 11.4508 4.84047 11.9589 11ZM12 7c2.8 0 5 2.2 5 5s-2.2 5 -5 5 -5 -2.2 -5 -5 2.2 -5 5 -5Zm2 5c0 1.1046 -0.8954 2 -2 2s-2 -0.8954 -2 -2 0.8954 -2 2 -2 2 0.8954 2 2Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const NewIcon: FC<IconProps> = (props) => {
  const { width, height, color } = props;
  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M8 1c0 -0.552285 -0.44772 -1 -1 -1S6 0.447715 6 1v5H1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1h5v5c0 0.5523 0.44772 1 1 1s1 -0.4477 1 -1V8h5c0.5523 0 1 -0.44772 1 -1s-0.4477 -1 -1 -1H8V1Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const GroupIcon: FC<IconProps> = (props) => {
  const { width, height, color } = props;
  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M6 11c2.76142 0 5 -2.23858 5 -5S8.76142 1 6 1 1 3.23858 1 6s2.23858 5 5 5Zm12 0c2.7614 0 5 -2.23858 5 -5s-2.2386 -5 -5 -5 -5 2.23858 -5 5 2.2386 5 5 5Zm-7 7c0 2.7614 -2.23858 5 -5 5s-5 -2.2386 -5 -5 2.23858 -5 5 -5 5 2.2386 5 5Zm7 5c2.7614 0 5 -2.2386 5 -5s-2.2386 -5 -5 -5 -5 2.2386 -5 5 2.2386 5 5 5Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const SettingIcon: FC<IconProps> = (props) => {
  const { width, height, color } = props;
  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M20.3504 10.0833c0.1405 0.6289 0.2123 1.2717 0.2141 1.9167 -0.0018 0.645 -0.0736 1.2878 -0.2141 1.9167L23 16.6909l-1.972 3.2498 -3.6153 -1.1771c-0.7806 0.6455 -1.6666 1.1458 -2.6175 1.4782L13.8735 24h-3.747l-0.92173 -3.756c-0.95103 -0.333 -1.83707 -0.8341 -2.61752 -1.4804l-3.61528 1.1739L1 16.6909l2.64964 -2.7742c-0.28547 -1.2612 -0.28547 -2.5722 0 -3.8334L1 7.30909l1.97197 -3.24764 3.61528 1.17491c0.78061 -0.64544 1.66664 -1.14581 2.61752 -1.47818L10.1265 0h3.747l0.9217 3.756c0.9511 0.33304 1.8371 0.83414 2.6175 1.48036l3.6153 -1.17491L23 7.30909l-2.6496 2.77421ZM17 12c0 2.7614 -2.2386 5 -5 5 -2.76142 0 -5 -2.2386 -5 -5 0 -2.76142 2.23858 -5 5 -5 2.7614 0 5 2.23858 5 5Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

export { ChatIcon, GroupIcon, NewIcon, UpdateIcon, SettingIcon };
