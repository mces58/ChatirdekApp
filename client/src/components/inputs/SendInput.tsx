import React, { useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import SendIcon from 'src/assets/icons/send';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface SendInputProps {
  inputMessage: string;
  handleInputText: (text: string) => void;
  sendMessage: () => void;
  placeholder?: string;
}

const SendInput: React.FC<SendInputProps> = ({
  inputMessage,
  handleInputText,
  sendMessage,
  placeholder = 'Type your message',
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputMessage}
        onChangeText={handleInputText}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={1}
        maxLength={1000}
        placeholderTextColor={theme.textMutedColor}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={styles.icon}
        disabled={inputMessage.trim() === '' || inputMessage.trim().length > 1000}
      >
        <SendIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SendInput;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      gap: 10,
    },
    input: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderColor: theme.borderColor,
      borderWidth: 1.5,
      borderRadius: 5,
      color: theme.textColor,
    },
    icon: {
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
