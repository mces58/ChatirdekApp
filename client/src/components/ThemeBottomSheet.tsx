import React from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { MoonThemeIcon, SunThemeIcon } from 'src/assets/icons/theme';
import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface ThemeBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const ThemeBottomSheet: React.FC<ThemeBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  const content = (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
        }}
      >
        Choose your theme
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.color,
        }}
        onPress={setLightTheme}
      >
        <Text
          style={{
            color: theme.color,
          }}
        >
          Light
        </Text>
        <SunThemeIcon width={30} height={30} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.color,
        }}
        onPress={setDarkTheme}
      >
        <Text
          style={{
            color: theme.color,
          }}
        >
          Dark
        </Text>
        <MoonThemeIcon width={30} height={30} />
      </TouchableOpacity>
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
        height: SCREEN_HEIGHT * 0.3,
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

export default ThemeBottomSheet;
