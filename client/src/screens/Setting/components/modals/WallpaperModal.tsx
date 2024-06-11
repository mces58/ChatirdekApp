import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import CloseIcon from 'src/assets/icons/close';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { useWallpaper, walpaperColors } from 'src/context/WallpaperContext';

interface WallpaperModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ isVisible, onClose }) => {
  const { wallpaper, setWallpaper } = useWallpaper();
  const [selectedColor, setSelectedColor] = useState<string>(wallpaper.color);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleColorChange = (color: string) => {
    setWallpaper({ color });
    onClose();
  };

  const renderColorOption = (color: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.colorOption, { backgroundColor: color }, styles.shadow]}
        onPress={() => setSelectedColor(color)}
      />
    );
  };

  const content = (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <CloseIcon width={30} height={30} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>
        {i18next.t('settings.chatsBottomSheet.WallpaperColor')}
      </Text>

      <View
        style={[styles.selectedColor, { backgroundColor: selectedColor }, styles.shadow]}
      />

      <View style={styles.colorContainer}>
        {walpaperColors.map((color, index) => renderColorOption(color, index))}
      </View>

      <TouchableOpacity
        style={[styles.btn, styles.shadow]}
        onPress={() => handleColorChange(selectedColor)}
      >
        <Text style={styles.btnText}>{i18next.t('global.confirm')}</Text>
      </TouchableOpacity>
    </View>
  );

  return <BaseModal isVisible={isVisible} onClose={onClose} content={content} />;
};

export default WallpaperModal;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 20,
      alignItems: 'center',
      gap: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    selectedColor: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: theme.borderColor,
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 20,
    },
    colorOption: {
      width: 60,
      height: 60,
      borderRadius: 99,
    },
    btn: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: Colors.primaryColors.success,
    },
    btnText: {
      color: Colors.primaryColors.light,
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
