import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import i18next from 'src/constants/localization/i18next';

interface Props {
  language: string;
}

const LanguageSwitcher: React.FC<Props> = ({ language }) => {
  const changeLanguage = (lng: string): void => {
    i18next.changeLanguage(lng);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        return changeLanguage(language);
      }}
    >
      <Text>{language.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default LanguageSwitcher;
