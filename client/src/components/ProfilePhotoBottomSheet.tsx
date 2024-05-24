import React from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import BinIcon from 'src/assets/icons/bin';
import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

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

  const content = (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
        }}
      >
        Profile Photo
      </Text>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            gap: 10,
          }}
          onPress={openCamera}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 50,
              padding: 10,
            }}
          >
            <CameraIcon width={30} height={30} color={'black'} strokeWidth={3} />
          </View>
          <Text>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            gap: 10,
          }}
          onPress={openGallery}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 50,
              padding: 10,
            }}
          >
            <GalleryIcon width={30} height={30} color={'black'} strokeWidth={3} />
          </View>
          <Text>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            gap: 10,
          }}
          onPress={removePhoto}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 50,
              padding: 10,
            }}
          >
            <BinIcon width={30} height={30} color={'black'} strokeWidth={3} />
          </View>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
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
        height: SCREEN_HEIGHT * 0.25,
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

export default ProfilePhotoBottomSheet;
