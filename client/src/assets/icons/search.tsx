import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SearchIconProps {
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}

const SearchIcon: FC<SearchIconProps> = (props) => {
  const { width, height, color, strokeWidth = 2, opacity = 1 } = props;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M2.407 11.0752C2.407 6.2879 6.2878 2.4071 11.0751 2.4071C15.8623 2.4071 19.7431 6.2879 19.7431 11.0752C19.7431 15.8624 15.8623 19.7432 11.0751 19.7432C6.2878 19.7432 2.407 15.8624 2.407 11.0752ZM11.0751 0.2401C5.091 0.2401 0.24 5.0911 0.24 11.0752C0.24 17.0592 5.091 21.9102 11.0751 21.9102C13.677 21.9102 16.0647 20.9932 17.9326 19.4644L22.2276 23.7599L23.76 22.2276L19.4648 17.9321C20.9931 16.0644 21.9101 13.6769 21.9101 11.0752C21.9101 5.0911 17.059 0.2401 11.0751 0.2401ZM9.9916 5.3191C9.9916 6.1942 9.4071 7.3734 8.3902 8.3903C7.3733 9.4072 6.1941 9.9917 5.3189 9.9917V12.1587C6.1941 12.1587 7.3733 12.7431 8.3902 13.76C9.4071 14.777 9.9916 15.9561 9.9916 16.8313H12.1586C12.1586 15.9561 12.743 14.777 13.7599 13.76C14.7769 12.7431 15.956 12.1587 16.8312 12.1587V9.9917C15.956 9.9917 14.7769 9.4072 13.7599 8.3903C12.743 7.3734 12.1586 6.1942 12.1586 5.319H9.9916Z"
          clipRule="evenodd"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

export default SearchIcon;
