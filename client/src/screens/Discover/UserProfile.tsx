import React, { useMemo } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/user-profile1.json';
import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import GenderIcon from 'src/assets/icons/gender';
import { GroupPeopleIcon } from 'src/assets/icons/headers';
import InfoIcon from 'src/assets/icons/info';
import Card from 'src/components/cards/Card';
import BackHeader from 'src/components/headers/BackHeader';
import ProfileWithText from 'src/components/profileContainer/ProfileWithText';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { UserProfileProps } from 'src/navigations/RootStackParamList';

const UserProfile: React.FC<UserProfileProps> = ({ navigation, route }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  return (
    <View style={styles.screenContainer}>
      <BackHeader
        title={route.params.user.userName}
        icon={<ArrowIcon width={25} height={25} direction="left" />}
        onPress={() => navigation.goBack()}
        componentSize={{ height: 80 }}
      />
      <View style={styles.container}>
        <ProfileWithText
          text={route.params.user.fullName}
          imageUri={route.params.user.profilePicture}
          componentSize={{ width: 150, height: 150 }}
        />

        <View style={styles.userContainer}>
          <Card
            title="Created At"
            text={route?.params.user.createdAt?.split('T')[0]}
            icon={<CalendarIcon width={25} height={25} strokeWidth={1.5} />}
          />
          <Card
            title="Email"
            text={route?.params.user.email}
            icon={<InfoIcon width={25} height={25} strokeWidth={1.5} />}
          />
          <Card
            title="Friends Count"
            text={route?.params.user.friends?.length.toString()}
            icon={<GroupPeopleIcon width={25} height={25} strokeWidth={1.5} />}
          />
          <Card
            title="Gender"
            text={route?.params.user.gender}
            icon={<GenderIcon width={25} height={25} strokeWidth={0.8} />}
          />
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={styles.animatedView}>
            <LottieView
              source={animation}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * 0.6,
              }}
              autoPlay
              loop
              speed={1}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    container: {
      flex: 1,
      paddingVertical: 10,
      gap: 20,
    },
    userContainer: {
      alignItems: 'center',
      gap: 25,
      paddingBottom: 25,
    },
    animationContainer: {
      flex: 1,
      width: '100%',
    },
    animatedView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
