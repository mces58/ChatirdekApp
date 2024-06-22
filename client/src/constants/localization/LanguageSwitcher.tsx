import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'src/constants/localization/i18next';
import { Theme, useTheme } from 'src/context/ThemeContext';

import { ScaleFontSize } from '../screen/screenSize';

interface Props {
  language: string;
  languageCode: string;
  componentStyle?: StyleProp<any>;
  flag?: React.ReactNode;
  onSwipeDown?: () => void;
}

const LanguageSwitcher: React.FC<Props> = ({
  language,
  languageCode,
  componentStyle,
  flag,
  onSwipeDown,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const changeLanguage = (lng: string): void => {
    i18next.changeLanguage(lng);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        changeLanguage(languageCode);
        if (onSwipeDown) {
          onSwipeDown();
        }
      }}
      style={componentStyle}
    >
      <View>
        <Text style={styles.text}>{language}</Text>
      </View>
      {flag}
    </TouchableOpacity>
  );
};

export default LanguageSwitcher;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(13),
    },
  });
