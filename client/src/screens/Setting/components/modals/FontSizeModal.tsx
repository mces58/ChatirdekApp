import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CloseIcon from 'src/assets/icons/close';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

import { FontSize, fontSizes } from '../../constants/font-size';

interface FontSizeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FontSizeModal: React.FC<FontSizeModalProps> = ({ isVisible, onClose }) => {
  const [selectedFontSize, setSelectedFontSize] = useState<FontSize>(fontSizes[1]);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [fonts] = useState<FontSize[]>(fontSizes);

  const handleFontSizeChange = (fontSize: FontSize) => {
    setSelectedFontSize(fontSize);
    onClose();
  };

  const renderFontSize = (fontSize: FontSize, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => handleFontSizeChange(fontSize)}
      >
        <View style={styles.circle}>
          <View
            style={[
              styles.defaultButton,
              selectedFontSize.label === fontSize.label && styles.actionButton,
            ]}
          />
        </View>
        <Text style={styles.text}>{fontSize.label}</Text>
      </TouchableOpacity>
    );
  };

  const content = (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <CloseIcon width={30} height={30} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>Font Size</Text>

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
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
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
      borderWidth: 1.5,
      borderColor: theme.borderColor,
      padding: 2,
      borderRadius: 50,
    },
    actionButton: {
      backgroundColor: Colors.primaryColors.success,
      borderRadius: 50,
      height: 12,
      width: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultButton: {
      backgroundColor: 'transparent',
      borderRadius: 50,
      height: 12,
      width: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.textColor,
      fontSize: 16,
      fontFamily: 'Nunito-Regular',
    },
  });
