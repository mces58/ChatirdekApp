import React, { useEffect, useMemo } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import i18next from 'i18next';

import {
  ChatIcon,
  DiscoverIcon,
  GroupIcon,
  SettingIcon,
} from 'src/assets/icons/bottom-tabs';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';
import Home from 'src/screens/Chat/Home';
import Discover from 'src/screens/Discover/Discover';
import Group from 'src/screens/Group/Group';
import Setting from 'src/screens/Setting/Setting';
import { GetGradientStartEnd } from 'src/utils/rotate';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scale = useSharedValue(1);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 1000 }),
        withTiming(1.05, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 70 : 80,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          width: width,
        },
        tabBarBackground: () => {
          return (
            <LinearGradient
              colors={[
                theme.bottomTabBarBackgroundColor?.[0] ?? 'black',
                theme.bottomTabBarBackgroundColor?.[1] ?? 'lightgray',
              ]}
              {...GetGradientStartEnd(180)}
              style={[
                styles.linearGradint,
                {
                  height: Platform.OS === 'ios' ? 80 : 80,
                },
              ]}
            />
          );
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.bottomContainer}>
                <Animated.View style={focused && animatedStyle}>
                  <ChatIcon
                    width={30}
                    height={30}
                    customColor={
                      focused
                        ? theme.bottomTabBarActiveIconColor ??
                          Colors.primaryColors.success
                        : theme.bottomTabBarIconColor ?? Colors.primaryColors.textMuted
                    }
                  />
                </Animated.View>
                {focused && (
                  <Text
                    style={[
                      styles.text,
                      { color: focused && theme.bottomTabBarActiveTextColor },
                    ]}
                  >
                    {i18next.t('navigation.chats')}
                  </Text>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.bottomContainer}>
                <Animated.View style={focused && animatedStyle}>
                  <GroupIcon
                    width={30}
                    height={30}
                    customColor={
                      focused
                        ? theme.bottomTabBarActiveIconColor ??
                          Colors.primaryColors.success
                        : theme.bottomTabBarIconColor ?? Colors.primaryColors.textMuted
                    }
                  />
                </Animated.View>
                {focused && (
                  <Text
                    style={[
                      styles.text,
                      { color: focused && theme.bottomTabBarActiveTextColor },
                    ]}
                  >
                    {i18next.t('navigation.groups')}
                  </Text>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.bottomContainer}>
                <Animated.View style={focused && animatedStyle}>
                  <DiscoverIcon
                    width={30}
                    height={30}
                    customColor={
                      focused
                        ? theme.bottomTabBarActiveIconColor ??
                          Colors.primaryColors.success
                        : theme.bottomTabBarIconColor ?? Colors.primaryColors.textMuted
                    }
                  />
                </Animated.View>
                {focused && (
                  <Text
                    style={[
                      styles.text,
                      { color: focused && theme.bottomTabBarActiveTextColor },
                    ]}
                  >
                    {i18next.t('navigation.discover')}
                  </Text>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="SettingStack"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.bottomContainer}>
                <Animated.View style={focused && animatedStyle}>
                  <SettingIcon
                    width={30}
                    height={30}
                    customColor={
                      focused
                        ? theme.bottomTabBarActiveIconColor ??
                          Colors.primaryColors.success
                        : theme.bottomTabBarIconColor ?? Colors.primaryColors.textMuted
                    }
                  />
                </Animated.View>
                {focused && (
                  <Text
                    style={[
                      styles.text,
                      { color: focused && theme.bottomTabBarActiveTextColor },
                    ]}
                  >
                    {i18next.t('navigation.settings')}
                  </Text>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    linearGradint: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    bottomContainer: {
      gap: 1,
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Nunito-Regular',
      fontSize: 14,
      textAlign: 'center',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
