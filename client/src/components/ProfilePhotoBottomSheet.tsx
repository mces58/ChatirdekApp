import React from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface ProfilePhotoBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const ProfilePhotoBottomSheet: React.FC<ProfilePhotoBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  //const [responseCamera, setResponseCamera] = React.useState(null);
  //const [responseGallery, setResponseGallery] = React.useState(null);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        console.log('Image: ', response.assets);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        console.log('Image: ', response.assets);
      }
    });
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
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          gap: 100,
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
