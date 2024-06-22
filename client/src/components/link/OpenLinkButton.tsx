import React, { useCallback, useMemo } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ScaleFontSize } from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

type OpenLinkButtonProps = {
  url: string;
  text: string;
};

const OpenLinkButton: React.FC<OpenLinkButtonProps> = ({ url, text }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default OpenLinkButton;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontFamily: 'Poppins-Medium',
      fontSize: ScaleFontSize(14),
      color: theme.textColor,
    },
  });
