import React from 'react';
import { StyleProp, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'src/constants/localization/i18next';

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
        <Text>{language.toUpperCase()}</Text>
      </View>
      {flag}
    </TouchableOpacity>
  );
};

export default LanguageSwitcher;
