import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';

interface ProfileWithTextProps {
  text: string;
  imageUri: string;
  componentSize: StyleProp<ViewStyle> & { width: number; height: number };
}

const ProfileWithText: React.FC<ProfileWithTextProps> = ({
  text,
  imageUri,
  componentSize,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ProfileImage imageUri={imageUri} componentSize={componentSize} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ProfileWithText;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
      borderBottomWidth: ScaleHorizontal(1),
      borderBottomColor: theme.borderColor,
      paddingBottom: ScaleVertical(12),
    },
    text: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
    },
  });
