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
import { FontSize, fontSizes, useFontSize } from 'src/context/FontSizeContext';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface FontSizeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FontSizeModal: React.FC<FontSizeModalProps> = ({ isVisible, onClose }) => {
  const { fontSize, setFontSize } = useFontSize();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [fonts] = useState<FontSize[]>(fontSizes);

  const handleFontSizeChange = (fontSize: FontSize) => {
    setFontSize(fontSize);
    onClose();
  };

  const renderFontSize = (selectedFontSize: FontSize, index: number) => {
    const isSelected = selectedFontSize.label === fontSize.label;
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => handleFontSizeChange(selectedFontSize)}
      >
        <View style={styles.circle}>
          <View style={[styles.defaultButton, isSelected && styles.actionButton]} />
        </View>
        <Text style={styles.text}>
          {i18next.t(`settings.chatsBottomSheet.${selectedFontSize.label}`)}
        </Text>
      </TouchableOpacity>
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
      <Text style={styles.title}>{i18next.t('settings.chatsBottomSheet.FontSize')}</Text>

      <View style={styles.container}>
        {fonts.map((font, index) => renderFontSize(font, index))}
      </View>
    </View>
  );

  return <BaseModal isVisible={isVisible} onClose={onClose} content={content} />;
};

export default FontSizeModal;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: ScaleHorizontal(20),
      paddingVertical: ScaleVertical(20),
      borderRadius: ScaleHorizontal(20),
      alignItems: 'center',
      gap: 20,
    },
    title: {
      fontSize: ScaleFontSize(18),
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    closeButton: {
      position: 'absolute',
      top: ScaleVertical(10),
      right: ScaleHorizontal(10),
    },
    container: {
      width: '100%',
      gap: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },
    circle: {
      borderWidth: ScaleHorizontal(1.5),
      borderColor: theme.borderColor,
      padding: 2,
      borderRadius: ScaleHorizontal(50),
    },
    actionButton: {
      backgroundColor: Colors.primaryColors.success,
      borderRadius: ScaleHorizontal(50),
      height: ScaleVertical(12),
      width: ScaleHorizontal(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultButton: {
      backgroundColor: 'transparent',
      borderRadius: ScaleHorizontal(50),
      height: ScaleVertical(12),
      width: ScaleHorizontal(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.textColor,
      fontSize: ScaleFontSize(13),
      fontFamily: 'Nunito-Regular',
    },
  });
