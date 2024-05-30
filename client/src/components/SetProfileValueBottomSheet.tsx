import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTheme } from 'src/context/ThemeContext';

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
  const [newValue, onChangeText] = useState(value);

  const content = (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          marginTop: 20,
          padding: 10,
          backgroundColor: theme.background,
          color: theme.color,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
        placeholder={placeholder}
        placeholderTextColor={'#ccc'}
        onChangeText={(text) => onChangeText(text)}
        value={newValue}
      />

      <TouchableOpacity
        style={{
          width: '100%',
          marginTop: 20,
          padding: 10,
          backgroundColor: '#2e64e5',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {
          setValue(newValue);
          onChangeText('');
          onSwipeDown();
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Save
        </Text>
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
      modalStyle={{
        height: SCREEN_HEIGHT * 0.27,
        backgroundColor: theme.background,
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

export default SetProfileValueBottomSheet;
