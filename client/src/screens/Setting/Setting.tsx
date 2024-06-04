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
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { SettingLeafIcon } from 'src/assets/icons/headers';
import Header from 'src/components/headers/Header';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

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
    const getUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const user: { _id: string } = jwtDecode(token as string);

      axios
        .get(`${BASE_URL}/auth/me/${user._id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log('error retrieving users', error);
        });
    };
    getUser();
  }, []);

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
      <Header title="Settings" icon={<SettingLeafIcon width={30} height={30} />} />

      <ProfileContainer
        user={user!}
        onPress={() => navigation.navigate('Profile', { user })}
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
              <Text style={styles.text}>{setting.label}</Text>
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
      gap: 10,
    },
    container: {
      paddingVertical: 10,
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
