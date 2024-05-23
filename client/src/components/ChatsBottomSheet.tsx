import React, { useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';
import ClearChatHistoryModal from './ClearChatHistoryModal';
import FontSizeModal from './FontSizeModal';
import WallpaperModal from './WallpaperModal';

interface ChatsBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const ChatsBottomSheet: React.FC<ChatsBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const [wallpaperColorModalVisible, setWallpaperColorModalVisible] = useState(false);
  const [clearChatHistoryModalVisible, setClearChatHistoryModalVisible] = useState(false);

  const content = (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
        }}
      >
        Chat Settings
      </Text>

      <View
        style={{
          gap: 30,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.4)',
          }}
          onPress={() => setFontSizeModalVisible(true)}
        >
          <Text>Font Size</Text>
          <Text>Icon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.4)',
          }}
          onPress={() => setWallpaperColorModalVisible(true)}
        >
          <Text>Wallpaper Color</Text>
          <Text>Icon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.4)',
          }}
          onPress={() => setClearChatHistoryModalVisible(true)}
        >
          <Text>Clear Chat History</Text>
          <Text>Icon</Text>
        </TouchableOpacity>
      </View>

      {fontSizeModalVisible && (
        <FontSizeModal
          isVisible={fontSizeModalVisible}
          onClose={() => setFontSizeModalVisible(false)}
        />
      )}

      {wallpaperColorModalVisible && (
        <WallpaperModal
          isVisible={wallpaperColorModalVisible}
          onClose={() => setWallpaperColorModalVisible(false)}
        />
      )}

      {clearChatHistoryModalVisible && (
        <ClearChatHistoryModal
          isVisible={clearChatHistoryModalVisible}
          onClose={() => setClearChatHistoryModalVisible(false)}
        />
      )}
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
        height: SCREEN_HEIGHT * 0.4,
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

export default ChatsBottomSheet;
