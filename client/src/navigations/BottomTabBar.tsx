import React, { useEffect } from 'react';
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

import {
  ChatIcon,
  DiscoverIcon,
  GroupIcon,
  SettingIcon,
} from 'src/assets/icons/bottom-tabs';
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
          height: Platform.OS === 'ios' ? 90 : 90,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...styles.shadow,
          width: width,
        },
        tabBarBackground: () => {
          return (
            <LinearGradient
              colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
              {...GetGradientStartEnd(180)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: Platform.OS === 'ios' ? 90 : 90,
                backgroundColor: 'red',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
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
              <View
                style={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Animated.View style={focused && animatedStyle}>
                  <ChatIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                </Animated.View>
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Chats
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
              <View
                style={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Animated.View style={focused && animatedStyle}>
                  <GroupIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                </Animated.View>
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Groups
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
              <View
                style={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Animated.View style={focused && animatedStyle}>
                  <DiscoverIcon
                    width={30}
                    height={30}
                    color={focused ? 'white' : 'gray'}
                  />
                </Animated.View>
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Discover
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
              <View
                style={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Animated.View style={focused && animatedStyle}>
                  <SettingIcon
                    width={30}
                    height={30}
                    color={focused ? 'white' : 'gray'}
                  />
                </Animated.View>
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Settings
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
