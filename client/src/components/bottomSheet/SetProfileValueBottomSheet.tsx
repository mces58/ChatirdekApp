import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface SetProfileValueBottomSheetProps {
  title: string;
  placeholder: string;
  isVisible: boolean;
  onSwipeDown: () => void;
  setValue: (value: string) => void;
  value: string;
}

const SetProfileValueBottomSheet: React.FC<SetProfileValueBottomSheetProps> = ({
  title,
  placeholder,
  isVisible,
  onSwipeDown,
  setValue,
  value,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [newValue, onChangeText] = useState(value);

  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={'#ccc'}
        onChangeText={(text) => onChangeText(text)}
        value={newValue}
      />

      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={() => {
          setValue(newValue);
          onChangeText('');
          onSwipeDown();
        }}
      >
        <Text style={styles.buttonText}>{i18next.t('global.save')}</Text>
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

export default SetProfileValueBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.27,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 15,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    textInput: {
      width: '100%',
      height: 50,
      paddingVertical: 10,
      paddingHorizontal: 10,
      color: theme.textColor,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    button: {
      width: '100%',
      padding: 10,
      backgroundColor: Colors.primaryColors.headerColor,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    buttonText: {
      color: Colors.primaryColors.dark,
      fontSize: 16,
      fontFamily: 'Nunito-Bold',
    },
  });
