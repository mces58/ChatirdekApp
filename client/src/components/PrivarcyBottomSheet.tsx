import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';
import SwitchButton from './SwitchButton';

interface PrivacyBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const PrivacyBottomSheet: React.FC<PrivacyBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();

  const content = (
    <View
      style={{
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 20,
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          paddingBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Online Status Hide
        </Text>
        <SwitchButton activeColor={'#FFA901'} inActiveColor={'#F2F5F7'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Profile Picture Hide
        </Text>
        <SwitchButton activeColor={'#FFA901'} inActiveColor={'#F2F5F7'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          About Hide
        </Text>
        <SwitchButton activeColor={'#FFA901'} inActiveColor={'#F2F5F7'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Last Seen Hide
        </Text>
        <SwitchButton activeColor={'#FFA901'} inActiveColor={'#F2F5F7'} />
      </View>
    </View>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={{
        height: SCREEN_HEIGHT * 0.5,
        backgroundColor: theme.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
      }}
    />
  );
};

export default PrivacyBottomSheet;
