import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

import loginAnimation from 'src/assets/animatons/login.json';
import BaseBottomSheet from 'src/components/BaseBottomSheet';
import { useAuthContext } from 'src/context/AuthContext';
import { useSocketContext } from 'src/context/SocketContext';
import { BASE_URL } from 'src/services/baseUrl';
import { GetGradientStartEnd } from 'src/utils/rotate';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(1.1, { duration: 2000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(-10, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [forgotPasswordBottomSheetVisible, setForgotPasswordBottomSheetVisible] =
    useState(false);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       console.log('token', token);
  //       if (token) {
  //         navigation.replace('Main');
  //       } else {
  //         navigation.replace('Login');
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const { setAuthUser } = useAuthContext();
  const handleLogin = async () => {
    axios
      .post(`${BASE_URL}/auth/login`, loginData)
      .then(async (response) => {
        await AsyncStorage.setItem('authToken', response.data.token);
        setAuthUser(response.data);
        navigation.replace('Main');
      })
      .catch((error) => {
        console.error(error);
      });

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'Main' }],
    //   })
    // );
  };

  const { socket } = useSocketContext();

  useEffect(() => {
    // Cleanup function to close socket connection when the component unmounts
    return () => {
      console.log(socket);

      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <KeyboardAvoidingView
      style={[styles.itemContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          height: SCREEN_HEIGHT,
          gap: 50,
        }}
      >
        <View
          style={{
            height: '40%',
          }}
        >
          <LinearGradient
            colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
            {...GetGradientStartEnd(0)}
            style={{
              borderRadius: SCREEN_WIDTH * 0.8,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: SCREEN_WIDTH * 1.5,
              height: SCREEN_WIDTH * 1.5,
              top: -SCREEN_WIDTH * 0.6,
              left: -SCREEN_WIDTH * 0.25,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
            }}
          >
            <Animated.View
              style={[
                {
                  alignItems: 'center',
                },
                animatedStyle,
              ]}
            >
              <LottieView
                source={loginAnimation}
                style={{
                  width: SCREEN_WIDTH * 0.85,
                  height: SCREEN_WIDTH * 0.85,
                  position: 'absolute',
                  bottom: -SCREEN_WIDTH * 0.1,
                  transform: [{ rotate: '35deg' }],
                }}
                autoPlay
                loop
                speed={2}
                resizeMode="cover"
              />
            </Animated.View>
          </LinearGradient>
        </View>
        <View
          style={{
            height: '60%',
          }}
        >
          <View
            style={{
              flex: 1,
              gap: 10,
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 44,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginHorizontal: 20,
                }}
              >
                Login
              </Text>
              <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
                Please enter your credentials to login
              </Text>
            </View>

            <TextInput
              style={{
                height: 50,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: SCREEN_WIDTH * 0.8,
                borderRadius: 10,
              }}
              placeholder="Username"
              onChangeText={(text) => setLoginData({ ...loginData, userName: text })}
            />
            <TextInput
              style={{
                height: 50,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: SCREEN_WIDTH * 0.8,
                borderRadius: 10,
              }}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setLoginData({ ...loginData, password: text })}
            />

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
              onPress={() => setForgotPasswordBottomSheetVisible(true)}
            >
              <Text style={{ color: 'blue' }}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 10,
                width: SCREEN_WIDTH * 0.8,
                alignItems: 'center',
              }}
              onPress={handleLogin}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
              }}
            >
              <Text>Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: 'blue' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {forgotPasswordBottomSheetVisible && (
            <BaseBottomSheet
              isVisible={forgotPasswordBottomSheetVisible}
              isTransparent={true}
              onSwipeDown={() => setForgotPasswordBottomSheetVisible(false)}
              animationType="slide"
              modalStyle={{
                height: SCREEN_HEIGHT * 0.5,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 20,
              }}
              content={<Text>Forget Password</Text>}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
