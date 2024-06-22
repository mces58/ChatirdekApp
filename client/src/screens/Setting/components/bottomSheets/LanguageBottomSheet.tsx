import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import i18next from 'i18next';

import { EnglishFlagIcon, TurkishFlagIcon } from 'src/assets/icons/flag';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import LanguageSwitcher from 'src/constants/localization/LanguageSwitcher';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface LanguageBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const LanguageBottomSheet: React.FC<LanguageBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);

  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {i18next.t('settings.languageBottomSheet.header')}
      </Text>

      <LanguageSwitcher
        language={i18next.t('global.turkish')}
        languageCode="tr"
        onSwipeDown={onSwipeDown}
        componentStyle={styles.button}
        flag={<TurkishFlagIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
      />

      <LanguageSwitcher
        language={i18next.t('global.english')}
        languageCode="en"
        onSwipeDown={onSwipeDown}
        componentStyle={styles.button}
        flag={<EnglishFlagIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
      />
    </View>
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

export default LanguageBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * ScaleVertical(0.25),
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
      alignItems: 'center',
      gap: 15,
      marginTop: ScaleVertical(15),
    },
    headerText: {
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(10),
      backgroundColor: theme.backgroundColor,
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.textColor,
    },
  });
