import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import CameraIcon from 'src/assets/icons/camera';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';

interface ChangeProfileImageProps {
  imageUri: string;
  componentSize: StyleProp<ViewStyle> & { width: number; height: number };
  onPressImage?: () => void;
  onPressIcon?: () => void;
}

const ChangeProfileImage: React.FC<ChangeProfileImageProps> = ({
  imageUri,
  componentSize,
  onPressImage,
  onPressIcon,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.profilePictureContainer, styles.shadow, componentSize]}>
      <ProfileImage
        imageUri={imageUri}
        componentSize={componentSize}
        onPress={onPressImage}
      />
      <TouchableOpacity style={styles.icon} onPress={onPressIcon}>
        <CameraIcon
          width={30}
          height={30}
          customColor={Colors.primaryColors.dark}
          strokeWidth={2.5}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChangeProfileImage;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 10,
    },
    profilePictureContainer: {
      alignSelf: 'center',
      borderRadius: 100,
    },
    icon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 10,
      borderRadius: 50,
      backgroundColor: Colors.primaryColors.headerColor,
    },
  });
