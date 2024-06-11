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
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import i18next from 'i18next';
import LottieView from 'lottie-react-native';

import registerAnimation from 'src/assets/animatons/register1.json';
import Button from 'src/components/button/Button';
import DropDown from 'src/components/dropDown/DropDown';
import { Colors } from 'src/constants/color/colors';
import { SignupData } from 'src/constants/types/user';
import { RegisterProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';
import { GetGradientStartEnd } from 'src/utils/rotate';

import RegisterModal from './components/RegisterModal';
import isEmail from 'validator/lib/isEmail';

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const [registerModalVisible, setRegisterModalVisible] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 4000 }),
        withTiming(1.1, { duration: 4000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(-50, { duration: 2000 }),
        withTiming(-80, { duration: 2000 })
      ),
      -1,
      true
    );

    rotate.value = withRepeat(
      withTiming(rotate.value + 360, { duration: 4500, easing: Easing.ease }),
      -1,
      false
    );
  }, [scale, translateY, rotate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const handleRegister = () => {
    if (
      !signupData.fullName ||
      !signupData.userName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.gender
    ) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.fillAllFields'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    if (isEmail(signupData.email) === false) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.invalidEmail'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    if (signupData.password.length < 6) {
      return Alert.alert(
        i18next.t('alert.error'),
        i18next.t('alert.passwordLength', { length: 6 }),
        [{ text: i18next.t('global.ok') }]
      );
    }

    if (signupData.password !== signupData.confirmPassword) {
      return Alert.alert(
        i18next.t('alert.error'),
        i18next.t('alert.passwordsDoNotMatch'),
        [{ text: i18next.t('global.ok') }]
      );
    }

    axios
      .post(`${BASE_URL}/auth/signup`, signupData)
      .then((response) => {
        console.log(response.data);

        setRegisterModalVisible(true);
        setSignupData({
          fullName: '',
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
          gender: '',
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(i18next.t('alert.error'), i18next.t('alert.usernameExists'), [
          { text: i18next.t('global.ok') },
        ]);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
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
                source={registerAnimation}
                style={{
                  width: SCREEN_WIDTH * 0.85,
                  height: SCREEN_WIDTH * 0.85,
                  position: 'absolute',
                  bottom: -SCREEN_WIDTH * 0.1,
                }}
                autoPlay
                loop
                speed={1}
                resizeMode="cover"
              />
            </Animated.View>
          </LinearGradient>
        </View>
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={styles.textHeaderContainer}>
              <Text style={styles.textHeader}>{i18next.t('register.header')}</Text>
              <Text style={styles.textBody}>{i18next.t('register.subHeader')}</Text>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.fullName')}
                value={signupData.fullName}
                onChangeText={(text) => setSignupData({ ...signupData, fullName: text })}
              />
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.username')}
                value={signupData.userName}
                onChangeText={(text) => setSignupData({ ...signupData, userName: text })}
              />
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.email')}
                value={signupData.email}
                onChangeText={(text) => setSignupData({ ...signupData, email: text })}
              />
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.password')}
                secureTextEntry
                value={signupData.password}
                onChangeText={(text) => setSignupData({ ...signupData, password: text })}
              />
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.confirmPassword')}
                secureTextEntry
                value={signupData.confirmPassword}
                onChangeText={(text) =>
                  setSignupData({ ...signupData, confirmPassword: text })
                }
              />
              <DropDown
                title={i18next.t('global.gender')}
                data={[
                  { label: i18next.t('global.male'), value: 'male' },
                  { label: i18next.t('global.female'), value: 'female' },
                ]}
                value={signupData.gender}
                setValue={(value) =>
                  setSignupData({
                    ...signupData,
                    gender: value,
                  })
                }
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title={i18next.t('global.register')} onPress={handleRegister} />

              <View style={styles.linkContainer}>
                <Text style={styles.loginText}>
                  {i18next.t('register.alreadyHaveAnAccount')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                    setSignupData({
                      fullName: '',
                      userName: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                      gender: '',
                    });
                  }}
                >
                  <Text style={styles.loginLinkText}>{i18next.t('global.login')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {registerModalVisible && (
            <RegisterModal
              isVisible={registerModalVisible}
              onClose={() => {
                setRegisterModalVisible(false);
              }}
              onGoToLogin={() => {
                setRegisterModalVisible(false);
                navigation.navigate('Login');
              }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColors.light,
  },
  header: {
    height: '30%',
  },
  lineaderGradient: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  animation: {
    alignItems: 'center',
  },
  body: {
    height: '70%',
  },
  container: {
    flex: 1,
    gap: 30,
    alignItems: 'center',
  },
  textHeaderContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
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
    textAlign: 'center',
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  loginText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: Colors.primaryColors.dark,
  },
  loginLinkText: {
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
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
