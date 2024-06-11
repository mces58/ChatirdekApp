import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import i18next from 'i18next';

import BinIcon from 'src/assets/icons/bin';
import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface ProfilePhotoBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  setAvatar: (image: string) => void;
}

const ProfilePhotoBottomSheet: React.FC<ProfilePhotoBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  setAvatar,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);

  const openCamera = async () => {
    try {
      let result = {};

      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setAvatar(result.assets[0].uri);

        onSwipeDown();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = async () => {
    try {
      let result = {};

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setAvatar(result.assets[0].uri);

        onSwipeDown();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePhoto = () => {
    setAvatar('');
    onSwipeDown();
  };

  const items = [
    {
      title: i18next.t('global.camera'),
      icon: <CameraIcon width={30} height={30} strokeWidth={3} />,
      onPress: openCamera,
    },
    {
      title: i18next.t('global.gallery'),
      icon: <GalleryIcon width={30} height={30} strokeWidth={3} />,
      onPress: openGallery,
    },
    {
      title: i18next.t('global.remove'),
      icon: <BinIcon width={30} height={30} strokeWidth={3} />,
      onPress: removePhoto,
    },
  ];

  const renderItems = () => {
    return items.map((item, index) => (
      <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
        <View style={styles.iconOutline}>{item.icon}</View>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    ));
  };
  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {i18next.t('settings.profilePhotoBottomSheet.header')}
      </Text>

      <View style={styles.row}>{renderItems()}</View>
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

export default ProfilePhotoBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.25,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    item: {
      alignItems: 'center',
      gap: 10,
    },
    iconOutline: {
      borderWidth: 1,
      borderColor: theme.textColor,
      borderRadius: 50,
      padding: 10,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 14,
    },
  });
