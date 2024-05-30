import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { EnglishFlagIcon, TurkishFlagIcon } from 'src/assets/icons/flag';
import LanguageSwitcher from 'src/constants/localization/LanguageSwitcher';

import BaseBottomSheet from './BaseBottomSheet';

interface LanguageBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const LanguageBottomSheet: React.FC<LanguageBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const content = (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Choose your language
      </Text>

      <LanguageSwitcher
        language="Turkish"
        languageCode="tr"
        onSwipeDown={onSwipeDown}
        componentStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
        }}
        flag={<TurkishFlagIcon width={30} height={30} />}
      />

      <LanguageSwitcher
        language="English"
        languageCode="en"
        onSwipeDown={onSwipeDown}
        componentStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
        }}
        flag={<EnglishFlagIcon width={30} height={30} />}
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
      modalStyle={{
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
      }}
    />
  );
};

export default LanguageBottomSheet;
