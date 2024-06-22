import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import { MoonThemeIcon, SunThemeIcon } from 'src/assets/icons/theme';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

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
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);

  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {i18next.t('settings.themeBottomSheet.header')}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setLightTheme();
          onSwipeDown();
        }}
      >
        <Text style={styles.text}>{i18next.t('global.light')}</Text>
        <SunThemeIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDarkTheme();
          onSwipeDown();
        }}
      >
        <Text style={styles.text}>{i18next.t('global.dark')}</Text>
        <MoonThemeIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />
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
      modalStyle={styles.bottomSheet}
    />
  );
};

export default ThemeBottomSheet;

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
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(13),
    },
  });
