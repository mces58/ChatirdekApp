import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

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
  return (
    <TouchableOpacity style={componentSize} onPress={onPress} disabled={disabled}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
