import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

import ArrowIcon from 'src/assets/icons/arrow';
import { SettingLeafIcon } from 'src/assets/icons/headers';
import Header from 'src/components/headers/Header';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import authService from 'src/services/auth-service';

import AboutUsBottomSheet from './components/bottomSheets/AboutUsBottomSheet';
import ChatsBottomSheet from './components/bottomSheets/ChatsBottomSheet';
import HelpBottomSheet from './components/bottomSheets/HelpBottomSheet';
import LanguageBottomSheet from './components/bottomSheets/LanguageBottomSheet';
import PrivacyBottomSheet from './components/bottomSheets/PrivacyBottomSheet';
import ThemeBottomSheet from './components/bottomSheets/ThemeBottomSheet';
import BottomSheetWrapper from './components/BottomSheetWrapper';
import { SettingBottomSheet } from './constants/setting-screen';
import settingBottomSheets from './constants/setting-screen';
import { BottomSheetNames } from './constants/sheet-names';

interface SettingProps {
  navigation: any;
}

const Setting: React.FC<SettingProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [visibleSheet, setVisibleSheet] = useState<BottomSheetNames>(null);
  const [settings] = useState<SettingBottomSheet[]>(settingBottomSheets);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { authUser } = useAuthContext();

  const bottomSheets = {
    Language: LanguageBottomSheet,
    Theme: ThemeBottomSheet,
    Chats: ChatsBottomSheet,
    Privacy: PrivacyBottomSheet,
    Help: HelpBottomSheet,
    AboutUs: AboutUsBottomSheet,
  };

  const handleToggleSheet = (sheetName: BottomSheetNames): void => {
    setVisibleSheet((prev: BottomSheetNames | null) =>
      prev === sheetName ? null : sheetName
    );
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        if (authUser) {
          const response: Response = await authService.getMe(authUser.toString());

          if (response.success) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  }, [user, authUser, setUser]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log('error logging out', error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Header
        title={i18next.t('settings.settings.header')}
        icon={<SettingLeafIcon width={30} height={30} />}
        disableIcon
      />

      <ProfileContainer
        user={user!}
        onPress={() => navigation.navigate('Profile', { user })}
        icon={<ArrowIcon width={20} height={20} direction="right" />}
        textStyles={{ fontSize: 16, color: theme.textColor }}
      />

      <View style={styles.container}>
        {settings.map((setting: SettingBottomSheet, index: number) => (
          <View
            style={[
              styles.listItemContainer,
              index === settings.length - 1 && { borderBottomWidth: 0 },
            ]}
            key={setting.name || index}
          >
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setting.name === 'Logout'
                  ? handleLogout()
                  : handleToggleSheet(setting.name as BottomSheetNames);
              }}
            >
              {setting.icon}
              <Text style={styles.text}>
                {i18next.t(`settings.list.${setting.name.toLowerCase()}`)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {settings
        .filter((setting) => setting.name !== 'Logout')
        .map((setting) => (
          <BottomSheetWrapper
            key={setting.name}
            BottomSheetComponent={bottomSheets[setting.name as keyof typeof bottomSheets]}
            isVisible={visibleSheet === setting.name}
            onSwipeDown={() => handleToggleSheet(setting.name as BottomSheetNames)}
          />
        ))}
    </View>
  );
};

export default Setting;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
      gap: 5,
    },
    container: {
      paddingHorizontal: 20,
    },
    listItemContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      paddingVertical: 22,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 16,
    },
  });
