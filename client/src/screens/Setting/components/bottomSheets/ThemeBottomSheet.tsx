import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { MoonThemeIcon, SunThemeIcon } from 'src/assets/icons/theme';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
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
      <Text style={styles.headerText}>Choose your theme</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setLightTheme();
          onSwipeDown();
        }}
      >
        <Text style={styles.text}>Light</Text>
        <SunThemeIcon width={30} height={30} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDarkTheme();
          onSwipeDown();
        }}
      >
        <Text style={styles.text}>Dark</Text>
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
      modalStyle={styles.bottomSheet}
    />
  );
};

export default ThemeBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.3,
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
      alignItems: 'center',
      gap: 15,
      marginTop: 20,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.backgroundColor,
      borderWidth: 1,
      borderColor: theme.textColor,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 14,
    },
  });
