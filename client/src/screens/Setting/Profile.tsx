import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/setting.json';
import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import GhostIcon from 'src/assets/icons/ghost';
import IdIcon from 'src/assets/icons/id';
import QuotationIcon from 'src/assets/icons/quotation';
import SetProfileValueBottomSheet from 'src/components/bottomSheet/SetProfileValueBottomSheet';
import BackHeader from 'src/components/headers/BackHeader';
import ListInfo from 'src/components/list/ListUserInfo';
import ChangeProfileImage from 'src/components/profileContainer/ChangeProfileImage';
import ProfileModal from 'src/components/profileContainer/ProfileModal';
import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { ProfileProps } from 'src/navigations/RootStackParamList';

import ProfilePhotoBottomSheet from './components/bottomSheets/ProfilePhotoBottomSheet';

const Profile: React.FC<ProfileProps> = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePhotoBoxVisible, setProfilePhotoBoxVisible] = useState(false);
  const [image, setImage] = useState('');
  const [fullNameBoxVisible, setFullNameBoxVisible] = useState(false);
  const [userNameBoxVisible, setUserNameBoxVisible] = useState(false);
  const [aboutBoxVisible, setAboutBoxVisible] = useState(false);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(
    () => createStyles(theme, STATUSBAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT),
    [theme]
  );
  const [user, setUser] = useState<User>(route.params.user);

  useEffect(() => {}, [setUser, route.params.user]);

  return (
    <View style={styles.container}>
      <BackHeader
        title={i18next.t('global.back')}
        icon={
          <ArrowIcon
            width={ScaleHorizontal(25)}
            height={ScaleVertical(25)}
            direction="left"
          />
        }
        onPress={() => {
          navigation.goBack();
        }}
      />
      <LottieView
        style={styles.animation}
        source={animation}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />
      <ChangeProfileImage
        imageUri={
          image
            ? image
            : route?.params?.user?.hideAvatar
              ? `https://robohash.org/${route?.params?.user?.id}`
              : route?.params?.user?.avatar
        }
        componentSize={{ width: ScaleHorizontal(160), height: ScaleVertical(160) }}
        onPressImage={() => setModalVisible(true)}
        onPressIcon={() => setProfilePhotoBoxVisible(true)}
      />

      <ListInfo
        title={i18next.t('global.fullName')}
        text={user?.fullName}
        icon={<IdIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
        onPress={() => setFullNameBoxVisible(true)}
      />

      <ListInfo
        title={i18next.t('global.username')}
        text={user?.userName}
        icon={<GhostIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
        onPress={() => setUserNameBoxVisible(true)}
      />

      <ListInfo
        title={i18next.t('global.about')}
        text={user?.about}
        icon={<QuotationIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
        onPress={() => setAboutBoxVisible(true)}
      />

      <ListInfo
        title={i18next.t('global.createdAt')}
        text={user?.createdAt.split('T')[0]}
        icon={
          <CalendarIcon
            width={ScaleHorizontal(25)}
            height={ScaleVertical(25)}
            strokeWidth={1}
          />
        }
        disabled
      />

      <ProfileModal
        imageUri={
          image
            ? image
            : route?.params?.user?.hideAvatar
              ? `https://robohash.org/${route?.params?.user?.id}`
              : route?.params?.user?.avatar
        }
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      {profilePhotoBoxVisible && (
        <ProfilePhotoBottomSheet
          isVisible={profilePhotoBoxVisible}
          onSwipeDown={() => setProfilePhotoBoxVisible(false)}
          setAvatar={(image: string) => {
            setImage(image);
          }}
          fullName={user.fullName}
        />
      )}

      {fullNameBoxVisible && (
        <SetProfileValueBottomSheet
          title={i18next.t('global.fullName')}
          placeholder={i18next.t('global.fullName')}
          isVisible={fullNameBoxVisible}
          onSwipeDown={() => setFullNameBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, fullName: value });
          }}
          value={user.fullName}
          type="fullName"
        />
      )}

      {userNameBoxVisible && (
        <SetProfileValueBottomSheet
          title={i18next.t('global.username')}
          placeholder={i18next.t('global.username')}
          isVisible={userNameBoxVisible}
          onSwipeDown={() => setUserNameBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, userName: value });
          }}
          value={user.userName}
          type="userName"
        />
      )}

      {aboutBoxVisible && (
        <SetProfileValueBottomSheet
          title={i18next.t('global.about')}
          placeholder={i18next.t('global.about')}
          isVisible={aboutBoxVisible}
          onSwipeDown={() => setAboutBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, about: value });
          }}
          value={user.about}
          type="about"
        />
      )}
    </View>
  );
};

export default Profile;

const createStyles = (
  theme: Theme,
  STATUSBAR_HEIGHT: number,
  SCREEN_WIDTH: number,
  SCREEN_HEIGHT: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
      gap: 10,
    },
    animation: {
      position: 'absolute',
      bottom: 10,
      right: -20,
      width: SCREEN_WIDTH * 0.6,
      height: SCREEN_HEIGHT * 0.2,
      zIndex: 10,
    },
  });
