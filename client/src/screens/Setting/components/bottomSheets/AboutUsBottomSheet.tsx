import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import i18next from 'i18next';

import Logo from 'src/assets/icons/logo';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
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

      <View style={styles.versionContainer}>
        <Text style={styles.text}>{i18next.t('settings.aboutus.version')}</Text>
      </View>
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
      height: SCREEN_HEIGHT * ScaleVertical(0.4),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(8),
    },
    container: {
      flex: 1,
    },
    scrollViewContent: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(18),
      gap: 20,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: ScaleFontSize(12),
    },
    versionContainer: {
      height: ScaleVertical(100),
      justifyContent: 'flex-end',
    },
  });
