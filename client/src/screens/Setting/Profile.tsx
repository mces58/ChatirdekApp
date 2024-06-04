import React, { useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/setting.json';
import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import GhostIcon from 'src/assets/icons/ghost';
import IdIcon from 'src/assets/icons/id';
import InfoIcon from 'src/assets/icons/info';
import SetProfileValueBottomSheet from 'src/components/bottomSheet/SetProfileValueBottomSheet';
import BackHeader from 'src/components/headers/BackHeader';
import ChangeProfileImage from 'src/components/profileContainer/ChangeProfileImage';
import ProfileModal from 'src/components/profileContainer/ProfileModal';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfilePhotoBottomSheet from './components/bottomSheets/ProfilePhotoBottomSheet';
import ListUserInfo from './components/ListUserInfo';

interface ProfileRouteProps {
  user: User;
}

interface ProfileProps {
  navigation: any;
  route: RouteProp<Record<string, ProfileRouteProps>, string>;
}

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

  return (
    <View style={styles.container}>
      <BackHeader
        title="Back"
        icon={<ArrowIcon width={25} height={25} direction="left" />}
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
        imageUri={image ? image : route?.params?.user?.profilePicture}
        componentSize={{ width: 200, height: 200 }}
        onPressImage={() => setModalVisible(true)}
        onPressIcon={() => setProfilePhotoBoxVisible(true)}
      />

      <ListUserInfo
        title="Full Name"
        text={user.fullName}
        icon={<IdIcon width={30} height={30} />}
        onPress={() => setFullNameBoxVisible(true)}
      />

      <ListUserInfo
        title="User Name"
        text={user.userName}
        icon={<GhostIcon width={30} height={30} />}
        onPress={() => setUserNameBoxVisible(true)}
      />

      <ListUserInfo
        title="About"
        text={user.about}
        icon={<InfoIcon width={30} height={30} strokeWidth={1} />}
      />

      <ListUserInfo
        title="Created At"
        text={user.createdAt.split('T')[0]}
        icon={<CalendarIcon width={30} height={30} strokeWidth={1} />}
        disabled
      />

      <ProfileModal
        imageUri={image ? image : route?.params?.user?.profilePicture}
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
        />
      )}

      {fullNameBoxVisible && (
        <SetProfileValueBottomSheet
          title="Enter Full Name"
          placeholder="Enter your full name"
          isVisible={fullNameBoxVisible}
          onSwipeDown={() => setFullNameBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, fullName: value });
          }}
          value={user.fullName}
        />
      )}

      {userNameBoxVisible && (
        <SetProfileValueBottomSheet
          title="Enter User Name"
          placeholder="Enter your user name"
          isVisible={userNameBoxVisible}
          onSwipeDown={() => setUserNameBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, userName: value });
          }}
          value={user.userName}
        />
      )}

      {aboutBoxVisible && (
        <SetProfileValueBottomSheet
          title="About"
          placeholder="Tell us about yourself"
          isVisible={aboutBoxVisible}
          onSwipeDown={() => setAboutBoxVisible(false)}
          setValue={(value: string) => {
            setUser({ ...user, about: value });
          }}
          value={user.about}
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
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.25,
      zIndex: 10,
    },
  });
