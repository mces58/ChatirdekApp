import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import ArrowIcon from 'src/assets/icons/arrow';
import AboutUsBottomSheet from 'src/components/AboutUsBottomSheet';
import HelpBottomSheet from 'src/components/HelpBottomSheet';
import LanguageBottomSheet from 'src/components/LanguageBottomSheet';
import ThemeBottomSheet from 'src/components/ThemeBottomSheet';
import { BASE_URL } from 'src/services/baseUrl';

interface SettingProps {
  navigation: any;
}

const Setting: React.FC<SettingProps> = ({ navigation }) => {
  const [user, setUser] = useState<{
    _id: string;
    fullName: string;
    userName: string;
    profilePicture: string;
    createdAt: string;
  } | null>(null);
  const [languageBoxVisible, setLanguageBoxVisible] = useState(false);
  const [themeBoxVisible, setThemeBoxVisible] = useState(false);
  const [aboutUsBoxVisible, setAboutUsBoxVisible] = useState(false);
  const [helpBoxVisible, setHelpBoxVisible] = useState(false);

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

  const handleLanguage = () => {
    setLanguageBoxVisible(true);
  };

  const handleTheme = () => {
    setThemeBoxVisible(true);
  };

  const handleAboutUs = () => {
    setAboutUsBoxVisible(true);
  };

  const handleHelp = () => {
    setHelpBoxVisible(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log('error logging out', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Settings
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          gap: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            gap: 16,
            backgroundColor: '#f2f2f2',
          }}
        >
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 10,
              borderRadius: 50,
            }}
          >
            <Image
              source={{ uri: user?.profilePicture }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: '#000',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {user?.fullName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#888',
              }}
            >
              {user?.userName}
            </Text>
          </View>
        </View>
        <ArrowIcon width={25} height={25} color="#000" direction="right" />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 6,
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          gap: 30,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={handleLanguage}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>{i18next.t('languageTitle')}</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Chats</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={handleTheme}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Theme</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Block Contacts</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Privacy</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={handleHelp}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Help & Support</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={handleAboutUs}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>About Us</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={handleLogout}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text>Icon</Text>
            <Text>Log out</Text>
          </View>
          <ArrowIcon width={25} height={25} color="#000" direction="right" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
          }}
        >
          MCES
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#888',
          }}
        >
          Version 1.0.0
        </Text>
      </View>

      {languageBoxVisible && (
        <LanguageBottomSheet
          isVisible={languageBoxVisible}
          onSwipeDown={() => setLanguageBoxVisible(false)}
        />
      )}

      {themeBoxVisible && (
        <ThemeBottomSheet
          isVisible={themeBoxVisible}
          onSwipeDown={() => setThemeBoxVisible(false)}
        />
      )}

      {aboutUsBoxVisible && (
        <AboutUsBottomSheet
          isVisible={aboutUsBoxVisible}
          onSwipeDown={() => setAboutUsBoxVisible(false)}
        />
      )}

      {helpBoxVisible && (
        <HelpBottomSheet
          isVisible={helpBoxVisible}
          onSwipeDown={() => setHelpBoxVisible(false)}
        />
      )}
    </View>
  );
};

export default Setting;
