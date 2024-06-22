import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import BinIcon from 'src/assets/icons/bin';
import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import authService from 'src/services/auth-service';
import openCamera from 'src/utils/open-camera';
import openGallery from 'src/utils/open-galllery';

interface ProfilePhotoBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  setAvatar: (imageUri: string) => void;
  fullName: string;
}

const ProfilePhotoBottomSheet: React.FC<ProfilePhotoBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  setAvatar,
  fullName,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const { authUser } = useAuthContext();

  const camera = async () => {
    const uri = await openCamera();
    if (uri) {
      setAvatar(uri);
      onSwipeDown();
      await sendToServer(uri);
    }
  };

  const gallery = async () => {
    const uri = await openGallery();
    if (uri) {
      setAvatar(uri);
      onSwipeDown();
      await sendToServer(uri);
    }
  };

  const removePhoto = () => {
    const name = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1]
      ? fullName.split(' ')[1]
      : fullName.split(' ')[0];

    setAvatar(`https://avatar.iran.liara.run/username?username=${name}+${lastName}`);
    onSwipeDown();
    sendToServer('');
  };

  const sendToServer = async (uri: string) => {
    try {
      if (authUser) {
        const response: Response = await authService.updateMeAvatar(
          authUser.toString(),
          uri
        );
        if (response.success) {
          console.log('Avatar updated');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      title: i18next.t('global.camera'),
      icon: (
        <CameraIcon
          width={ScaleHorizontal(27)}
          height={ScaleVertical(27)}
          strokeWidth={3}
        />
      ),
      onPress: camera,
    },
    {
      title: i18next.t('global.gallery'),
      icon: (
        <GalleryIcon
          width={ScaleHorizontal(27)}
          height={ScaleVertical(27)}
          strokeWidth={3}
        />
      ),
      onPress: gallery,
    },
    {
      title: i18next.t('global.remove'),
      icon: (
        <BinIcon width={ScaleHorizontal(27)} height={ScaleVertical(27)} strokeWidth={3} />
      ),
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
      height: SCREEN_HEIGHT * ScaleVertical(0.22),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      gap: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
    },
    headerText: {
      fontSize: ScaleFontSize(17),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: ScaleVertical(10),
    },
    item: {
      alignItems: 'center',
      gap: 10,
    },
    iconOutline: {
      borderWidth: 1,
      borderColor: theme.textColor,
      borderRadius: ScaleHorizontal(50),
      paddingHorizontal: ScaleHorizontal(9),
      paddingVertical: ScaleVertical(9),
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(12),
    },
  });
