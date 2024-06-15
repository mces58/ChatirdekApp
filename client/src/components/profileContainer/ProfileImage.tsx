import React, { useMemo } from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { Theme, useTheme } from 'src/context/ThemeContext';

interface ProfileImageProps {
  imageUri: string;
  componentSize: StyleProp<ViewStyle> & { width: number; height: number };
  disabled?: boolean;
  onPress?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUri,
  componentSize,
  disabled = false,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={componentSize} onPress={onPress} disabled={disabled}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ProfileImage;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.textColor,
    },
  });
