import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import CloseIcon from 'src/assets/icons/close';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
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
        <CloseIcon
          width={ScaleHorizontal(25)}
          height={ScaleVertical(25)}
          customColor={Colors.primaryColors.danger}
        />
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
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(18),
      borderRadius: ScaleHorizontal(20),
      alignItems: 'center',
      gap: 20,
    },
    closeButton: {
      position: 'absolute',
      top: ScaleVertical(10),
      right: ScaleHorizontal(10),
    },
    title: {
      fontSize: ScaleFontSize(18),
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    selectedColor: {
      width: ScaleHorizontal(80),
      height: ScaleHorizontal(80),
      borderRadius: ScaleHorizontal(99),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: ScaleHorizontal(2),
      borderColor: theme.borderColor,
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 20,
    },
    colorOption: {
      width: ScaleHorizontal(50),
      height: ScaleHorizontal(50),
      borderRadius: ScaleHorizontal(99),
    },
    btn: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: ScaleHorizontal(20),
      paddingVertical: ScaleVertical(10),
      paddingHorizontal: ScaleHorizontal(10),
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
      backgroundColor: Colors.primaryColors.success,
    },
    btnText: {
      color: Colors.primaryColors.light,
      fontSize: ScaleFontSize(13),
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
      elevation: 3,
    },
  });
