import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import SwitchButton from 'src/components/SwitchButton';
import { Theme, useTheme } from 'src/context/ThemeContext';

import { PrivacyContent, privacyContent } from '../../constants/privarcy-content';

interface PrivacyBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const PrivacyBottomSheet: React.FC<PrivacyBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [contents] = useState<PrivacyContent[]>(privacyContent);

  const renderContent = (content: string, index: number) => {
    return (
      <View
        key={index}
        style={[
          styles.item,
          index === privacyContent.length - 1 && { borderBottomWidth: 0 },
        ]}
      >
        <Text style={styles.text}>{content}</Text>
        <SwitchButton activeColor={'#FFA901'} inActiveColor={'#F2F5F7'} />
      </View>
    );
  };

  const content = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Text style={styles.headerText}>Privacy</Text>
      {contents.map((item, index) => renderContent(item.content, index))}
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

export default PrivacyBottomSheet;

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
    scrollViewContent: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      gap: 15,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      paddingVertical: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: 14,
    },
  });
