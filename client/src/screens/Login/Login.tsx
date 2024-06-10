import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';

import loginAnimation from 'src/assets/animatons/login.json';
import Button from 'src/components/button/Button';
import { Colors } from 'src/constants/color/colors';
import { LoginData } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { useSocketContext } from 'src/context/SocketContext';
import { BASE_URL } from 'src/services/baseUrl';
import { GetGradientStartEnd } from 'src/utils/rotate';

import ForgotPasswordBottomSheet from './components/ForgotPasswordBottomSheet';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const [loginData, setLoginData] = useState<LoginData>({ userName: '', password: '' });
  const [forgotPasswordBottomSheetVisible, setForgotPasswordBottomSheetVisible] =
    useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const { socket } = useSocketContext();

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

  const handleLogin = async () => {
    if (!loginData.userName || !loginData.password) {
      return Alert.alert('Error', 'Please fill all the fields', [{ text: 'OK' }]);
    }

    if (loginData.password.length < 4) {
      return Alert.alert('Error', 'Password must be at least 4 characters long', [
        { text: 'OK' },
      ]);
    }

    await axios
      .post(`${BASE_URL}/auth/login`, loginData)
      .then(async (response) => {
        await AsyncStorage.setItem('authToken', response.data.token);
        setAuthUser(response.data);
        navigation.replace('Main');
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.response.data.error || 'Username or password is incorrect',
          [{ text: 'OK' }]
        );
      });
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" animated backgroundColor={'#FF6347'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          height: SCREEN_HEIGHT,
          gap: 50,
        }}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
            {...GetGradientStartEnd(0)}
            style={[
              styles.lineaderGradient,
              styles.shadow,
              {
                borderRadius: SCREEN_WIDTH * 0.8,
                width: SCREEN_WIDTH * 1.5,
                height: SCREEN_HEIGHT * 0.75,
                top: -SCREEN_WIDTH * 0.6,
                left: -SCREEN_WIDTH * 0.25,
              },
            ]}
          >
            <Animated.View style={[styles.animation, animatedStyle]}>
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
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={styles.textHeaderContainer}>
              <Text style={styles.textHeader}>Login</Text>
              <Text style={styles.textBody}>Please enter your credentials to login</Text>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Username"
                value={loginData.userName}
                onChangeText={(text) => setLoginData({ ...loginData, userName: text })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry
                value={loginData.password}
                onChangeText={(text) => setLoginData({ ...loginData, password: text })}
              />
            </View>

            <View style={styles.forgetPassworContainer}>
              <TouchableOpacity
                style={styles.forgetPassworButton}
                onPress={() => setForgotPasswordBottomSheetVisible(true)}
              >
                <Text style={styles.forgetPassworButtonText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button title="Login" onPress={handleLogin} />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don&apos;t have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                  setLoginData({ userName: '', password: '' });
                }}
              >
                <Text style={styles.registerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {forgotPasswordBottomSheetVisible && (
            <ForgotPasswordBottomSheet
              isVisible={forgotPasswordBottomSheetVisible}
              onSwipeDown={setForgotPasswordBottomSheetVisible}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColors.light,
  },
  header: {
    height: '40%',
  },
  lineaderGradient: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  animation: {
    alignItems: 'center',
  },
  body: {
    height: '60%',
  },
  container: {
    flex: 1,
    gap: 25,
    alignItems: 'center',
  },
  textHeaderContainer: {
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: Colors.primaryColors.dark,
  },
  textBody: {
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
    color: Colors.primaryColors.dark,
  },
  textInputContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColors.dark,
  },
  forgetPassworContainer: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgetPassworButton: {
    width: '40%',
    alignItems: 'center',
  },
  forgetPassworButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primaryColors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryColors.primary,
    paddingBottom: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: Colors.primaryColors.dark,
  },
  registerLinkText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primaryColors.primary,
  },
  shadow: {
    shadowColor: Colors.primaryColors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});
