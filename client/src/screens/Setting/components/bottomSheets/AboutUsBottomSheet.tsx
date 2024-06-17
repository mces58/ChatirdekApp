import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';

import i18next from 'i18next';

import Logo from 'src/assets/icons/logo';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface AboutUsBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const AboutUsBottomSheet: React.FC<AboutUsBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);

  const content = (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Logo width={2100} height={330} />

      <Text style={styles.text}>{i18next.t('settings.aboutus.message')}</Text>
    </ScrollView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default AboutUsBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.5,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    container: {
      flex: 1,
    },
    scrollViewContent: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 10,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: 14,
    },
  });
